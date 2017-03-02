import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'mz-sidenav-collapsible-header',
  templateUrl: './sidenav-collapsible-header.component.html',
  styleUrls: ['./sidenav-collapsible-header.component.scss'],
})
export class MzSidenavCollapsibleHeaderComponent implements AfterViewInit {

  innerHTML: string;

  constructor(public element: ElementRef) { }

  ngAfterViewInit() {
    this.innerHTML = this.element.nativeElement.innerHTML;
  }
}
