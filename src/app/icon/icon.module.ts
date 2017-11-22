import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzIconDirective } from './icon.directive';

@NgModule({
  declarations: [
    MzIconDirective,
  ],
  exports: [
    MzIconDirective,
  ],
})
export class MzIconModule { }
