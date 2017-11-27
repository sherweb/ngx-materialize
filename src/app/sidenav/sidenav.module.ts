import { NgModule } from '@angular/core';

import {
  MzSidenavCollapsibleComponent,
  MzSidenavCollapsibleContentDirective,
  MzSidenavCollapsibleHeaderComponent,
} from './sidenav-collapsible';
import { MzSidenavDividerComponent } from './sidenav-divider';
import { MzSidenavHeaderComponent } from './sidenav-header';
import { MzSidenavLinkComponent } from './sidenav-link';
import { MzSidenavSubheaderComponent } from './sidenav-subheader';
import { MzSidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [
    MzSidenavCollapsibleComponent,
    MzSidenavCollapsibleContentDirective,
    MzSidenavCollapsibleHeaderComponent,
    MzSidenavComponent,
    MzSidenavDividerComponent,
    MzSidenavHeaderComponent,
    MzSidenavLinkComponent,
    MzSidenavSubheaderComponent,
  ],
  exports: [
    MzSidenavCollapsibleComponent,
    MzSidenavCollapsibleContentDirective,
    MzSidenavCollapsibleHeaderComponent,
    MzSidenavComponent,
    MzSidenavDividerComponent,
    MzSidenavHeaderComponent,
    MzSidenavLinkComponent,
    MzSidenavSubheaderComponent,
  ],
})
export class MzSidenavModule { }
