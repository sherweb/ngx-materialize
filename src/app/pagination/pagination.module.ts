import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzIconMdiModule } from 'app/icon-mdi/icon-mdi.module';
import { MzPaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { MzPaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    MzIconMdiModule,
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
