import { NgModule } from '@angular/core';

import { MzSwitchContainerComponent } from './switch-container';
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
