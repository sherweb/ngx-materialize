import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzIconMdiModule, MzSidenavModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SidenavComponent } from './sidenav.component';
import { ROUTES } from './sidenav.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzIconMdiModule,
    MzSidenavModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [SidenavComponent],
})
export class SidenavModule { }
