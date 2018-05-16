import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzToastModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ToastComponent } from './toast.component';
import { ROUTES } from './toast.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzToastModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ToastComponent],
})
export class ToastModule { }
