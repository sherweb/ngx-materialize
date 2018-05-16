import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzInjectionModule, MzModalModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { ModalComponent } from './modal.component';
import { ROUTES } from './modal.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzModalModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
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
