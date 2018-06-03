import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzChipInputComponent } from './chip-input/index';
import { MzChipComponent } from './chip.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MzChipComponent,
    MzChipInputComponent,
  ],
  exports: [
    MzChipComponent,
    MzChipInputComponent,
  ],
})
export class MzChipModule { }
