import { AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'mz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements AfterViewInit {
  @Input() fixedTab: boolean;
  @Input() onShow: Function;
  @Input() responsiveThreshold: number;
  @Input() swipeable: boolean;

  @ViewChild('tabs') tabs: ElementRef;

  constructor(
    private renderer: Renderer,
  ) { }

  ngAfterViewInit(): void {
    this.initTabs();
  }

  initTabs() {
     const options: Materialize.TabOptions = {
      onShow: this.onShow,
      swipeable: this.swipeable,
      responsiveThreshold: this.responsiveThreshold,
  }

    // need setTimeout otherwise loading directly on the page cause an error
    setTimeout(() => this.renderer.invokeElementMethod($(this.tabs.nativeElement), 'tabs', [options]));
  }

  selectTab(tabItemId: string) {
    this.renderer.invokeElementMethod($(this.tabs.nativeElement), 'tabs', ['select_tab', tabItemId]);
  }
}
