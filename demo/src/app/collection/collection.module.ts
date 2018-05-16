import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MzCollectionModule, MzIconMdiModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { CollectionComponent } from './collection.component';
import { ROUTES } from './collection.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzCollectionModule,
    MzIconMdiModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CollectionComponent],
})
export class CollectionModule { }
