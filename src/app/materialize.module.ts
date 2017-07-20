import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as Badge from './badge/badge.component';
import * as Button from './button';
import * as Card from './card/card.component';
import * as Checkbox from './checkbox';
import * as Collapsible from './collapsible';
import * as Collection from './collection';
import * as Dropdown from './dropdown';
import * as Icon from './icon';
import * as Input from './input';
import * as Media from './media';
import * as Modal from './modal';
import * as Navbar from './navbar';
import * as Parallax from './parallax/parallax.component';
import * as Progress from './progress/progress.component';
import * as RadioButton from './radio-button';
import * as Select from './select';
import * as Shared from './shared';
import * as Sidenav from './sidenav';
import * as Spinner from './spinner/spinner.component';
import * as Textarea from './textarea';
import * as Toast from './toast';
import * as Tooltip from './tooltip';
import * as Validation from './validation';

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
  Collection.MzAvatarDirective,
  Collection.MzCollectionComponent,
  Collection.MzCollectionHeaderComponent,
  Collection.MzCollectionItemComponent,
  Collection.MzCollectionLinkDirective,
  Collection.MzSecondaryContentDirective,
  Dropdown.MzDropdownComponent,
  Dropdown.MzDropdownDividerComponent,
  Dropdown.MzDropdownItemComponent,
  Icon.MzIconDirective,
  Icon.MzIconMdiDirective,
  Input.MzInputContainerComponent,
  Input.MzInputDirective,
  Input.MzInputPrefixDirective,
  Modal.MzModalCloseDirective,
  Modal.MzModalComponent,
  Modal.MzModalContentDirective,
  Modal.MzModalFooterDirective,
  Modal.MzModalHeaderDirective,
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
  Sidenav.MzSidenavCollapsibleHeaderComponent,
  Sidenav.MzSidenavComponent,
  Sidenav.MzSidenavDividerComponent,
  Sidenav.MzSidenavHeaderComponent,
  Sidenav.MzSidenavLinkComponent,
  Sidenav.MzSidenavSubheaderComponent,
  Spinner.MzSpinnerComponent,
  Textarea.MzTextareaDirective,
  Textarea.MzTextareaPrefixDirective,
  Textarea.MzTextareaContainerComponent,
  Tooltip.MzTooltipDirective,
  Validation.MzErrorMessageComponent,
  Validation.MzValidationComponent,
];

const MZ_ENTRY_COMPONENTS = [
  Validation.MzErrorMessageComponent,
];

const MZ_PROVIDERS = [
  Media.MzMediaService,
  Modal.MzModalService,
  Shared.MzInjectionService,
  Toast.MzToastService,
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
  ],
  exports: MZ_COMPONENTS,
  declarations: MZ_COMPONENTS,
  entryComponents: MZ_ENTRY_COMPONENTS,
  providers: MZ_PROVIDERS,
})
export class MaterializeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterializeModule,
    };
  }
}
