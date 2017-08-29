import { AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, Input, QueryList, Renderer, ViewChild } from '@angular/core';

import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'mz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements AfterViewInit {
  @Input() fixedTabWidth: boolean;
  @Input() onShow: Function;
  @Input() responsiveThreshold: number;
  @Input() swipeable: boolean;

  @ViewChild('tabs') tabs: ElementRef;
  @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent>;

  constructor(
    private renderer: Renderer,
  ) { }

  ngAfterViewInit(): void {
    this.initTabs();
  }

  initTabs() {
     const options: Materialize.TabOptions = {
      onShow: this.onShow,
      responsiveThreshold: this.responsiveThreshold,
      swipeable: this.swipeable,
  }

    // need setTimeout otherwise loading directly on the page cause an error
   this.renderer.invokeElementMethod($(this.tabs.nativeElement), 'tabs', [options]);
  }

  selectTab(tabItemId: string) {
    this.renderer.invokeElementMethod($(this.tabs.nativeElement), 'tabs', ['select_tab', tabItemId]);
  }
}
