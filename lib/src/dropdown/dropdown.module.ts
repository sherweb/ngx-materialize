import { NgModule } from '@angular/core';

import { MzDropdownDividerComponent } from './dropdown-divider';
import { MzDropdownItemComponent } from './dropdown-item';
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
