import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzProgressComponent } from './progress.component';

@NgModule({
    declarations: [MzProgressComponent],
    exports: [MzProgressComponent],
})
export class MzProgressModule { }
