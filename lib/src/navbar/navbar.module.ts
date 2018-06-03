import { NgModule } from '@angular/core';

import { MzNavbarItemContainerComponent } from './navbar-item-container/index';
import { MzNavbarItemComponent } from './navbar-item/index';
import { MzNavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    MzNavbarComponent,
    MzNavbarItemComponent,
    MzNavbarItemContainerComponent,
  ],
  exports: [
    MzNavbarComponent,
    MzNavbarItemComponent,
    MzNavbarItemContainerComponent,
  ],
})
export class MzNavbarModule { }
