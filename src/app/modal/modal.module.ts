import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzModalCloseDirective } from './modal-close/modal-close.directive';
import { MzModalComponent, MzModalContentDirective, MzModalFooterDirective, MzModalHeaderDirective } from './modal.component';
import { MzModalService } from './services/modal.service';

@NgModule({
  declarations: [
    MzModalCloseDirective,
    MzModalComponent,
    MzModalContentDirective,
    MzModalFooterDirective,
    MzModalHeaderDirective,
  ],
  exports: [
    MzModalCloseDirective,
    MzModalComponent,
    MzModalContentDirective,
    MzModalFooterDirective,
    MzModalHeaderDirective,
  ],
  providers: [MzModalService],
})
export class MzModalModule { }
