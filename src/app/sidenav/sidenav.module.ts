import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzSidenavCollapsibleHeaderComponent } from './sidenav-collapsible/sidenav-collapsible-header/sidenav-collapsible-header.component';
import { MzSidenavCollapsibleComponent, MzSidenavCollapsibleContentDirective } from './sidenav-collapsible/sidenav-collapsible.component';
import { MzSidenavDividerComponent } from './sidenav-divider/sidenav-divider.component';
import { MzSidenavHeaderComponent } from './sidenav-header/sidenav-header.component';
import { MzSidenavLinkComponent } from './sidenav-link/sidenav-link.component';
import { MzSidenavSubheaderComponent } from './sidenav-subheader/sidenav-subheader.component';
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
