import {
  Component,
  Directive,
  ElementRef,
  Input } from '@angular/core';

 import { MzComponentRemoveHost } from '../../shared/component-remove-host/component-remove-host';

@Component({
  selector: 'mz-collapsible-item',
  templateUrl: './collapsible-item.component.html',
  styleUrls: ['./collapsible-item.component.scss'],
})
export class MzCollapsibleItemComponent extends MzComponentRemoveHost {
  @Input() active: boolean;

  constructor(public elementRef: ElementRef) {
    super(elementRef);
   }
}

// Declare the tags to avoid error: '<mz-collapsible-item-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-collapsible-item-body' }) export class MzCollapsibleItemBodyDirective { }
@Directive({ selector: 'mz-collapsible-item-header' }) export class MzCollapsibleItemHeaderDirective { }
