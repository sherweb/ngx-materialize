import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzCardModule, MzParallaxModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../shared/properties-table/properties-table.module';
import { ParallaxComponent } from './parallax.component';
import { ROUTES } from './parallax.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzCardModule,
    MzParallaxModule,
    PropertiesTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ParallaxComponent],
})
export class ParallaxModule { }
