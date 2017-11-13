import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { MzBadgeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { BadgeComponent } from './badge.component';
import { ROUTES } from './badge.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MarkdownToHtmlModule.forRoot(),
    MzBadgeModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [BadgeComponent],
})
export class BadgeModule { }
