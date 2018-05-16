import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzInputModule, MzSelectModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SelectComponent } from './select.component';
import { ROUTES } from './select.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzInputModule,
    MzSelectModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [SelectComponent],
})
export class SelectModule { }
