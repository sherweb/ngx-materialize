import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
    PropertiesTableModule,
    RouterModule,
  ],
  declarations: [
    ModalComponent,
    ModalExampleComponent,
  ],
  entryComponents: [
    ModalExampleComponent,
  ],
})
export class ModalModule { }
