import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzSelectContainerComponent } from './select-container/select-container.component';
import { MzSelectDirective } from './select.directive';

@NgModule({
  declarations: [
    MzSelectDirective,
    MzSelectContainerComponent,
  ],
  exports: [
    MzSelectDirective,
    MzSelectContainerComponent,
  ],
})
export class MzSelectModule { }
