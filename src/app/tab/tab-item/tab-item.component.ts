import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'mz-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class MzTabItemComponent {
  @Input() active: boolean;
  @Input() class: string;
  @Input() disabled: boolean;
  @Input() href: string;
  @Input() label: string;
  @Input() tabItemId: string;
  @Input() target: string;

  tabs: HTMLElement;
  liElement: HTMLElement;

  get link(): string {
    return this.tabItemId ? this.tabItemId : this.label.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
}
