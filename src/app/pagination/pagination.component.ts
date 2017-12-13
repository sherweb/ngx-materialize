import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MzPaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() currentPage = 1;
  @Input() totaltItems: number;

  pages: number[];

  ngOnInit() {
    const totalPages = this.totaltItems / this.itemsPerPage;

    this.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
  }
}
