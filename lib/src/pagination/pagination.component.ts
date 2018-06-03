import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HandlePropChanges } from '../shared/index';
import { MzPaginationPageButtonComponent } from './pagination-page-button/index';

@Component({
  selector: 'mz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MzPaginationComponent extends HandlePropChanges implements OnInit {
  @Input() currentPage = 1;
  @Input() enableFirstAndLastPageButtons = false;
  @Input() itemsPerPage: number;
  @Input() maxPageButtons = 5;
  @Input() totalItems: number;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[];
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.renderButtons();
  }

  changeCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
    this.renderButtons();
  }

  firstPage() {
    this.changeCurrentPage(1);
  }

  initHandlers() {
    this.handlers = {
      currentPage: () => this.renderButtons(),
      itemsPerPage: () => this.renderButtons(),
      maxPageButtons: () => this.renderButtons(),
      totalItems: () => this.renderButtons(),
    };
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

  renderButtons() {
    const buttonsCount = Math.min(this.maxPageButtons, this.totalPages);
    const maxPosition = this.totalPages - buttonsCount;
    const halfButtons = Math.floor(buttonsCount / 2);

    let hiddenPagesBefore = (this.currentPage - halfButtons);
    if (hiddenPagesBefore > maxPosition) {
      hiddenPagesBefore = maxPosition + 1;
    }

    const from = Math.max(hiddenPagesBefore, 1);
    const to = Math.min(this.totalPages, from + this.maxPageButtons - 1);

    this.pages = Array(buttonsCount).fill(0).map((x, i) => from + i);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.pages[0];
    }
  }
}
