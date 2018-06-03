import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  Renderer,
  ViewChild,
} from '@angular/core';

import { MzCollapsibleItemComponent } from './collapsible-item/collapsible-item.component';

@Component({
  selector: 'mz-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class MzCollapsibleComponent implements AfterViewInit, OnDestroy {
  @Input() mode: string;
  @Input() onClose: Function;
  @Input() onOpen: Function;
  @Input() popout: boolean;

  @ViewChild('collapsible') collapsible: ElementRef;
  @ContentChildren(MzCollapsibleItemComponent) items: QueryList<MzCollapsibleItemComponent>;

  constructor(
    public renderer: Renderer,
  ) { }

  ngAfterViewInit(): void {
    this.handleDataCollapsible();
    this.initCollapsible();
  }

  ngOnDestroy(): void {
    $(this.collapsible.nativeElement).collapsible('destroy');
  }

  close(collapsibleItemIndex: number) {
    $(this.collapsible.nativeElement).collapsible('close', collapsibleItemIndex);
  }

  initCollapsible() {
    const options: Materialize.CollapsibleOptions = {
      accordion: false,
      onClose: this.onClose,
      onOpen: this.onOpen,
    };

    $(this.collapsible.nativeElement).collapsible(options);
  }

  handleDataCollapsible() {
    if (this.mode) {
      this.renderer.setElementAttribute(this.collapsible.nativeElement, 'data-collapsible', this.mode);
    }
  }

  open(collapsibleItemIndex: number) {
    $(this.collapsible.nativeElement).collapsible('open', collapsibleItemIndex);
  }
}
