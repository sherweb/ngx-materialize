import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzIconModule, MzPaginationModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { PaginationComponent } from './pagination.component';
import { ROUTES } from './pagination.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzIconModule,
    MzPaginationModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [PaginationComponent],
})
export class PaginationModule { }
