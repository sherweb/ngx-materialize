import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzNavbarModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { NavbarComponent } from './navbar.component';
import { ROUTES } from './navbar.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzNavbarModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [NavbarComponent],
})
export class NavbarModule { }
