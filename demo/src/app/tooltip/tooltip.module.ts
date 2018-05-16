import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzCheckboxModule, MzInputModule, MzSelectModule, MzTooltipModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { TooltipComponent } from './tooltip.component';
import { ROUTES } from './tooltip.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzButtonModule,
    MzCheckboxModule,
    MzInputModule,
    MzSelectModule,
    MzTooltipModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [TooltipComponent],
})
export class TooltipModule { }
