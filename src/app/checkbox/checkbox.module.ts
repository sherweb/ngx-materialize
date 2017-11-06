import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzCheckboxContainerComponent } from './checkbox-container/checkbox-container.component';
import { MzCheckboxDirective } from './checkbox.directive';

@NgModule({
  declarations: [
    MzCheckboxDirective,
    MzCheckboxContainerComponent,
  ],
  exports: [
    MzCheckboxDirective,
    MzCheckboxContainerComponent,
  ],
})
export class MzCheckboxModule { }
