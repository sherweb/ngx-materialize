import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MzPaginationPageButtonComponent } from './pagination-page-button';

@Component({
  selector: 'mz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MzPaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() currentPage = 1;
  @Input() totaltItems: number;
  @Output() changePageEvent = new EventEmitter<number>();

  pages: number[];
  totalPages: number;

  ngOnInit() {
    this.totalPages = this.totaltItems / this.itemsPerPage;

    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changePageEvent.emit(pageNumber);
  }

  previousPage()   {
    const previousPage = this.currentPage - 1;
    this.currentPage = Math.max(1, previousPage);
  }

  nextPage()   {
    const nextPage = this.currentPage + 1;
    this.currentPage = Math.min(this.totalPages, nextPage)
  }
}
