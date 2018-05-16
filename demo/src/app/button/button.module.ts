import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzIconMdiModule, MzIconModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ButtonComponent } from './button.component';
import { ROUTES } from './button.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ButtonComponent],
})
export class ButtonModule { }
