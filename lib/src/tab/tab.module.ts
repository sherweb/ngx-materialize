import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzTabItemComponent } from './tab-item/index';
import { MzTabComponent } from './tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzTabComponent,
    MzTabItemComponent,
  ],
  exports: [
    MzTabComponent,
    MzTabItemComponent,
  ],
})
export class MzTabModule { }
