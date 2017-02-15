import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'input[mzInput], input[mz-input]',
})
export class MzInputDirective extends HandlePropChanges implements OnInit {
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
  labelElement: JQuery;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initElements();
    this.handleProperties();
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

  createLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.inputContainerElement, 'append', [labelElement]);

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
      // need setTimeout otherwise loading directly on the page cause an error
      setTimeout(() => this.renderer.invokeElementMethod(this.inputElement, 'autocomplete', [this.autocomplete]));
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

    setTimeout(() => {
      const inputValue = (<HTMLInputElement>this.inputElement[0]).value;
      const isActive = !!this.placeholder || !!inputValue;
      this.renderer.setElementClass(this.labelElement[0], 'active', isActive);
    });
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
