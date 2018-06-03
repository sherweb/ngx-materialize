import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzInputModule, MzSwitchModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { SwitchComponent } from './switch.component';
import { ROUTES } from './switch.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzInputModule,
    MzSwitchModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [SwitchComponent],
})
export class SwitchModule { }
