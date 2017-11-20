import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { MarkdownModule } from 'ngx-markdown';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CodeSnippetModule,
    CommonModule,
    MarkdownModule.forRoot(),
    MaterializeModule,
  ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }
