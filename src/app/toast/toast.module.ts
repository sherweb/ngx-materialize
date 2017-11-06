import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzToastService } from './services/toast.service';

@NgModule({
  providers: [MzToastService],
})
export class MzToastModule { }
