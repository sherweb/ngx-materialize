import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MzPaginationPageButtonComponent } from './pagination-page-button';

@Component({
  selector: 'mz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MzPaginationComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() enableFirstAndLastPageButtons = false;
  @Input() itemsPerPage: number;
  @Input() maxPageButtons = 5;
  @Input() totalItems: number;
  @Output() changePage = new EventEmitter<number>();

  pages: number[];
  get totalPages() : number {
    return this.totalItems / this.itemsPerPage;
  }

  ngOnInit() {
    this.renderButtons();
  }

  changeCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.renderButtons();
    this.changePage.emit(pageNumber);
  }

  firstPage() {
    this.changeCurrentPage(1);
  }

  lastPage() {
    this.changeCurrentPage(this.totalPages);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      const nextPage = this.currentPage + 1;
      this.changeCurrentPage(nextPage);
    }
  }

  previousPage() {
    if (this.currentPage !== 1) {
      const previousPage = this.currentPage - 1;
      this.changeCurrentPage(previousPage);
    }
  }

  private renderButtons() {
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
