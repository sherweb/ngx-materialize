import { Component, Input } from '@angular/core';

@Component({
  selector: 'mz-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class MzNavbarComponent {
  @Input() navbarClass: string;
}
