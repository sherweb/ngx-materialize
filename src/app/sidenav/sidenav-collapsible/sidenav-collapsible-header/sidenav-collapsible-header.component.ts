import { Component, ElementRef } from '@angular/core';

import { MzComponentRemoveHost } from '../../../shared/component-remove-host/component-remove-host';

@Component({
  selector: 'mz-sidenav-collapsible-header',
  templateUrl: './sidenav-collapsible-header.component.html',
  styleUrls: ['./sidenav-collapsible-header.component.scss'],
})
export class MzSidenavCollapsibleHeaderComponent extends MzComponentRemoveHost {

  constructor(public elementRef: ElementRef) {
    super(elementRef);
   }
}
