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
  @Input() maxPageButtons = 5;
  @Input() totalItems: number;
  @Output() changePageEvent = new EventEmitter<number>();

  totalPages: number;
  pages: number[];

  ngOnInit() {
    this.totalPages = this.totalItems / this.itemsPerPage;
    this.renderButtons();
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changePageEvent.emit(pageNumber);
    this.renderButtons();
  }

  previousPage()   {
    const previousPage = this.currentPage - 1;
    this.currentPage = Math.max(1, previousPage);
    this.renderButtons();
  }

  nextPage()   {
    const nextPage = this.currentPage + 1;
    this.currentPage = Math.min(this.totalPages, nextPage);
    this.renderButtons();
  }

  renderButtons() {
    const buttonsCount = Math.min(this.maxPageButtons, this.totalPages)
    const maxPosition = this.totalPages - buttonsCount;
    const halfButtons = Math.floor(buttonsCount / 2);

    let hiddenPagesBefore = (this.currentPage - halfButtons);
    if (hiddenPagesBefore > maxPosition) {
      hiddenPagesBefore = maxPosition + 1;
    }

    const from = Math.max(hiddenPagesBefore, 1);
    const to = Math.min(this.totalPages, from + this.maxPageButtons - 1);

    this.pages = Array(buttonsCount).fill(0).map((x, i) => from + i);
  }
}
