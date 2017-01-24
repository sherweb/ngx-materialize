import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'input[mzInput], input[mz-input]',
})
export class MzInputDirective implements OnInit {
  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() autocomplete: Object;
  @Input() dataError: string;
  @Input() dataSuccess: string;
  @Input() label: string;
  @Input() length: number;
  @Input() validate: boolean;

  inputElement: JQuery;
  inputContainerElement: JQuery;
  labelElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initElements();
    this.handleProperties();
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
      console.error('Input must be placed inside an [mz-input-container] tag', this.inputElement);
      return;
    }

    this.handleLabel();
    this.handleValidate();
    this.handleDataError();
    this.handleDataSuccess();
    this.handleLength();
    this.handleAutocomplete();
  }

  handleLabel() {
    if (this.placeholder || this.inputElement.val()) {
      this.renderer.setElementClass(this.labelElement[0], 'active', true);
    }

    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.renderer.invokeElementMethod(this.labelElement, 'append', [labelText]);
    }
  }

  handleValidate() {
    if (this.validate) {
      this.renderer.setElementClass(this.inputElement[0], 'validate', true);
    }
  }

  handleDataError() {
    if (this.dataError) {
      this.renderer.setElementAttribute(this.labelElement[0], 'data-error', this.dataError);
    }
  }

  handleDataSuccess() {
    if (this.dataSuccess) {
      this.renderer.setElementAttribute(this.labelElement[0], 'data-success', this.dataSuccess);
    }
  }

  handleLength() {
    if (this.length) {
      this.renderer.setElementAttribute(this.inputElement[0], 'length', this.length.toString());
      this.renderer.invokeElementMethod(this.inputElement, 'characterCounter');
    }
  }

  handleAutocomplete() {
    if (this.autocomplete) {
      this.renderer.setElementClass(this.inputElement[0], 'autocomplete', true);

      // need setTimeout otherwise loading directly on the page cause an error
      setTimeout(() => this.renderer.invokeElementMethod(this.inputElement, 'autocomplete', [this.autocomplete]), 0);
    }
  }
}
