import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'input[mzRadioButton], input[mz-radio-button]',
})
export class MzRadioButtonDirective implements OnInit {
  // native properties
  @Input() id: string;

  // directive properties
  @Input() label: string;
  @Input() withGap: boolean;

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
    this.inputContainerElement = $(this.elementRef.nativeElement).parent('.radio-button-field');
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
      console.error('Radio Button must be placed inside a [mz-radio-button-container] tag', this.inputElement);
      return;
    }

    this.handleLabel();
    this.handleWithGap();
  }

  handleLabel() {
    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.renderer.invokeElementMethod(this.labelElement, 'append', [labelText]);
    }
  }

  handleWithGap() {
    if (this.withGap) {
      this.renderer.setElementClass(this.inputElement[0], 'with-gap', true);
    }
  }
}
