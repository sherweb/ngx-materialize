import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzMediaModule } from 'ngx-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { MediaComponent } from './media.component';
import { ROUTES } from './media.routing';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MzMediaModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [MediaComponent],
})
export class MediaModule { }
