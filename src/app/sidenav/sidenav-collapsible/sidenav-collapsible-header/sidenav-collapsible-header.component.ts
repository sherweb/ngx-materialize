import { Component } from '@angular/core';

import { MzRemoveComponentHost } from '../../../shared/remove-component-host/remove-component-host';

@Component({
  selector: 'mz-sidenav-collapsible-header',
  templateUrl: './sidenav-collapsible-header.component.html',
  styleUrls: ['./sidenav-collapsible-header.component.scss'],
})
export class MzSidenavCollapsibleHeaderComponent extends MzRemoveComponentHost { }
