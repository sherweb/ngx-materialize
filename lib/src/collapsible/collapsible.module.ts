import { NgModule } from '@angular/core';

import {
  MzCollapsibleItemBodyDirective,
  MzCollapsibleItemComponent,
  MzCollapsibleItemHeaderDirective,
} from './collapsible-item/index';
import { MzCollapsibleComponent } from './collapsible.component';

@NgModule({
  declarations: [
    MzCollapsibleComponent,
    MzCollapsibleItemBodyDirective,
    MzCollapsibleItemComponent,
    MzCollapsibleItemHeaderDirective,
  ],
  exports: [
    MzCollapsibleComponent,
    MzCollapsibleItemBodyDirective,
    MzCollapsibleItemComponent,
    MzCollapsibleItemHeaderDirective,
  ],
})
export class MzCollapsibleModule { }
