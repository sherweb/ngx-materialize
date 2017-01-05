import { Component, Directive } from '@angular/core';

@Component({
  selector: 'mz-sidenav-collapsible',
  templateUrl: './sidenav-collapsible.component.html',
  styleUrls: ['./sidenav-collapsible.component.scss'],
})
export class MzSidenavCollapsibleComponent { }


// Declare the tags to avoid error: '<mz-sidenav-collapsible-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-sidenav-collapsible-header' }) export class MzSidenavCollapsibleHeaderDirective { }
@Directive({ selector: 'mz-sidenav-collapsible-content' }) export class MzSidenavCollapsibleContentDirective { }
