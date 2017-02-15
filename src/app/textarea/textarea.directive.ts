import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'textarea[mzTextarea], textarea[mz-textarea]',
})
export class MzTextareaDirective extends HandlePropChanges implements OnInit {
  // native properties
  @Input() id: string;
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;
  @Input() length: number;

  textareaElement: JQuery;
  textareaContainerElement: JQuery;
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
      label: () => this.handleLabel(),
      length: () => this.handleLength(),
      placeholder: () => this.handlePlaceholder(),
    };
  }

  initElements() {
    this.textareaElement = $(this.elementRef.nativeElement);
    this.textareaContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.labelElement = this.createLabelElement();
    this.initTextarea();
  }

  initTextarea() {
    this.renderer.setElementClass(this.textareaElement[0], 'materialize-textarea', true);
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

    super.executePropHandlers();
  }

  handleLabel() {
    if (this.placeholder || this.textareaElement.val()) {
      this.renderer.setElementClass(this.labelElement[0], 'active', true);
    }

    this.renderer.invokeElementMethod(this.labelElement, 'text', [this.label]);
  }

  handleLength() {
    const length = this.length ? this.length.toString() : null;

    this.renderer.setElementAttribute(this.textareaElement[0], 'data-length', length);

    if (length) {
      this.setCharacterCount();
    } else {
      this.removeCharacterCount();
    }
  }

  handlePlaceholder() {
    const placeholder = !!this.placeholder ? this.placeholder : null;
    this.renderer.setElementAttribute(this.textareaElement[0], 'placeholder', placeholder);

    setTimeout(() => {
      const inputValue = (<HTMLTextAreaElement>this.textareaElement[0]).value;
      const isActive = !!this.placeholder || !!inputValue;
      this.renderer.setElementClass(this.labelElement[0], 'active', isActive);
    });
  }

  setCharacterCount() {
    this.renderer.invokeElementMethod(this.textareaElement, 'characterCounter');

    // force validation
    // need setTimeout otherwise it wont trigger validation right away
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.textareaElement, 'trigger', ['input']);
      this.renderer.invokeElementMethod(this.textareaElement, 'trigger', ['blur']);
    });
  }

  removeCharacterCount() {
    this.renderer.invokeElementMethod(this.textareaElement.siblings('.character-counter'), 'remove');

    this.removeValidationClasses();
  }

  removeValidationClasses() {
    // reset valid/invalid state
    this.renderer.setElementClass(this.textareaElement[0], 'invalid', false);
    this.renderer.setElementClass(this.textareaElement[0], 'valid', false);
  }
}
