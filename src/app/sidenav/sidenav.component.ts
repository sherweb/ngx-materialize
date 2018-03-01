import {
  AfterViewInit,
  Component,
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
  @Input() onClose: Function;
  @Input() onOpen: Function;
  @Input() width: number;

  private _opened = false;
  private collapseButton: JQuery<Element>;

  get opened() { return this._opened; }
  set opened(value: boolean) {
    this._opened = value;
    this.collapseButton.sideNav(this._opened ? 'show' : 'hide');
  }

  ngAfterViewInit() {
    this.initCollapseButton();
    this.initCollapsibleLinks();
  }

  ngOnDestroy() {
    this.collapseButton.sideNav('destroy');
  }

  initCollapseButton() {
    // fake button if no collapseButtonId is provided
    this.collapseButton = this.collapseButtonId
      ? $(`#${this.collapseButtonId}`)
      : $(document.createElement('template'));

    // add data-activates to collapse button
    this.collapseButton.attr('data-activates', this.id);

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

    // initialize sidenav
    this.collapseButton.sideNav({
      closeOnClick: this.closeOnClick || false,
      draggable: this.draggable != null ? this.draggable : true,
      edge: this.edge || 'left',
      menuWidth: isNaN(this.width) ? 300 : this.width,
      onClose: this.onClose,
      onOpen: this.onOpen,
    });
  }

  initCollapsibleLinks() {
    // initialize collapsible elements
    $(`#${this.id} .collapsible`).collapsible();
  }
}
