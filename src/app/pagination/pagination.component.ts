import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MzPaginationComponent {
  @Input() itemsPerPage: number;
  @Input() currentPage: number;
  @Input() totaltItems: number;
}
