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

  InputElement: JQuery;
  InputContainerElement: JQuery;
  LabelElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initElements();
    this.handleProperties();
  }

  initElements() {
    this.InputElement = $(this.elementRef.nativeElement);
    this.InputContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.LabelElement = this.generateLabelElement();
  }

  generateLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.InputContainerElement, 'append', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.InputContainerElement.length === 0) {
      console.error('Input must be place inside an [mz-input-container] tag', this.InputElement);
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
    if (this.placeholder || this.InputElement.val()) {
      this.LabelElement.addClass('active');
    }

    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.LabelElement.append(labelText);
    }
  }

  handleValidate() {
    if (this.validate) {
      this.renderer.setElementClass(this.InputElement[0], 'validate', true);
    }
  }

  handleDataError() {
    if (this.dataError) {
      this.renderer.setElementAttribute(this.LabelElement[0], 'data-error', this.dataError);
    }
  }

  handleDataSuccess() {
    if (this.dataSuccess) {
      this.renderer.setElementAttribute(this.LabelElement[0], 'data-success', this.dataSuccess);
    }
  }

  handleLength() {
    if (this.length) {
      this.renderer.setElementAttribute(this.InputElement[0], 'length', this.length.toString());
      this.renderer.invokeElementMethod(this.InputElement, 'characterCounter');
    }
  }

  handleAutocomplete() {
    if (this.autocomplete) {
      this.renderer.setElementClass(this.InputElement[0], 'autocomplete', true);

      // need setTimeout otherwise loading directly on the page cause an error
      setTimeout(() => this.renderer.invokeElementMethod(this.InputElement, 'autocomplete', [this.autocomplete]), 0);
    }
  }
}
