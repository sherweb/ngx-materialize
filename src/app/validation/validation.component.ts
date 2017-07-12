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
  private _disablingState = false;
  private _enablingState = false;
  private _formControlDisabled = false;
  private _required = false;

  errorMessageComponent?: ComponentRef<MzErrorMessageComponent> = null;
  labelElement: HTMLElement;
  nativeElement: JQuery;
  statusChangesSubscription: Subscription;

  // native properties
  @Input() id: string;

  @HostBinding('attr.required')
  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = (value != null && `${value}` !== 'false'); }

  // component properties
  @Input() errorMessageResource: ErrorMessageResource;

  @Input()
  get formControlDisabled() { return this._formControlDisabled; };
  set formControlDisabled(value: boolean) {
    if (value !== this._formControlDisabled) {
      this._disablingState = value;
      this._enablingState = !value;
    }
    this._formControlDisabled = value;
  };

  get elementToAddValidation(): JQuery {
    return this.isNativeSelectElement
      ? this.inputSelectDropdown
      : this.nativeElement;
  }

  get inputSelectDropdown(): JQuery {
    return this.nativeElement.siblings('input.select-dropdown');
  }

  get isNativeSelectElement(): boolean {
    return this.nativeElement[0].nodeName === 'SELECT';
  }

  @HostListener('focusout', ['$event.target'])
  onFocusOut(target: Event) {
    this.ngControl.control.markAsTouched();
    this.setValidationState();
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
    this.inputSelectDropdown.off('blur');
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

  handleFormControlDisabled() {
    if (this.formControlDisabled) {
      this.ngControl.control.disable();
    } else {
      this.ngControl.control.enable();
    }
    this.clearValidationState(this.elementToAddValidation);
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
      formControlDisabled: () => this.handleFormControlDisabled(),
    };
  }

  initNativeSelectElement() {
    // Wait for materialize_select function to be executed when the element has mz-select directive.
    setTimeout(() => {
      this.inputSelectDropdown.on('blur', () => {
        this.ngControl.control.markAsTouched();
        this.setValidationState();
      });
    });
  }

  setValidationState() {
    // to disable field
    if (this._disablingState) {
      this.updateSelect();
      this.clearValidationState(this.elementToAddValidation);
      this._disablingState = false;
      return;
    }
    // to enable field
    if (this._enablingState) {
      this.updateSelect();
      this._enablingState = false;
    }
    // to reset form
    if (this.ngControl.control.untouched && this.ngControl.control.pristine) {
      this.updateSelect();
      this.clearValidationState(this.elementToAddValidation);
      return;
    }
    // to handle field validity
    if (this.ngControl.control.enabled) {
      if (this.ngControl.control.valid) {
        this.renderer2.addClass(this.elementToAddValidation[0], 'valid');
        this.renderer2.removeClass(this.elementToAddValidation[0], 'invalid');
      } else {
        this.renderer2.addClass(this.elementToAddValidation[0], 'invalid');
        this.renderer2.removeClass(this.elementToAddValidation[0], 'valid');
      }
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

  updateSelect() {
    if (this.isNativeSelectElement) {
      this.renderer.invokeElementMethod(this.nativeElement, 'material_select');
      this.initNativeSelectElement();
    }
  }
}
