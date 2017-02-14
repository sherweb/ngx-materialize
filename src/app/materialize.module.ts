import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import * as Badge from './badge/badge.component';
import * as Button from './button';
import * as Card from './card/card.component';
import * as Checkbox from './checkbox';
import * as Collapsible from './collapsible';
import * as Dropdown from './dropdown';
import * as Icon from './icon';
import * as Input from './input';
import * as Navbar from './navbar';
import * as Parallax from './parallax/parallax.component';
import * as Progress from './progress/progress.component';
import * as RadioButton from './radio-button';
import * as Select from './select';
import * as Sidenav from './sidenav';
import * as Spinner from './spinner/spinner.component';
import * as Textarea from './textarea';

const MZ_COMPONENTS = [
  Badge.MzBadgeComponent,
  Button.MzButtonDirective,
  Card.MzCardActionDirective,
  Card.MzCardComponent,
  Card.MzCardContentDirective,
  Card.MzCardTitleDirective,
  Checkbox.MzCheckboxContainerComponent,
  Checkbox.MzCheckboxDirective,
  Collapsible.MzCollapsibleComponent,
  Collapsible.MzCollapsibleItemBodyDirective,
  Collapsible.MzCollapsibleItemComponent,
  Collapsible.MzCollapsibleItemHeaderDirective,
  Dropdown.MzDropdownComponent,
  Dropdown.MzDropdownDividerComponent,
  Dropdown.MzDropdownItemComponent,
  Icon.MzIconDirective,
  Icon.MzIconMdiDirective,
  Input.MzInputContainerComponent,
  Input.MzInputDirective,
  Input.MzInputPrefixDirective,
  Navbar.MzNavbarComponent,
  Navbar.MzNavbarItemComponent,
  Navbar.MzNavbarItemContainerComponent,
  Parallax.MzParallaxComponent,
  Progress.MzProgressComponent,
  RadioButton.MzRadioButtonContainerComponent,
  RadioButton.MzRadioButtonDirective,
  Select.MzSelectContainerComponent,
  Select.MzSelectDirective,
  Sidenav.MzSidenavCollapsibleComponent,
  Sidenav.MzSidenavCollapsibleContentDirective,
  Sidenav.MzSidenavCollapsibleHeaderDirective,
  Sidenav.MzSidenavComponent,
  Sidenav.MzSidenavDividerComponent,
  Sidenav.MzSidenavHeaderComponent,
  Sidenav.MzSidenavLinkComponent,
  Sidenav.MzSidenavSubheaderComponent,
  Spinner.MzSpinnerComponent,
  Textarea.MzTextareaDirective,
  Textarea.MzTextareaPrefixDirective,
  Textarea.MzTextareaContainerComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: MZ_COMPONENTS,
  declarations: MZ_COMPONENTS,
})
export class MaterializeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterializeModule,
    };
  }
}
