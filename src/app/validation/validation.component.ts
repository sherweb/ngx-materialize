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

import { ErrorMessageResource, MzErrorMessageComponent } from './error-message';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'mz-validation, [formControlName][mz-validation], [formControlName][mzValidation]',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class MzValidationComponent implements AfterViewInit, OnDestroy {
  private _required = false;

  // native properties
  @Input() id: string;

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

  constructor(
    private elementRef: ElementRef,
    private ngControl: NgControl,
    private renderer: Renderer,
    private renderer2: Renderer2,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngAfterViewInit() {
    this.initElements();
    this.initErrorMessageComponent();
    this.subscribeStatusChanges();
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();

    this.errorMessageComponent.destroy();

    const inputSelectDropdownElement = this.nativeElement.parent().children('input.select-dropdown');
    inputSelectDropdownElement.off('close');
  }

  createRequiredSpanElement() {
    if (this.required) {
      const spanElement = document.createElement('span');
      spanElement.setAttribute('class', 'placeholder-required');
      spanElement.textContent = ' *';

      this.renderer.invokeElementMethod(this.labelElement, 'appendChild', [spanElement]);
    }
  }

  initElements() {
    this.labelElement = $('label[for=' + this.id + ']')[0];
    this.nativeElement = $(this.elementRef.nativeElement);

    if (this.isNativeElementSelect()) {

      // Wait for materialize_select function to be executed when the element has mz-select directive.
      setTimeout(() => {
        const inputSelectDropdownElement = this.nativeElement.parent().children('input.select-dropdown');
        inputSelectDropdownElement.on('blur', () => {
          this.ngControl.control.markAsTouched();
          this.setValidationState();
        });
      });
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

  isNativeElementSelect(): boolean {
    return this.nativeElement[0].nodeName === 'SELECT';
  }

  @HostListener('focusout')
  onFocusOut() {
    this.setValidationState();
  }

  setValidationState() {
    let elementToAddValidation = this.nativeElement;

    if (this.isNativeElementSelect()) {
      elementToAddValidation = this.nativeElement.parent().children('input.select-dropdown');
    }

    if (this.ngControl.touched || this.ngControl.dirty) {
      if (this.ngControl.invalid) {
        this.renderer2.addClass(elementToAddValidation[0], 'invalid');
        this.renderer2.removeClass(elementToAddValidation[0], 'valid');
      } else {
        this.renderer2.addClass(elementToAddValidation[0], 'valid');
        this.renderer2.removeClass(elementToAddValidation[0], 'invalid');
      }
    } else if (this.ngControl.untouched && this.ngControl.pristine) {
      if (this.isNativeElementSelect()) {
        this.renderer.invokeElementMethod(this.nativeElement, 'material_select');
      }

      this.renderer2.removeClass(elementToAddValidation[0], 'valid');
      this.renderer2.removeClass(elementToAddValidation[0], 'invalid');
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
