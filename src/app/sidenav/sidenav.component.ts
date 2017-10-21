import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
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

  private _opened = false;
  private collapsibleButton: JQuery<Element>;

  get opened() { return this._opened };
  set opened(value: boolean) {
    this._opened = value;
    this.collapsibleButton.sideNav(this._opened ? 'show' : 'hide');
  }

  ngAfterViewInit() {
    this.initCollapseButton();
    this.initCollapsibleLinks();
  }

  ngOnDestroy() {
    this.collapsibleButton.sideNav('destroy');
  }

  initCollapseButton() {
    // fake button if no collapsibleButtonId is provided
    this.collapsibleButton = this.collapseButtonId
      ? $(`#${this.collapseButtonId}`)
      : $(document.createElement('template'));

    // make collapse button visible on all resolution if side navigation is not fixed
    if (!this.fixed) {
      this.collapsibleButton.addClass('show-on-large');
    }

    // add data-activates to collapse button
    this.collapsibleButton.attr('data-activates', this.id);

    // extend onOpen function to update opened state
    const onOpen = this.onOpen || (() => {});
    this.onOpen = () => {
      onOpen();
      this._opened = true;
    };

    // extend onClose function to update opened state
    const onClose = this.onClose || (() => {});
    this.onClose = () => {
        onClose();
        this._opened = false;
    };

    // initialize collapsible button for side navigation
    this.collapsibleButton.sideNav(<any>{
      closeOnClick: this.closeOnClick || false,
      draggable: this.draggable != null ? this.draggable : true,
      edge: this.edge || 'left',
      menuWidth: isNaN(this.width) ? 300 : this.width,
      onClose: this.onClose || false,
      onOpen: this.onOpen || false,
    });
  }

  initCollapsibleLinks() {
    // initialize collapsible elements
    $('.collapsible').collapsible();
  }
}
