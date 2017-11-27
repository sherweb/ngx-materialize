import { NgModule } from '@angular/core';

import { MzNavbarItemComponent } from './navbar-item';
import { MzNavbarItemContainerComponent } from './navbar-item-container';
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
