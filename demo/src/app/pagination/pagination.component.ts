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

  // playground
  paginationCurrentPage = 1;
  paginationEnableFirstAndLastPageButtons = false;
  paginationMaxPageButtons = 5;
  paginationItemPerPage = 10;
  paginationTotalItems = 50;

  // table properties
  properties: IPropertyRow[] = [
    {
      name: 'currentPage',
      mandatory: false,
      type: 'number',
      description: `The current active page`,
      defaultValue: '1',
    },
    {
      name: 'enableFirstAndLastPageButtons',
      mandatory: false,
      type: 'boolean',
      description: `Show first and last page buttons`,
      defaultValue: 'false',
    },
    {
      name: 'itemsPerPage',
      mandatory: true,
      type: 'number',
      description: `Number of items per page`,
      defaultValue: '',
    },
    {
      name: 'maxPageButtons',
      mandatory: false,
      type: 'number',
      description: `Number of page to display`,
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
      name: 'pageChange',
      mandatory: false,
      type: 'EventEmitter<number>',
      description: `Event triggered when a page button is clicked. The return value is the new current page.`,
      defaultValue: '',
    },
  ];

  get paginationTogalPages(): number {
    return Math.ceil(this.paginationTotalItems / this.paginationItemPerPage);
  }

  get pageOptions(): Array<number> {
    return Array(this.paginationTogalPages).fill(0).map((x, i) => i + 1);

  }

  pageChange(currentPage: number) {
    alert(`Current page is : ${currentPage}`);
  }

  playgroundPageChange(currentPage: number) {
    this.paginationCurrentPage = currentPage;
  }
}
