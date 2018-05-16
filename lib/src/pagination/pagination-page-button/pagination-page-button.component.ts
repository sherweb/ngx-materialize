import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mz-pagination-page-button',
  templateUrl: './pagination-page-button.component.html',
  styleUrls: ['./pagination-page-button.component.scss'],
})
export class MzPaginationPageButtonComponent {
  @Input() active: boolean;
  @Input() disabled: boolean;
}
