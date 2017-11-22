import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzCardActionDirective, MzCardComponent, MzCardContentDirective, MzCardTitleDirective } from './card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardTitleDirective,
  ],
  exports: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardTitleDirective,
  ],
})
export class MzCardModule { }
