// Need this module to prevent error 'Cannot determine the module for class TestWrapperComponent' with AoT compiling
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzTestWrapperComponent } from './test-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [MzTestWrapperComponent],
  declarations: [MzTestWrapperComponent],
})
export class TestWrapperModule { }
