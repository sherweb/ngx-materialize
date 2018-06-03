import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzIconModule } from '../icon/icon.module';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    MzIconModule,
  ],
  declarations: [
    MzPaginationComponent,
    MzPaginationPageButtonComponent,
  ],
  exports: [
    MzPaginationComponent,
  ],
})
export class MzPaginationModule { }
