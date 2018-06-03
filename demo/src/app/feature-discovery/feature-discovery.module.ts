import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzFeatureDiscoveryModule, MzIconMdiModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { FeatureDiscoveryComponent } from './feature-discovery.component';
import { ROUTES } from './feature-discovery.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzButtonModule,
    MzFeatureDiscoveryModule,
    MzIconMdiModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [FeatureDiscoveryComponent],
})
export class FeatureDiscoveryModule { }
