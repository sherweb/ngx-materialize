import { NgModule } from '@angular/core';

import { MzSelectContainerComponent } from './select-container';
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
