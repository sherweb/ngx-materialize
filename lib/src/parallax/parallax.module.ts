import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzParallaxComponent } from './parallax.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [MzParallaxComponent],
  exports: [MzParallaxComponent],
})
export class MzParallaxModule { }
