import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzProgressModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ProgressComponent } from './progress.component';
import { ROUTES } from './progress.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzProgressModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ProgressComponent],
})
export class ProgressModule { }
