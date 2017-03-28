import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'mz-collapsible-item',
  templateUrl: './collapsible-item.component.html',
  styleUrls: ['./collapsible-item.component.scss'],
})
export class MzCollapsibleItemComponent implements AfterViewInit {
  @Input() active: boolean;

  innerHTML: SafeHtml;

  constructor(
    public element: ElementRef,
    public sanitizer: DomSanitizer,
  ) { }

  ngAfterViewInit() {
    this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(this.element.nativeElement.innerHTML);
  }
}

// Declare the tags to avoid error: '<mz-collapsible-item-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-collapsible-item-body' }) export class MzCollapsibleItemBodyDirective { }
@Directive({ selector: 'mz-collapsible-item-header' }) export class MzCollapsibleItemHeaderDirective { }
