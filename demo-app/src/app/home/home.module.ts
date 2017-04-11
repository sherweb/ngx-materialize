import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CodeSnippetModule,
    CommonModule,
    MarkdownToHtmlModule.forRoot(),
    MaterializeModule,
  ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }
