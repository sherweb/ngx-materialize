import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzSwitchContainerComponent } from './switch-container/switch-container.component';
import { MzSwitchDirective } from './switch.directive';

@NgModule({
  declarations: [
    MzSwitchDirective,
    MzSwitchContainerComponent,
  ],
  exports: [
    MzSwitchDirective,
    MzSwitchContainerComponent,
  ],
})
export class MzSwitchModule { }
