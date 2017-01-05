import { NgModule } from '@angular/core';
import { CodeSnippetComponent } from './code-snippet.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeSnippetComponent],
  exports: [CodeSnippetComponent],
})
export class CodeSnippetModule { }
