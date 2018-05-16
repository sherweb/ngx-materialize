import { NgModule } from '@angular/core';

import { MzInputContainerComponent } from './input-container';
import { MzInputPrefixDirective } from './input-prefix';
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
