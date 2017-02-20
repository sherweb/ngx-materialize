import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MalihuScrollbarService } from './services/malihu-scrollbar.service';

@NgModule({
  imports: [CommonModule],
  providers: [MalihuScrollbarService],
})
export class MalihuScrollbarModule { }
