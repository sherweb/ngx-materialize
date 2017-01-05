import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    CodeSnippetModule,
    RouterModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [SidenavComponent],
})
export class SidenavModule { }
