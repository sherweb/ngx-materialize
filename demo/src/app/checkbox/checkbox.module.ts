import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzInputModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { CheckboxComponent } from './checkbox.component';
import { ROUTES } from './checkbox.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzInputModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CheckboxComponent],
})
export class CheckboxModule { }
