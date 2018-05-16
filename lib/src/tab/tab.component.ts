import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  QueryList,
  ViewChild,
} from '@angular/core';

import { MzTabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'mz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class MzTabComponent implements AfterViewInit {
  @Input() fixedTabWidth: boolean;
  @Input() onShow: Function;
  @Input() responsiveThreshold: number;
  @Input() swipeable: boolean;

  @ViewChild('tabs') tabs: ElementRef;
  @ContentChildren(MzTabItemComponent) tabItems: QueryList<MzTabItemComponent>;

  ngAfterViewInit(): void {
    this.initTabs();
  }

  initTabs() {
    const options: Materialize.TabOptions = {
      onShow: this.onShow,
      responsiveThreshold: this.responsiveThreshold,
      swipeable: this.swipeable,
    };

    $(this.tabs.nativeElement).tabs(options);
  }

  selectTab(tabItemId: string) {
    $(this.tabs.nativeElement).tabs('select_tab', tabItemId);
  }
}
