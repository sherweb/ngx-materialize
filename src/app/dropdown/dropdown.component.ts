import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer,
  ViewChild,
} from '@angular/core';

import { HandlePropChanges } from '../shared/handle-prop-changes';

@Component({
  selector: 'mz-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class MzDropdownComponent extends HandlePropChanges implements AfterViewInit {
  @Input() align: string;
  @Input() dropdownButtonId: string;
  @Input() constrainWidth: boolean;
  @Input() coverTrigger: boolean;
  @Input() hover: boolean;
  @Input() id: string;
  @Input() inDuration: number;
  @Input() onCloseEnd: Function;
  @Input() onCloseStart: Function;
  @Input() onOpenEnd: Function;
  @Input() onOpenStart: Function;
  @Input() outDuration: number;

  @ViewChild('dropdownContent') dropdownContent: Element;

  dropdown: M.Dropdown;
  dropdownButtonElement: Element;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    super();
   }

  ngAfterViewInit() {
    this.initHandlers();
    this.initDropdownButtonElement();
    this.handleProperties();
  }

  close() {
    this.dropdown.close();
  }

  initDropdownButtonElement() {
    this.dropdownButtonElement = document.querySelector(`#${this.dropdownButtonId}`);
    this.dropdownButtonElement.setAttribute('class', 'dropdown-trigger');
  }

  initHandlers() {
    this.handlers = {
      align: () => this.handleDropdown(),
      constrainWidth: () => this.handleDropdown(),
      coverTrigger: () => this.handleDropdown(),
      dropdownButtonId: () => this.handleDataTarget(),
      hover: () => this.handleDropdown(),
      id: () => this.handleDropdown(),
      inDuration: () => this.handleDropdown(),
      onCloseEnd: () => this.handleDropdown(),
      onCloseStart: () => this.handleDropdown(),
      onOpenEnd: () => this.handleDropdown(),
      onOpenStart: () => this.handleDropdown(),
      outDuration: () => this.handleDropdown(),
    };
  }

  handleDataTarget() {
    this.renderer.setElementAttribute(this.dropdownButtonElement[0], 'data-target', this.id);
  }

  handleDropdown() {
    this.validateProperties();

    const options: Materialize.DropDownOptions = {
      alignment: this.align,
      coverTrigger: this.coverTrigger,
      constrainWidth: this.constrainWidth,
      hover: this.hover,
      inDuration: this.inDuration,
      onCloseEnd: this.onCloseEnd,
      onCloseStart: this.onCloseStart,
      onOpenEnd: this.onOpenEnd,
      onOpenStart: this.onCloseStart,
      outDuration: this.outDuration,
    };

    // Initialize dropdown button for dropdown
    this.dropdown = new M.Dropdown(this.dropdownButtonElement, options);
  }

  handleProperties() {
    this.handleDataTarget();
    this.handleDropdown();
  }

  open() {
    this.dropdown.open();
  }

  validateProperties() {
    if (!this.id) {
      throw new Error('Attribute [id] from mz-dropdown is required. ' + this.elementRef.nativeElement);
    }

    if (this.dropdownButtonElement === null) {
      throw new Error(
        'Attribute [dropdownButtonId] from mz-dropdown is required and should be an existing element. ' +
        this.elementRef.nativeElement);
    }
  }
}
