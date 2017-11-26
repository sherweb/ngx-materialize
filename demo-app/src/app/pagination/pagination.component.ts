import { Component } from '@angular/core';

import { IPropertyRow } from '../shared/properties-table/properties-table.component';
import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from './../app.routing.animation';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class PaginationComponent {
  properties: IPropertyRow[] = [
    {
      name: 'active',
      mandatory: false,
      type: 'boolean',
      description: `the page element must be active`,
      defaultValue: 'false',
    },
    {
      name: 'disabled',
      mandatory: false,
      type: 'boolean',
      description: `If the page element must be disabled`,
      defaultValue: 'false',
    },
  ];
}
