import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzChipModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ChipComponent } from './chip.component';
import { ROUTES } from './chip.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzChipModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ChipComponent],
})
export class ChipModule { }
