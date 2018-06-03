import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzCardModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { CardComponent } from './card.component';
import { ROUTES } from './card.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzCardModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CardComponent],
})
export class CardModule { }
