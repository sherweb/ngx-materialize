import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzIconMdiModule, MzInputModule, MzTextareaModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { TextareaComponent } from './textarea.component';
import { ROUTES } from './textarea.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzIconMdiModule,
    MzInputModule,
    MzTextareaModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [TextareaComponent],
})
export class TextareaModule { }
