import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MzBadgeModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { BadgeComponent } from './badge.component';
import { ROUTES } from './badge.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MarkdownModule.forRoot(),
    MzBadgeModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [BadgeComponent],
})
export class BadgeModule { }
