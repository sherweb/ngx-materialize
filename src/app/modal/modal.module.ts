import { NgModule } from '@angular/core';

import { MzInjectionModule } from '../shared/injection/injection.module';
import { MzModalCloseDirective } from './modal-close';
import {
  MzModalComponent,
  MzModalContentDirective,
  MzModalFooterDirective,
  MzModalHeaderDirective,
} from './modal.component';
import { MzModalService } from './services';

@NgModule({
  imports: [MzInjectionModule],
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
