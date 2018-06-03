import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzInputModule, MzPaginationModule, MzSelectModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { PaginationComponent } from './pagination.component';
import { ROUTES } from './pagination.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzInputModule,
    MzPaginationModule,
    MzSelectModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [PaginationComponent],
})
export class PaginationModule { }
