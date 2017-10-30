import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer,
} from '@angular/core';

@Component({
  selector: 'mz-sidenav',
  templateUrl: './sidenav.component.html',
})
export class MzSidenavComponent implements AfterViewInit, OnDestroy {
  @Input() backgroundClass: string;
  @Input() closeOnClick: boolean;
  @Input() collapseButtonId: string;
  @Input() draggable: boolean;
  @Input() edge: string;
  @Input() fixed: boolean;
  @Input() id: string;
  @Input() width: number;
  @Input() onClose: Function;
  @Input() onOpen: Function;

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.initCollapseButton();
    this.initCollapsibleLinks();
  }

  ngOnDestroy() {
    $(`#${this.collapseButtonId}`).sideNav('destroy');
  }

  initCollapseButton() {
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
      draggable: this.draggable != null ? this.draggable : true,
      edge: this.edge || 'left',
      menuWidth: isNaN(this.width) ? 300 : this.width,
      onClose: this.onClose || null,
      onOpen: this.onOpen || null,
    });
  }

  initCollapsibleLinks() {
    // Initialize collapsible elements
    $('.collapsible').collapsible();
  }
}
