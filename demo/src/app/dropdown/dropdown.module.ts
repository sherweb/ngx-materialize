
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzDropdownModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { DropdownComponent } from './dropdown.component';
import { ROUTES } from './dropdown.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzDropdownModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [DropdownComponent],
})
export class DropdownModule { }
