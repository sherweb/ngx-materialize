import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { first, skipWhile } from 'rxjs/operators';

import { HandlePropChanges } from '../shared/index';

@Directive({
  selector: 'input[mzInput], input[mz-input]',
})
export class MzInputDirective extends HandlePropChanges implements OnInit, OnDestroy {
  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() autocomplete: { data: { [key: string]: string } };
  @Input() dataError: string;
  @Input() dataSuccess: string;
  @Input() label: string;
  @Input() length: number;
  @Input() validate: boolean;

  inputElement: JQuery;
  inputContainerElement: JQuery;
  inputValueSubscription: Subscription;
  labelElement: JQuery;

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
      autocomplete: () => this.handleAutocomplete(),
      dataError: () => this.handleDataError(),
      dataSuccess: () => this.handleDataSuccess(),
      label: () => this.handleLabel(),
      length: () => this.handleLength(),
      placeholder: () => this.handlePlaceholder(),
      validate: () => this.handleValidate(),
    };
  }

  initElements() {
    this.inputElement = $(this.elementRef.nativeElement);
    this.inputContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.labelElement = this.createLabelElement();
  }

  initInputSubscription() {
    if (this.ngControl) {
      this.inputValueSubscription = this.ngControl.valueChanges.subscribe(() => this.setLabelActive());
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
      console.error('Input with mz-input directive must be placed inside an [mz-input-container] tag', this.inputElement);
      return;
    }

    super.executePropHandlers();
  }

  handleAutocomplete() {
    const isAutocomplete = this.autocomplete != null
      && this.autocomplete.data != null
      && Object.keys(this.autocomplete.data).length > 0;

    this.renderer.setElementClass(this.inputElement[0], 'autocomplete', isAutocomplete);

    if (this.autocomplete != null) {
      // wait until autocomplete is defined before to invoke
      // see issue: https://github.com/Dogfalo/materialize/issues/4401
      interval(100)
        .pipe(
          skipWhile(() => !this.inputElement['autocomplete']),
          first())
        .subscribe(() => this.renderer.invokeElementMethod(this.inputElement, 'autocomplete', [this.autocomplete]));
    }
  }

  handleDataError() {
    this.renderer.setElementAttribute(this.labelElement[0], 'data-error', this.dataError);
  }

  handleDataSuccess() {
    this.renderer.setElementAttribute(this.labelElement[0], 'data-success', this.dataSuccess);
  }

  handleLabel() {
    this.renderer.invokeElementMethod(this.labelElement, 'text', [this.label]);
  }

  handleLength() {
    const length = this.length ? this.length.toString() : null;

    this.renderer.setElementAttribute(this.inputElement[0], 'data-length', length);

    if (length) {
      this.setCharacterCount();
    } else {
      this.removeCharacterCount();
    }
  }

  handlePlaceholder() {
    const placeholder = !!this.placeholder ? this.placeholder : null;
    this.renderer.setElementAttribute(this.inputElement[0], 'placeholder', placeholder);

    // fix issue in IE where having a placeholder on input make control dirty
    // note that it still trigger validation on focus but this is better than nothing
    // issue : https://github.com/angular/angular/issues/15299
    // workaround : https://stackoverflow.com/a/44967245/5583283
    if (this.ngControl) {
      setTimeout(() => this.ngControl.control.markAsPristine());
    }

    this.setLabelActive();
  }

  handleValidate() {
    this.renderer.setElementClass(this.inputElement[0], 'validate', this.validate);

    if (this.validate) {
      // force validation
      this.renderer.invokeElementMethod(this.inputElement, 'trigger', ['blur']);
    } else {
      this.removeValidationClasses();
    }
  }

  setCharacterCount() {
    this.renderer.invokeElementMethod(this.inputElement, 'characterCounter');

    // force validation
    // need setTimeout otherwise it wont trigger validation right away
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.inputElement, 'trigger', ['input']);
      this.renderer.invokeElementMethod(this.inputElement, 'trigger', ['blur']);
    });
  }

  setLabelActive() {
    // need setTimeout otherwise it wont make label float in some circonstances
    // for example: forcing validation for example, reseting form programmaticaly, ...
    setTimeout(() => {
      const inputValue = (<HTMLInputElement>this.inputElement[0]).value;
      const isActive = !!this.placeholder || !!inputValue;
      this.renderer.setElementClass(this.labelElement[0], 'active', isActive);
    });
  }

  removeCharacterCount() {
    this.renderer.invokeElementMethod(this.inputElement.siblings('.character-counter'), 'remove');

    this.removeValidationClasses();
  }

  removeValidationClasses() {
    // reset valid/invalid state
    this.renderer.setElementClass(this.inputElement[0], 'invalid', false);
    this.renderer.setElementClass(this.inputElement[0], 'valid', false);
  }
}
