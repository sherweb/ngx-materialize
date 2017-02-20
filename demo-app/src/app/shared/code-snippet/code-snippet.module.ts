import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeSnippetComponent } from './code-snippet.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeSnippetComponent],
  exports: [CodeSnippetComponent],
})
export class CodeSnippetModule { }
