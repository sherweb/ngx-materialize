import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzDropdownDividerComponent } from './dropdown-divider/dropdown-divider.component';
import { MzDropdownItemComponent } from './dropdown-item/dropdown-item.component';
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
