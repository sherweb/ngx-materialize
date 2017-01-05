import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';

import { ButtonComponent } from './button.component';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [ ButtonComponent ],
})
export class ButtonModule { }
