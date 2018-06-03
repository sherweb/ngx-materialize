import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzCollapsibleModule, MzIconMdiModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { CollapsibleComponent } from './collapsible.component';
import { ROUTES } from './collapsible.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzCollapsibleModule,
    MzIconMdiModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CollapsibleComponent],
})
export class CollapsibleModule { }
