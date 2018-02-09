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
      name: 'currentPage',
      mandatory: false,
      type: 'number',
      description: `The current page active`,
      defaultValue: '1',
    },
    {
      name: 'itemsPerPage',
      mandatory: true,
      type: 'number',
      description: `Item per page`,
      defaultValue: '',
    },
    {
      name: 'maxPageButtons',
      mandatory: false,
      type: 'number',
      description: `Total page buttons to display`,
      defaultValue: '5',
    },
    {
      name: 'totalItems',
      mandatory: true,
      type: 'number',
      description: `Total items`,
      defaultValue: '',
    },
    {
      name: 'changePageEvent',
      mandatory: true,
      type: 'EventEmitter<number>',
      description: `Event triggered when a page button is clicked. The return value is the new current page.`,
      defaultValue: '',
    },
  ];

  pageChange(currentPage: number) {
    alert(`Current page is : ${currentPage}`)
  }
}
