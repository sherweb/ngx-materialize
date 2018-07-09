import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  MzCardActionDirective,
  MzCardComponent,
  MzCardContentDirective,
  MzCardImageDirective,
  MzCardImageTitleDirective,
  MzCardTitleDirective,
 } from './card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardImageDirective,
    MzCardImageTitleDirective,
    MzCardTitleDirective,
  ],
  exports: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardImageDirective,
    MzCardImageTitleDirective,
    MzCardTitleDirective,
  ],
})
export class MzCardModule { }
