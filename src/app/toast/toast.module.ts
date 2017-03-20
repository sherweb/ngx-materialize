import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [ToastService],
})
export class ToastModule { }
