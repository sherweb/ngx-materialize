import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';

import { PropertiesTableComponent } from './properties-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [PropertiesTableComponent],
  exports: [PropertiesTableComponent],
})
export class PropertiesTableModule { }
