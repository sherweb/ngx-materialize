import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit, Optional, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { HandlePropChanges } from '../shared/index';

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

  inputElement: JQuery<HTMLInputElement>;
  inputContainerElement: JQuery<HTMLElement>;
  labelElement: JQuery<HTMLLabelElement>;
  stopChangePropagation = false;

  get clockpicker(): JQuery<HTMLElement> {
    return $('.clockpicker');
  }

  constructor(
    @Optional() private ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private zone: NgZone,
  ) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initElements();
    this.initTimepicker();
    this.handleProperties();
  }

  ngOnDestroy() {
    // remove event handlers
    this.inputElement.off();
    // remove clockpicker added to body by default
    this.clockpicker.remove();
  }

  initHandlers() {
    this.handlers = {
      label: () => this.handleLabel(),
      placeholder: () => this.handlePlaceholder(),
    };
  }

  initElements() {
    this.inputContainerElement = $(this.elementRef.nativeElement).parent('.input-field') as JQuery<HTMLElement>;
    this.inputElement = $(this.elementRef.nativeElement) as JQuery<HTMLInputElement>;
    this.labelElement = this.createLabelElement() as JQuery<HTMLLabelElement>;
  }

  initTimepicker() {
    // append clockpicker to body by default
    if (!this.options.container) {
      this.options.container = 'body';
    }

    // extend afterHide callback to set label active
    const afterHide = this.options && this.options.afterHide || (() => {});
    this.options = Object.assign({}, this.options, {
      afterHide: () => {
        afterHide();
        this.setLabelActive();
      },
    });

    this.renderer.invokeElementMethod(this.inputElement, 'pickatime', [this.options]);

    if (this.ngControl) {
      // set ngControl value according to selected time in timepicker
      this.inputElement.on('change', (event: JQuery.Event<HTMLInputElement>) => {
        this.ngControl.control.setValue(event.target.value);

        // mark for change detection
        // fix form validation with ChangeDetectionStrategy.OnPush
        this.changeDetectorRef.markForCheck();
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
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.ngControl.control.markAsPristine());
      });
    }

    this.setLabelActive();
  }

  setLabelActive() {
    // need wait for zone to be stable otherwise it wont make label
    // float in some circonstances (clearing value programmatically for example)
    this.zone.onStable
      .pipe(first())
      .subscribe(() => {
        const inputValue = this.inputElement[0].value;
        const isActive = !!this.placeholder || !!inputValue;
        this.renderer.setElementClass(this.labelElement[0], 'active', isActive);
      });
  }
}
