import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer,
  ViewChild } from '@angular/core';

import { MzCollapsibleItemComponent } from './collapsible-item/collapsible-item.component';

@Component({
  selector: 'mz-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class MzCollapsibleComponent implements AfterViewInit {
  @Input() mode: string;
  @Input() onClose: Function;
  @Input() onOpen: Function;
  @Input() popout: boolean;

  @ViewChild('collapsible') collapsible: ElementRef;
  @ContentChildren(MzCollapsibleItemComponent) items: QueryList<MzCollapsibleItemComponent>;

  constructor(public changeDetectorRef: ChangeDetectorRef, public renderer: Renderer) { }

  ngAfterViewInit(): void {
    this.handleDataCollapsible();
    this.initCollapsible();
  }

  initCollapsible() {
    const options: Materialize.CollapsibleOptions = {
      accordion: false,
      onClose: this.onClose,
      onOpen: this.onOpen,
    };

    // need setTimeout otherwise loading directly on the page cause an error
    setTimeout(() => this.renderer.invokeElementMethod($(this.collapsible.nativeElement), 'collapsible', [options]));

    // forcing changes detection for unit test
    this.changeDetectorRef.detectChanges();
  }

  handleDataCollapsible() {
    if (this.mode) {
      this.renderer.setElementAttribute(this.collapsible.nativeElement, 'data-collapsible', this.mode);
    }
  }
}
