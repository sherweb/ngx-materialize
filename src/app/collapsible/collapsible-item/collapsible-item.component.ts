import { Component, Directive, Input } from '@angular/core';

import { MzRemoveComponentHost } from '../../shared/remove-component-host/remove-component-host';

@Component({
  selector: 'mz-collapsible-item',
  templateUrl: './collapsible-item.component.html',
  styleUrls: ['./collapsible-item.component.scss'],
})
export class MzCollapsibleItemComponent extends MzRemoveComponentHost {
  @Input() active: boolean;
}

// Declare the tags to avoid error: '<mz-collapsible-item-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-collapsible-item-body' }) export class MzCollapsibleItemBodyDirective { }
@Directive({ selector: 'mz-collapsible-item-header' }) export class MzCollapsibleItemHeaderDirective { }
