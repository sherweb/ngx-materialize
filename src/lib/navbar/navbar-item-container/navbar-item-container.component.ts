import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-navbar-item-container',
  templateUrl: './navbar-item-container.component.html',
  styleUrls: ['./navbar-item-container.component.scss'],
})
export class MzNavbarItemContainerComponent {
  @Input() align: string;
}
