import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzIconMdiModule, MzInputModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { InputComponent } from './input.component';
import { ROUTES } from './input.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzIconMdiModule,
    MzInputModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [InputComponent],
})
export class InputModule { }
