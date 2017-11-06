import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzIconMdiDirective } from './icon-mdi.directive';
import { MzIconDirective } from './icon.directive';

@NgModule({
  declarations: [
    MzIconMdiDirective,
    MzIconDirective,
  ],
  exports: [
    MzIconMdiDirective,
    MzIconDirective,
  ],
})
export class MzIconModule { }
