import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'input[mzTimepicker], input[mz-timepicker]',
})
export class MzTimepickerDirective extends HandlePropChanges implements OnInit, OnDestroy {
  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;

  // materialize uses pickadate.js to create the timepicker
  // complete list of options is available at the following address
  // http://amsul.ca/pickadate.js/time/#options
  @Input() options: Pickadate.TimeOptions = {};

  inputElement: JQuery;
  inputContainerElement: JQuery;
  inputValueSubscription: Subscription;
  labelElement: JQuery;
  stopChangePropagation = false;

  get format(): string {
    return this.options.format || this.options.formatSubmit || null;
  }

  get formatSubmit(): string {
    return this.options.formatSubmit || this.options.format || null;
  }

  get ngControlValue(): string {
    return this.ngControl.value === '' ? null : this.ngControl.value;
  }

  get picker(): Pickadate.TimePicker {
    return this.inputElement.pickatime('picker');
  }

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
    // set default format/formatSubmit options
    if (this.format) {
      this.options.format = this.format;
    }
    if (this.formatSubmit) {
      this.options.formatSubmit = this.formatSubmit
    }

    this.renderer.invokeElementMethod(this.inputElement, 'pickatime', [this.options]);

    if (this.ngControl) {
      // set timepicker initial value according to ngControl
      this.picker.set('select', this.ngControlValue, { format: this.formatSubmit });

      // set ngControl value according to selected date in timepicker
      this.picker.on('set', () => {
        // handle stop propagation
        if (this.stopChangePropagation) {
          this.stopChangePropagation = false;
          return;
        } else {
          this.stopChangePropagation = true;
        }

        // apply options.formatSubmit to ngControl value
        const submitValue = this.formatSubmit
          ? this.picker.get('select', this.formatSubmit)
          : this.picker.get('value');
        this.ngControl.control.setValue(submitValue);

        // apply options.format to input text
        const formatValue = this.format
          ? this.picker.get('select', this.format)
          : this.picker.get('value');
        this.inputElement.val(formatValue);

        // set label active status
        this.setLabelActive();
      });
    }
  }

  initInputSubscription() {
    if (this.ngControl) {
      this.inputValueSubscription = this.ngControl.valueChanges.subscribe(() => {
        // handle stop propagation
        if (this.stopChangePropagation) {
          this.stopChangePropagation = false;
          return;
        } else {
          this.stopChangePropagation = true;
        }

        // set selected date in timepicker according to ngControl value
        this.picker.set('select', this.ngControlValue, { format: this.formatSubmit });

        // set label active status
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
