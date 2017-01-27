import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MarkdownModule.forRoot(),
    MaterializeModule.forRoot(),
  ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }
