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
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ErrorMessageResource, MzErrorMessageComponent } from './error-message/index';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'mz-validation, [mz-validation], [mzValidation]',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class MzValidationComponent implements AfterViewInit, OnDestroy {
  errorMessageComponent?: ComponentRef<MzErrorMessageComponent> = null;
  labelElement: HTMLElement;
  nativeElement: JQuery;
  statusChangesSubscription: Subscription;

  // native properties
  @Input() id: string;

  // component properties
  @Input() errorMessageResource: ErrorMessageResource;

  private _formControlDisabled = false;
  private _required = false;

  @HostBinding('attr.required')
  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = (value != null && `${value}` !== 'false'); }

  @Input()
  get formControlDisabled() { return this._formControlDisabled; }
  set formControlDisabled(value: boolean) {
    this._formControlDisabled = value;
    if (this._formControlDisabled) {
      this.ngControl.control.disable();
    } else {
      this.ngControl.control.enable();
    }
  }

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
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    public ngControl: NgControl,
    public renderer: Renderer,
  ) { }

  ngAfterViewInit() {
    this.initElements();
    this.initErrorMessageComponent();
    this.subscribeStatusChanges();
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();
    this.errorMessageComponent.destroy();
  }

  clearValidationState(element: JQuery) {
    this.renderer.setElementClass(element[0], 'valid', false);
    this.renderer.setElementClass(element[0], 'invalid', false);
  }

  createRequiredSpanElement() {
    if (this.required && this.labelElement) {
      const spanElement = document.createElement('span');
      spanElement.setAttribute('class', 'placeholder-required');
      spanElement.textContent = ' *';
      this.renderer.invokeElementMethod(this.labelElement, 'appendChild', [spanElement]);
    }
  }

  initElements() {
    this.labelElement = $('label[for="' + this.id + '"]')[0];
    this.nativeElement = $(this.elementRef.nativeElement);
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

  setValidationState() {
    // to handle reset form
    if (this.ngControl.control.untouched && this.ngControl.control.pristine) {
      this.clearValidationState(this.elementToAddValidation);
      return;
    }
    // to handle field validity
    if (this.ngControl.control.enabled) {
      if (this.ngControl.control.valid) {
        this.renderer.setElementClass(this.elementToAddValidation[0], 'valid', true);
        this.renderer.setElementClass(this.elementToAddValidation[0], 'invalid', false);
      } else {
        this.renderer.setElementClass(this.elementToAddValidation[0], 'valid', false);
        this.renderer.setElementClass(this.elementToAddValidation[0], 'invalid', true);
      }
    } else {
      this.clearValidationState(this.elementToAddValidation);
    }
  }

  subscribeStatusChanges() {
    this.statusChangesSubscription = this.ngControl.control.statusChanges.subscribe((status: string) => {
      // TODO Find a better way to handle validation after the form subscription. (see demo form-validation)
      // wait for the valueChanges method from FormGroup to have been triggered before handling the validation state
      // /!\ race condition warning /!\
      setTimeout(() => this.setValidationState());
    });
  }
}
