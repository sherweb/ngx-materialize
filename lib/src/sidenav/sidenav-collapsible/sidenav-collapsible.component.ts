import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  Renderer,
  ViewChild,
} from '@angular/core';

import { MzSidenavCollapsibleHeaderComponent } from './sidenav-collapsible-header/sidenav-collapsible-header.component';

@Component({
  selector: 'mz-sidenav-collapsible',
  templateUrl: './sidenav-collapsible.component.html',
  styleUrls: ['./sidenav-collapsible.component.scss'],
})
export class MzSidenavCollapsibleComponent implements AfterViewInit {
  @Input() onClose: Function;
  @Input() onOpen: Function;

  @ViewChild('collapsible') collapsible: ElementRef;
  @ContentChild(MzSidenavCollapsibleHeaderComponent) header: MzSidenavCollapsibleHeaderComponent;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public renderer: Renderer,
  ) { }

  ngAfterViewInit() {
    this.initCollapsible();
  }

  initCollapsible() {
    const options: Materialize.CollapsibleOptions = {
      accordion: false,
      onClose: this.onClose,
      onOpen: this.onOpen,
    };

    // need setTimeout otherwise loading directly on the page cause an error
    setTimeout(() => this.renderer.invokeElementMethod($(this.collapsible.nativeElement), 'collapsible', [options]));

    this.changeDetectorRef.detectChanges();
  }
}

// Declare the tags to avoid error: '<mz-sidenav-collapsible-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-sidenav-collapsible-content' }) export class MzSidenavCollapsibleContentDirective { }
