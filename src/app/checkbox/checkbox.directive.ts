import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'input[mzCheckbox], input[mz-checkbox]',
})
export class MzCheckboxDirective implements OnInit {
  // native properties
  @Input() id: string;

  // directive properties
  @Input() filledIn: boolean;
  @Input() label: string;

  checkboxElement: JQuery;
  checkboxContainerElement: JQuery;
  labelElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initElements();
    this.handleProperties();
  }

  initElements() {
    this.checkboxElement = $(this.elementRef.nativeElement);
    this.checkboxContainerElement = $(this.elementRef.nativeElement).parent('.checkbox-field');
    this.labelElement = this.createLabelElement();
  }

  createLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.checkboxContainerElement, 'append', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.checkboxContainerElement.length === 0) {
      console.error('Input with mz-checkbox directive must be place inside a [mz-checkbox-container] tag', this.checkboxElement);
      return;
    }

    this.handleLabel();
    this.handleFilledIn();
  }

  handleLabel() {
    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.renderer.invokeElementMethod(this.labelElement, 'append', [labelText]);
    }
  }

  handleFilledIn() {
    if (this.filledIn) {
      this.renderer.setElementClass(this.checkboxElement[0], 'filled-in', true);
    }
  }
}
