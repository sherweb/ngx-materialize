import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'textarea[mzTextarea], textarea[mz-textarea]',
})
export class MzTextareaDirective implements OnInit {
  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;
  @Input() length: number;

  textareaElement: JQuery;
  textareaContainerElement: JQuery;
  labelElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initElements();
    this.handleProperties();
  }

  initElements() {
    this.textareaElement = $(this.elementRef.nativeElement);
    this.textareaContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.labelElement = this.createLabelElement();
  }

  createLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.textareaContainerElement, 'append', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.textareaContainerElement.length === 0) {
      console.error('Textarea must be placed inside a [mz-textarea-container] tag', this.textareaElement);
      return;
    }

    this.handleTextarea();
    this.handleLabel();
    this.handleLength();
  }

  handleTextarea() {
    this.renderer.setElementClass(this.textareaElement[0], 'materialize-textarea', true);
  }

  handleLabel() {
    if (this.placeholder || this.textareaElement.val()) {
      this.renderer.setElementClass(this.labelElement[0], 'active', true);
    }

    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.renderer.invokeElementMethod(this.labelElement, 'append', [labelText]);
    }
  }

  handleLength() {
    if (this.length) {
      this.renderer.setElementAttribute(this.textareaElement[0], 'length', this.length.toString());
      this.renderer.invokeElementMethod(this.textareaElement, 'characterCounter');
    }
  }
}
