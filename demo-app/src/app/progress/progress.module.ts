import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
    PropertiesTableModule,
  ],
  declarations: [ ProgressComponent ],
})
export class ProgressModule { }
