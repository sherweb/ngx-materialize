import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzTextareaContainerComponent } from './textarea-container/textarea-container.component';
import { MzTextareaPrefixDirective } from './textarea-prefix/textarea-prefix.directive';
import { MzTextareaDirective } from './textarea.directive';

@NgModule({
  declarations: [
    MzTextareaContainerComponent,
    MzTextareaDirective,
    MzTextareaPrefixDirective,
  ],
  exports: [
    MzTextareaContainerComponent,
    MzTextareaDirective,
    MzTextareaPrefixDirective,
  ],
})
export class MzTextAreaModule { }
