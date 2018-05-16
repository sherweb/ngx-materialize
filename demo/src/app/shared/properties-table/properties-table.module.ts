import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MzIconMdiModule } from 'ngx-materialize';

import { PropertiesTableComponent } from './properties-table.component';

@NgModule({
  imports: [
    CommonModule,
    MzIconMdiModule,
  ],
  declarations: [PropertiesTableComponent],
  exports: [PropertiesTableComponent],
})
export class PropertiesTableModule { }
