import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MzIconModule } from 'ng2-materialize';

import { PropertiesTableComponent } from './properties-table.component';

@NgModule({
  imports: [
    CommonModule,
    MzIconModule,
  ],
  declarations: [PropertiesTableComponent],
  exports: [PropertiesTableComponent],
})
export class PropertiesTableModule { }
