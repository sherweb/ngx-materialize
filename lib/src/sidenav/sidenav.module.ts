import { NgModule } from '@angular/core';

import {
  MzSidenavCollapsibleComponent,
  MzSidenavCollapsibleContentDirective,
  MzSidenavCollapsibleHeaderComponent,
} from './sidenav-collapsible/index';
import { MzSidenavDividerComponent } from './sidenav-divider/index';
import { MzSidenavHeaderComponent } from './sidenav-header/index';
import { MzSidenavLinkComponent } from './sidenav-link/index';
import { MzSidenavSubheaderComponent } from './sidenav-subheader/index';
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
