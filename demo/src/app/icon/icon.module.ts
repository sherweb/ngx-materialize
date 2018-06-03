import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzIconMdiModule, MzIconModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { IconComponent } from './icon.component';
import { ROUTES } from './icon.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzIconMdiModule,
    MzIconModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [IconComponent],
})
export class IconModule { }
