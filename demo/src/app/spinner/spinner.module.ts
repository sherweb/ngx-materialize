import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzSpinnerModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SpinnerComponent } from './spinner.component';
import { ROUTES } from './spinner.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzSpinnerModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [SpinnerComponent],
})
export class SpinnerModule { }
