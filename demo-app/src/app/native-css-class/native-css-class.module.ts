import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';

import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { NativeCssClassComponent } from './native-css-class.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CodeSnippetModule,
    CommonModule,
    MaterializeModule,
  ],
  declarations: [NativeCssClassComponent],
})
export class NativeCssClassModule { }
