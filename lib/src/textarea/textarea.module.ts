import { NgModule } from '@angular/core';

import { MzTextareaContainerComponent } from './textarea-container/index';
import { MzTextareaPrefixDirective } from './textarea-prefix/index';
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
export class MzTextareaModule { }
