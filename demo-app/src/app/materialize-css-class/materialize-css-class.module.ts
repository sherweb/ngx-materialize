import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { MaterializeCssClassComponent } from './materialize-css-class.component';
import { ROUTES } from './materialize-css-class.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [MaterializeCssClassComponent],
})
export class MaterializeCssClassModule { }
