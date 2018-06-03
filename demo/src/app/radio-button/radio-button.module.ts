import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MzCheckboxModule, MzInputModule, MzRadioButtonModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { RadioButtonComponent } from './radio-button.component';
import { ROUTES } from './radio-button.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    FormsModule,
    MzCheckboxModule,
    MzInputModule,
    MzRadioButtonModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [RadioButtonComponent],
})
export class RadioButtonModule { }
