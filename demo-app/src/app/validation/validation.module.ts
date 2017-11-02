import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { MarkdownModule } from 'ngx-markdown';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ValidationBindingComponent } from './validation-binding/validation-binding.component';
import { ValidationFormStateComponent } from './validation-form-state/validation-form-state.component';
import { ValidationNgmodelComponent } from './validation-ngmodel/validation-ngmodel.component';
import { ValidationPlaygroundComponent } from './validation-playground/validation-playground.component';
import { ValidationComponent } from './validation.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MarkdownModule.forChild(),
    MaterializeModule,
    PropertiesTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ValidationBindingComponent,
    ValidationComponent,
    ValidationFormStateComponent,
    ValidationNgmodelComponent,
    ValidationPlaygroundComponent,
  ],
})
export class ValidationModule { }
