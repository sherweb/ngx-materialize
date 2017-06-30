import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { ErrorMessageResource, MzErrorMessageComponent } from './error-message';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'mz-validation, [formControlName][mz-validation], [formControlName][mzValidation]',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class MzValidationComponent extends HandlePropChanges implements AfterViewInit, OnDestroy {
  private _required = false;

  // native properties
  @Input() id: string;
  @Input() disable: boolean;

  @HostBinding('attr.required')
  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = (value != null && `${value}` !== 'false'); }

  // component properties
  @Input() errorMessageResource: ErrorMessageResource;

  errorMessageComponent?: ComponentRef<MzErrorMessageComponent> = null;
  labelElement: HTMLElement;
  nativeElement: JQuery;
  statusChangesSubscription: Subscription;

  get isNativeSelectElement(): boolean {
    return this.nativeElement[0].nodeName === 'SELECT';
  }

  constructor(
    public ngControl: NgControl,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private renderer2: Renderer2,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.initElements();
    this.initErrorMessageComponent();
    this.initHandlers();
    this.subscribeStatusChanges();
    this.executePropHandlers();
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();

    this.errorMessageComponent.destroy();

    const inputSelectDropdownElement = this.nativeElement.parent().children('input.select-dropdown');
    inputSelectDropdownElement.off('blur');
  }

  clearValidationState(element: JQuery) {
    this.renderer2.removeClass(element[0], 'valid');
    this.renderer2.removeClass(element[0], 'invalid');
  }

  createRequiredSpanElement() {
    if (this.required && this.labelElement) {
      const spanElement = document.createElement('span');
      spanElement.setAttribute('class', 'placeholder-required');
      spanElement.textContent = ' *';

      this.renderer.invokeElementMethod(this.labelElement, 'appendChild', [spanElement]);
    }
  }

  getElement(): JQuery {
    if (this.isNativeSelectElement) {
      return this.nativeElement.parent().children('input.select-dropdown');
    }

    return this.nativeElement;
  }

  handleDisable() {
    const formControl = this.ngControl.control;
    if (formControl != null) {
      if (this.disable) {
        formControl.disable();
      } else {
        formControl.enable();
      }


    }

    this.ngControl.control.markAsUntouched();
    this.clearValidationState(this.getElement());
  }

  initElements() {
    this.labelElement = $('label[for=' + this.id + ']')[0];
    this.nativeElement = $(this.elementRef.nativeElement);

    if (this.isNativeSelectElement) {
      this.initNativeSelectElement();
    }

    this.createRequiredSpanElement();
  }

  initErrorMessageComponent() {
    const errorMessageFactory = this.resolver.resolveComponentFactory(MzErrorMessageComponent);
    this.errorMessageComponent = this.viewContainerRef.createComponent(errorMessageFactory);
    this.errorMessageComponent.instance.errorMessageResource = this.errorMessageResource;
    this.errorMessageComponent.instance.control = this.ngControl.control;
    this.errorMessageComponent.changeDetectorRef.detectChanges();

    const errorMessage = this.nativeElement.parent().children('mz-error-message');
    this.renderer.invokeElementMethod(errorMessage, 'insertAfter', [this.labelElement]);
  }

  initHandlers() {
    this.handlers = {
      disable: () => this.handleDisable(),
    };
  }

  initNativeSelectElement() {
    // Wait for materialize_select function to be executed when the element has mz-select directive.
    setTimeout(() => {
      const inputSelectDropdownElement = this.nativeElement.parent().children('input.select-dropdown');
      inputSelectDropdownElement.on('blur', () => {
        this.ngControl.control.markAsTouched();
        this.setValidationState();
      });
    });
  }

  @HostListener('focusout')
  onFocusOut() {
    this.setValidationState();
  }

  setValidationState() {
    const elementToAddValidation = this.getElement();

    if (this.ngControl.touched || this.ngControl.dirty) {
      if (this.ngControl.invalid) {
        this.renderer2.addClass(elementToAddValidation[0], 'invalid');
        this.renderer2.removeClass(elementToAddValidation[0], 'valid');
      } else {
        this.renderer2.addClass(elementToAddValidation[0], 'valid');
        this.renderer2.removeClass(elementToAddValidation[0], 'invalid');
      }
    } else if (this.ngControl.untouched && this.ngControl.pristine) {
      if (this.isNativeSelectElement) {
        this.renderer.invokeElementMethod(this.nativeElement, 'material_select');
        this.initNativeSelectElement();
      }

      this.clearValidationState(elementToAddValidation);
    }
  }

  subscribeStatusChanges() {
    this.statusChangesSubscription = this.ngControl.control.statusChanges.subscribe(() => {
      // TODO Find a better way to handle validation after the form subscription. (see demo-app form-validation)
      // Wait for the valueChanges method from FormGroup to have been triggered before handling the validation state.
      // /!\ Race condition warning /!\
      setTimeout(() => this.setValidationState());
    });
  }
}
