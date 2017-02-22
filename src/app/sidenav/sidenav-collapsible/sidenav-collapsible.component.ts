import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  QueryList,
} from '@angular/core';

import { MzSidenavCollapsibleHeaderComponent } from './sidenav-collapsible-header/sidenav-collapsible-header.component';

@Component({
  selector: 'mz-sidenav-collapsible',
  templateUrl: './sidenav-collapsible.component.html',
  styleUrls: ['./sidenav-collapsible.component.scss'],
})
export class MzSidenavCollapsibleComponent implements AfterViewInit {
  @ContentChild(MzSidenavCollapsibleHeaderComponent) header: MzSidenavCollapsibleHeaderComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}

// Declare the tags to avoid error: '<mz-sidenav-collapsible-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-sidenav-collapsible-content' }) export class MzSidenavCollapsibleContentDirective { }
