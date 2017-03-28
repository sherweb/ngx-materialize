import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'mz-sidenav-collapsible-header',
  templateUrl: './sidenav-collapsible-header.component.html',
  styleUrls: ['./sidenav-collapsible-header.component.scss'],
})
export class MzSidenavCollapsibleHeaderComponent implements AfterViewInit {

  innerHTML: SafeHtml;

  constructor(
    public element: ElementRef,
    public sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit() {
    this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(this.element.nativeElement.innerHTML);
  }
}
