import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzHalfwayFabDirective } from './halfway-fab.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzHalfwayFabDirective,
  ],
  exports: [
    MzHalfwayFabDirective,
  ],
})
export class MzHalfwayFabModule { }
