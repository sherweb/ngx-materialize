import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'input[mzTimepicker], input[mz-timepicker]',
})
export class MzTimepickerDirective extends HandlePropChanges implements OnInit, OnDestroy {
  @HostBinding('class.timepicker') true;

  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;

  // materialize uses ClockPicker to create the timepicker
  // complete list of options is available at the following address
  // https://github.com/weareoutman/clockpicker#options
  @Input() options: any = {};

  inputElement: JQuery;
  inputContainerElement: JQuery;
  inputValueSubscription: Subscription;
  labelElement: JQuery;
  stopChangePropagation = false;

  constructor(
    @Optional() private ngControl: NgControl,
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initElements();
    this.initTimepicker();
    this.initInputSubscription();
    this.handleProperties();
  }

  ngOnDestroy() {
    if (this.inputValueSubscription) {
      this.inputValueSubscription.unsubscribe();
    }
    // remove clockpicker added to body by default
    $('.clockpicker').remove();
  }

  initHandlers() {
    this.handlers = {
      label: () => this.handleLabel(),
      placeholder: () => this.handlePlaceholder(),
    };
  }

  initElements() {
    this.inputContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.inputElement = $(this.elementRef.nativeElement);
    this.labelElement = this.createLabelElement();
  }

  initTimepicker() {
    // append clockpicker to body by default
    if (!this.options.container) {
      this.options.container = 'body';
    }

    this.renderer.invokeElementMethod(this.inputElement, 'pickatime', [this.options]);

    if (this.ngControl) {
      // set ngControl value according to selected time in timepicker
      this.inputElement.on('change', (event: JQuery.Event<HTMLInputElement>) => {
        this.ngControl.control.setValue(event.target.value);
      });
    }
  }

  initInputSubscription() {
    if (this.ngControl) {
      this.inputValueSubscription = this.ngControl.valueChanges.subscribe(() => {
        this.setLabelActive();
      });
    }
  }

  createLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.inputElement, 'after', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.inputContainerElement.length === 0) {
      console.error('Input with mz-timepicker directive must be placed inside an [mz-timepicker-container] tag', this.inputElement);
      return;
    }

    super.executePropHandlers();
  }

  handleLabel() {
    this.renderer.invokeElementMethod(this.labelElement, 'text', [this.label]);
  }

  handlePlaceholder() {
    const placeholder = !!this.placeholder ? this.placeholder : null;
    this.renderer.setElementAttribute(this.inputElement[0], 'placeholder', placeholder);

    // fix issue in IE where having a placeholder on input make control dirty and trigger validation
    // on page load... note that it still trigger validation on focus and would need a better fix
    // issue : https://github.com/angular/angular/issues/15299
    // workaround : https://stackoverflow.com/a/44967245/5583283
    if (this.ngControl) {
      setTimeout(() => this.ngControl.control.markAsPristine());
    }

    this.setLabelActive();
  }

  setLabelActive() {
    // need setTimeout otherwise it wont make label float in some circonstances (forcing validation for example)
    setTimeout(() => {
      const inputValue = (<HTMLInputElement>this.inputElement[0]).value;
      const isActive = !!this.placeholder || !!inputValue;
      this.renderer.setElementClass(this.labelElement[0], 'active', isActive);
    });
  }
}
