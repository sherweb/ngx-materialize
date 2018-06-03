import { NgModule } from '@angular/core';

import { MzDropdownDividerComponent } from './dropdown-divider/index';
import { MzDropdownItemComponent } from './dropdown-item/index';
import { MzDropdownComponent } from './dropdown.component';

@NgModule({
  declarations: [
    MzDropdownComponent,
    MzDropdownDividerComponent,
    MzDropdownItemComponent,
  ],
  exports: [
    MzDropdownComponent,
    MzDropdownDividerComponent,
    MzDropdownItemComponent,
  ],
})
export class MzDropdownModule { }
