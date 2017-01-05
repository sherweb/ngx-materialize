import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { NgModule } from '@angular/core';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { ParallaxComponent } from './parallax.component';

@NgModule({
  imports: [
    CodeSnippetModule,
    CommonModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [ParallaxComponent],
})
export class ParallaxModule { }
