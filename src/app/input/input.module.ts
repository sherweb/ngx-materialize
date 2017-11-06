import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzInputContainerComponent } from './input-container/input-container.component';
import { MzInputPrefixDirective } from './input-prefix/input-prefix.directive';
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
