import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MaterializeModule,
    PropertiesTableModule,
  ],
  declarations: [SelectComponent],
})
export class SelectModule { }
