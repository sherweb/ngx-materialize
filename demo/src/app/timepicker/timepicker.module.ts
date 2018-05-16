import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzIconMdiModule, MzInputModule, MzTimepickerModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { TimepickerComponent } from './timepicker.component';
import { ROUTES } from './timepicker.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzIconMdiModule,
    MzInputModule,
    MzTimepickerModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [TimepickerComponent],
})
export class TimepickerModule { }
