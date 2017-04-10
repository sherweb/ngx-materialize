import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Directive({
  selector: 'select[mzSelect], select[mz-select]',
})
export class MzSelectDirective extends HandlePropChanges implements AfterViewInit, OnInit, OnDestroy {
  // native properties
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() placeholder: string;

  // directive properties
  @Input() label: string;
  @Input() filledIn: boolean;

  labelElement: JQuery;
  selectElement: JQuery;
  selectContainerElement: JQuery;
  checkboxElements: JQuery;

  suspend = false;

  lastOptions: Element[];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initElements();
    this.handleProperties();
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.selectElement, 'material_select');
    this.initOnChange();
    this.listenOptionChanges();

    // Need to be done after view init or else the multi-select are not yet in the DOM
    this.initMultiple();
    this.initFilledIn();
  }

  ngOnDestroy() {
    this.renderer.invokeElementMethod(this.selectElement, 'material_select', ['destroy']);
    this.selectElement.off();
  }

  initHandlers() {
    this.handlers = {
      disabled: () => this.handleDisabled(),
      label: () => this.handleLabel(),
      placeholder: () => this.handlePlaceholder(),
    };
  }

  initElements() {
    this.selectElement = $(this.elementRef.nativeElement);
    this.selectContainerElement = $(this.elementRef.nativeElement).parent('.input-field');
    this.labelElement = this.createLabelElement();
  }

  initFilledIn() {
    this.checkboxElements = this.selectContainerElement.find(':checkbox');
    this.handlers['filledIn'] = () => this.handleFilledIn();
    this.handleFilledIn();
  }

  /**
   * Force NgModel value(s) to be selected correctly on multiple select as NgModel
   * is not supported yet by Angular 2 on multiple select and cause selected values
   * to be out of sync when changing values in Materialize select
   */
  initMultiple() {
    if (this.selectElement[0].hasAttribute('multiple')) {
      const selectedOptions = this.selectElement
        .find('option')
        .toArray()
        .filter((element: HTMLOptionElement) => element.selected)
        .map((element: HTMLOptionElement) => element.value);
      // setTimeout is needed to this fix to work
      setTimeout(() => this.selectElement.val(selectedOptions));

      // prevent close on first multi select change
      this.lastOptions = Array.from(this.selectElement[0].children);
    }
  }

  /**
   * Trigger the native change event from select element instead of the JQuery.
   * An issue on Github is open about this problem : https://github.com/Dogfalo/materialize/issues/2843
   * This method should be removed when this issue is revolved.
   */
  initOnChange() {
    this.selectElement.on('change', (event: any) => {
      if (!this.suspend) {
        this.suspend = true;

        const customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent('change', true, false, event.target.value);

        this.renderer.invokeElementMethod(this.selectElement[0], 'dispatchEvent', [customEvent]);
      }
    });

    // Stop the propagation of change event
    this.selectElement[0].addEventListener('change', () => {
      this.suspend = false;
    });
  }

  createLabelElement() {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', this.id);

    this.renderer.invokeElementMethod(this.selectContainerElement, 'append', [labelElement]);

    return $(labelElement);
  }

  handleProperties() {
    if (this.selectContainerElement.length === 0) {
      console.error('Select with mz-select directive must be place inside a [mz-select-container] tag', this.selectElement);
      return;
    }

    super.executePropHandlers();

    this.selectFirstOption();
  }

  selectFirstOption() {
    const firstOptionElement = this.selectElement.children().first();

    if (firstOptionElement.length > 0
      && this.selectElement.children('option[selected]').length === 0
      && !this.selectElement[0].hasAttribute('multiple')
    ) {
      firstOptionElement[0].setAttribute('selected', 'true');
    }
  }

  handleDisabled() {
    this.renderer.setElementProperty(this.selectElement[0], 'disabled', !!this.disabled);
    this.renderer.invokeElementMethod(this.selectElement, 'material_select');
  }

  handleLabel() {
    if (this.label != null) {
      this.renderer.invokeElementMethod(this.labelElement, 'text', [this.label]);
    }
  }

  handleFilledIn() {
    if (this.checkboxElements.length > 0) {
      this.checkboxElements.toArray().forEach(checkboxElement => {
        this.renderer.setElementClass(checkboxElement, 'filled-in', !!this.filledIn);
      });
    }
  }

  handlePlaceholder() {
    const placeholderElement = this.selectElement.children(':disabled').first();

    // if placeholder element exists
    if (placeholderElement.length > 0) {

      if (this.placeholder) {
        // update existing placeholder element
        this.renderer.invokeElementMethod(placeholderElement, 'text', [this.placeholder]);
      } else {
        // remove existing placeholder element
        this.renderer.invokeElementMethod(placeholderElement, 'remove');

        // Force trigger change event since it's not triggered when value change programmatically
        this.renderer.invokeElementMethod(this.selectElement, 'change');
        // Required if we don't want exception "Expression has changed after it was checked." https://github.com/angular/angular/issues/6005
        this.changeDetectorRef.detectChanges();
      }
    } else {

      if (this.placeholder) {
        // add placeholder element
        const placeholderText = document.createTextNode(this.placeholder);
        const placeholderOption = document.createElement('option');
        placeholderOption.disabled = true;
        placeholderOption.appendChild(placeholderText);

        this.renderer.invokeElementMethod(this.selectElement, 'prepend', [placeholderOption]);
      }
    }

    this.renderer.invokeElementMethod(this.selectElement, 'material_select');
  }

  listenOptionChanges() {
    Observable.fromEvent($(this.selectElement), 'DOMSubtreeModified')
      .debounceTime(100)
      .filter((event: JQueryEventObject) => {
        const currentOptions = Array.from(event.currentTarget.children);

        if (this.lastOptions) {
          const prevOptions = Array.from(this.lastOptions);
          this.lastOptions = currentOptions;

          if (prevOptions.length !== currentOptions.length) {
            return true;
          } else {
            return currentOptions.some((option, index) =>
              !prevOptions[index] || option.textContent !== prevOptions[index].textContent);
          }
        } else {
          return !!(this.lastOptions = currentOptions);
        }
      })
      .subscribe(x => this.renderer.invokeElementMethod(this.selectElement, 'material_select'));
  }
}
