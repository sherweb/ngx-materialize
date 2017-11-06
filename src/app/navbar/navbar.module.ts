import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzNavbarItemContainerComponent } from './navbar-item-container/navbar-item-container.component';
import { MzNavbarItemComponent } from './navbar-item/navbar-item.component';
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
