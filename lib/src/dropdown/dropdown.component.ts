import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../shared/index';

@Component({
  selector: 'mz-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class MzDropdownComponent extends HandlePropChanges implements AfterViewInit {
  @Input() align: string;
  @Input() belowOrigin: boolean;
  @Input() constrainWidth: boolean;
  @Input() dropdownButtonId: string;
  @Input() gutter: number;
  @Input() hover: boolean;
  @Input() id: string;
  @Input() inDuration: number;
  @Input() outDuration: number;
  @Input() stopPropagation: boolean;

  dropdownButtonElement: JQuery;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    super();
   }

  ngAfterViewInit() {
    this.initHandlers();
    this.initDropdownButtonElement();
    this.handleProperties();
  }

  close() {
    setTimeout(() => this.renderer.invokeElementMethod(this.dropdownButtonElement, 'dropdown', ['close']));
  }

  initDropdownButtonElement() {
    this.dropdownButtonElement = $(`#${this.dropdownButtonId}`);
  }

  initHandlers() {
    this.handlers = {
      align: () => this.handleDropdown(),
      belowOrigin: () => this.handleDropdown(),
      constrainWidth: () => this.handleDropdown(),
      dropdownButtonId: () => this.handleDataActivates(),
      gutter: () => this.handleDropdown(),
      hover: () => this.handleDropdown(),
      id: () => this.handleDropdown(),
      inDuration: () => this.handleDropdown(),
      outDuration: () => this.handleDropdown(),
      stopPropagation: () => this.handleDropdown(),
    };
  }

  handleDataActivates() {
    this.renderer.setElementAttribute(this.dropdownButtonElement[0], 'data-activates', this.id);
  }

  handleDropdown() {
    this.validateProperties();

    const options: Materialize.DropDownOptions = {
      alignment: this.align,
      belowOrigin: this.belowOrigin,
      constrainWidth: this.constrainWidth,
      gutter: this.gutter,
      hover: this.hover,
      inDuration: this.inDuration,
      outDuration: this.outDuration,
      stopPropagation: this.stopPropagation,
    };

    // Initialize dropdown button for dropdown
    this.renderer.invokeElementMethod(this.dropdownButtonElement, 'dropdown', [options]);
  }

  handleProperties() {
    this.handleDataActivates();
    this.handleDropdown();
  }

  open() {
    setTimeout(() => this.renderer.invokeElementMethod(this.dropdownButtonElement, 'dropdown', ['open']));
  }

  validateProperties() {
    if (!this.id) {
      throw new Error('Attribute [id] from mz-dropdown is required. ' + this.elementRef.nativeElement);
    }

    if (this.dropdownButtonElement.length === 0) {
      throw new Error(
        'Attribute [dropdownButtonId] from mz-dropdown is required and should be an existing element. ' +
        this.elementRef.nativeElement);
    }
  }
}
