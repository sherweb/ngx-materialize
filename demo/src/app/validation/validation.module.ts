import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import {
  MzButtonModule,
  MzCardModule,
  MzCheckboxModule,
  MzDatepickerModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzRadioButtonModule,
  MzSelectModule,
  MzTextareaModule,
  MzTimepickerModule,
  MzValidationModule,
} from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ValidationBindingComponent } from './validation-binding/validation-binding.component';
import { ValidationFormStateComponent } from './validation-form-state/validation-form-state.component';
import { ValidationNgmodelComponent } from './validation-ngmodel/validation-ngmodel.component';
import { ValidationPlaygroundComponent } from './validation-playground/validation-playground.component';
import { ValidationComponent } from './validation.component';
import { ROUTES } from './validation.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MarkdownModule.forRoot(),
    MzButtonModule,
    MzCardModule,
    MzCheckboxModule,
    MzDatepickerModule,
    MzIconModule,
    MzInputModule,
    MzRadioButtonModule,
    MzSelectModule,
    MzTextareaModule,
    MzTimepickerModule,
    MzValidationModule,
    PropertiesTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
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
