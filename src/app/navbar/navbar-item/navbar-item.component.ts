import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss'],
})
export class MzNavbarItemComponent {
  @Input() active: boolean;
  @Input() itemClass: string;
}
