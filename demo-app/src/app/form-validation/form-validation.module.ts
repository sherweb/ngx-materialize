import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { FormValidationComponent } from './form-validation.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MarkdownToHtmlModule.forChild(),
    MaterializeModule,
    PropertiesTableModule,
    ReactiveFormsModule,
  ],
  declarations: [FormValidationComponent],
})
export class FormValidationModule { }
