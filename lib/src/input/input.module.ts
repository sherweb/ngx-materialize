import { NgModule } from '@angular/core';

import { MzInputContainerComponent } from './input-container/index';
import { MzInputPrefixDirective } from './input-prefix/index';
import { MzInputDirective } from './input.directive';

@NgModule({
  declarations: [
    MzInputContainerComponent,
    MzInputDirective,
    MzInputPrefixDirective,
  ],
  exports: [
    MzInputContainerComponent,
    MzInputDirective,
    MzInputPrefixDirective,
  ],
})
export class MzInputModule { }
