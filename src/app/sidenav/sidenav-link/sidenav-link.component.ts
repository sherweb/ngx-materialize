import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mz-sidenav-link',
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MzSidenavLinkComponent {
  @Input() active: boolean;
}
