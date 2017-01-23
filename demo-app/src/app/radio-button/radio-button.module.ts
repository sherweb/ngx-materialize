import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { RadioButtonComponent } from './radio-button.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [RadioButtonComponent],
})
export class RadioButtonModule { }
