import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzTabModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { TabComponent } from './tab.component';
import { ROUTES } from './tab.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzTabModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [TabComponent],
})
export class TabModule { }
