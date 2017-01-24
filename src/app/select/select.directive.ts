import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: 'select[mzSelect], select[mz-select]',
})
export class MzSelectDirective implements AfterViewInit, OnInit, OnDestroy {
  // native properties
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;

  labelElement: JQuery;
  selectElement: JQuery;
  selectContainerElement: JQuery;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initElements();
    this.handleProperties();
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.selectElement, 'material_select');
  }

  ngOnDestroy() {
    this.renderer.invokeElementMethod(this.selectElement, 'material_select', ['destroy']);
  }

  initElements() {
    this.selectElement = $(this.elementRef.nativeElement);
    this.selectContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.labelElement = this.createLabelElement();
  }

  createLabelElement() {
    const labelElement = document.createElement('label');

    this.renderer.invokeElementMethod(this.selectContainerElement, 'append', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.selectContainerElement.length === 0) {
      console.error('Select with mz-select directive must be place inside a [mz-select-container] tag', this.selectElement);
      return;
    }

    this.handleLabel();
    this.handlePlaceholder();
  }

  handleLabel() {
    if (this.label) {
      const labelText = document.createTextNode(this.label);
      this.renderer.invokeElementMethod(this.labelElement, 'append', [labelText]);
    }
  }

  handlePlaceholder() {
    if (this.placeholder) {
      const placeholderText = document.createTextNode(this.placeholder);
      const placeholderOption = document.createElement('option');
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      placeholderOption.append(placeholderText);

      this.renderer.invokeElementMethod(this.selectElement.children().first(), 'before', [placeholderOption]);
    }
  }
}
