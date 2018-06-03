import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzErrorMessageComponent } from './error-message/index';
import { MzValidationComponent } from './validation.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MzErrorMessageComponent,
    MzValidationComponent,
  ],
  entryComponents: [MzErrorMessageComponent],
  exports: [
    MzErrorMessageComponent,
    MzValidationComponent,
  ],
})
export class MzValidationModule { }
