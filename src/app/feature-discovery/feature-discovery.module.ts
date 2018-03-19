import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzFeatureDiscoveryComponent } from './feature-discovery.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MzFeatureDiscoveryComponent,
  ],
  exports: [
    MzFeatureDiscoveryComponent,
  ],
})
export class MzFeatureDiscoveryModule { }
