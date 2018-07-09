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
import { MzHalfwayFabDirective } from './halfway-fab/halfway-fab.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardImageDirective,
    MzCardImageTitleDirective,
    MzCardTitleDirective,
    MzHalfwayFabDirective,
  ],
  exports: [
    MzCardActionDirective,
    MzCardComponent,
    MzCardContentDirective,
    MzCardImageDirective,
    MzCardImageTitleDirective,
    MzCardTitleDirective,
    MzHalfwayFabDirective,
  ],
})
export class MzCardModule { }
