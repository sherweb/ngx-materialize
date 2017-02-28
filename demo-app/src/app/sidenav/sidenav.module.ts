import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    CodeSnippetModule,
    RouterModule,
    MaterializeModule.forRoot(),
    PropertiesTableModule,
  ],
  declarations: [SidenavComponent],
})
export class SidenavModule { }
