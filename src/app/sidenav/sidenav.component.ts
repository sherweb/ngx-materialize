import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer,
  ViewChild } from '@angular/core';

@Component({
  selector: 'mz-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class MzSidenavComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() backgroundClass: string;
  @Input() closeOnClick: boolean;
  @Input() collapseButtonId: string;
  @Input() edge: string;
  @Input() fixed: boolean;
  @Input() id: string;
  @Input() width: number;

  @ViewChild('sidenav') sideNav: ElementRef;

  closeOnClickListeners: Function[];

  constructor(private renderer: Renderer) { }

  ngOnInit(): void {
    this.closeOnClickListeners = [];
  }

  ngAfterViewInit(): void {
    this.initCollapseButton();
    this.initCollapsibleLinks();
    this.fixCloseOnClick();
  }

  ngOnDestroy(): void {
    $(`#${this.collapseButtonId}`).sideNav('destroy');
    this.closeOnClickListeners.forEach(listener => listener());
  }

  initCollapseButton(): void {

    if (!this.collapseButtonId) {
      return;
    }

    const collapseButton = $(`#${this.collapseButtonId}`)[0];

    // Make collapse button visible on all resolution if side navigation is not fixed
    if (!this.fixed) {
      this.renderer.setElementClass(collapseButton, 'show-on-large', true);
    }

    // Add data-activates to collapse button
    this.renderer.setElementAttribute(collapseButton, 'data-activates', this.id);

    // Initialize collapsible button for side navigation
    $(collapseButton).sideNav({
      closeOnClick: this.closeOnClick || false,
      edge: this.edge || 'left',
      menuWidth: isNaN(this.width) ? 300 : this.width,
    });
  }

  initCollapsibleLinks(): void {
    // Initialize collapsible elements
    $('.collapsible').collapsible();
  }

  fixCloseOnClick() {
    // Fix side navigation closeOnClick for non-collapsible links
    // issue: https://github.com/Dogfalo/materialize/issues/2520
    // workaround: https://github.com/Dogfalo/materialize/issues/1426
    $(this.sideNav.nativeElement)
      .find('li a:not(.collapsible-header)')
      .each((index: number, link: Element) => {
        const listener = this.renderer.listen(link, 'click', (element: JQueryEventObject) => {
          if ($(window).width() < 992) {
            $(`#${this.collapseButtonId}`).sideNav('hide');
          }
        });
        this.closeOnClickListeners.push(listener);
      });
  }
}
