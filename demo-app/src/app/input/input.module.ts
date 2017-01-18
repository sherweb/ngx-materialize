import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { NgModule } from '@angular/core';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { InputComponent } from './input.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [InputComponent],
})
export class InputModule { }
