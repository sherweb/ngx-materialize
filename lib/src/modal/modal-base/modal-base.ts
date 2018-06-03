import {
  AfterViewInit,
  ViewChild,
} from '@angular/core';

import { MzModalComponent } from '../modal.component';

export abstract class MzBaseModal implements AfterViewInit {
  @ViewChild(MzModalComponent) modalComponent: MzModalComponent;

  ngAfterViewInit() {
    this.modalComponent.openModal();
  }
}
