import { NgModule } from '@angular/core';

import { MzRadioButtonContainerComponent } from './radio-button-container';
import { MzRadioButtonDirective } from './radio-button.directive';

@NgModule({
  declarations: [
    MzRadioButtonDirective,
    MzRadioButtonContainerComponent,
  ],
  exports: [
    MzRadioButtonDirective,
    MzRadioButtonContainerComponent,
  ],
})
export class MzRadioButtonModule { }
