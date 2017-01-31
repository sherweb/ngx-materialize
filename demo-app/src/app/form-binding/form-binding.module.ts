import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { FormBindingComponent } from './form-binding.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [FormBindingComponent],
})
export class FormBindingModule { }
