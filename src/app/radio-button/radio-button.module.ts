import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzRadioButtonContainerComponent } from './radio-button-container/radio-button-container.component';
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
