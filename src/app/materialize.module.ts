import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import * as Button from './button/button.component';
import * as Card from './card/card.component';
import * as Icon from './icon/icon.component';
import * as Navbar from './navbar';
import * as Parallax from './parallax/parallax.component';
import * as Progress from './progress/progress.component';
import * as Sidenav from './sidenav';
import * as Spinner from './spinner/spinner.component';

const MZ_COMPONENTS = [
  Button.MzButtonComponent,
  Card.MzCardActionDirective,
  Card.MzCardComponent,
  Card.MzCardContentDirective,
  Card.MzCardTitleDirective,
  Icon.MzIconComponent,
  Navbar.MzNavbarComponent,
  Navbar.MzNavbarItemComponent,
  Navbar.MzNavbarItemContainerComponent,
  Parallax.MzParallaxComponent,
  Progress.MzProgressComponent,
  Sidenav.MzSidenavCollapsibleComponent,
  Sidenav.MzSidenavCollapsibleContentDirective,
  Sidenav.MzSidenavCollapsibleHeaderDirective,
  Sidenav.MzSidenavComponent,
  Sidenav.MzSidenavDividerComponent,
  Sidenav.MzSidenavHeaderComponent,
  Sidenav.MzSidenavLinkComponent,
  Sidenav.MzSidenavSubheaderComponent,
  Spinner.MzSpinnerComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: MZ_COMPONENTS,
  declarations: MZ_COMPONENTS,
  providers: [],
})
export class MaterializeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterializeModule,
      providers: [],
    };
  }
}
