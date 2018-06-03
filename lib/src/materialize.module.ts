import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MzBadgeModule } from './badge/badge.module';
import { MzButtonModule } from './button/button.module';
import { MzCardModule } from './card/card.module';
import { MzCheckboxModule } from './checkbox/checkbox.module';
import { MzChipModule } from './chip/chip.module';
import { MzCollapsibleModule } from './collapsible/collapsible.module';
import { MzCollectionModule } from './collection/collection.module';
import { MzDatepickerModule } from './datepicker/datepicker.module';
import { MzDropdownModule } from './dropdown/dropdown.module';
import { MzFeatureDiscoveryModule } from './feature-discovery/feature-discovery.module';
import { MzIconMdiModule } from './icon-mdi/icon-mdi.module';
import { MzIconModule } from './icon/icon.module';
import { MzInputModule } from './input/input.module';
import { MzMediaModule } from './media/media.module';
import { MzModalModule } from './modal/modal.module';
import { MzNavbarModule } from './navbar/navbar.module';
import { MzPaginationModule } from './pagination/pagination.module';
import { MzParallaxModule } from './parallax/parallax.module';
import { MzProgressModule } from './progress/progress.module';
import { MzRadioButtonModule } from './radio-button/radio-button.module';
import { MzSelectModule } from './select/select.module';
import { MzInjectionModule } from './shared/injection/injection.module';
import { MzSidenavModule } from './sidenav/sidenav.module';
import { MzSpinnerModule } from './spinner/spinner.module';
import { MzSwitchModule } from './switch/switch.module';
import { MzTabModule } from './tab/tab.module';
import { MzTextareaModule } from './textarea/textarea.module';
import { MzTimepickerModule } from './timepicker/timepicker.module';
import { MzToastModule } from './toast/toast.module';
import { MzTooltipModule } from './tooltip/tooltip.module';
import { MzValidationModule } from './validation/validation.module';

const MZ_MODULES = [
  CommonModule,
  FormsModule,
  MzBadgeModule,
  MzButtonModule,
  MzCardModule,
  MzCheckboxModule,
  MzChipModule,
  MzCollapsibleModule,
  MzCollectionModule,
  MzDatepickerModule,
  MzDropdownModule,
  MzFeatureDiscoveryModule,
  MzIconModule,
  MzIconMdiModule,
  MzInjectionModule,
  MzInputModule,
  MzMediaModule,
  MzModalModule,
  MzNavbarModule,
  MzPaginationModule,
  MzParallaxModule,
  MzProgressModule,
  MzRadioButtonModule,
  MzSelectModule,
  MzSidenavModule,
  MzSpinnerModule,
  MzSwitchModule,
  MzTabModule,
  MzTextareaModule,
  MzTimepickerModule,
  MzToastModule,
  MzTooltipModule,
  MzValidationModule,
];

/**
 * @deprecated
 * Import specific component modules instead (MzBadgeModule, MzCardModule, etc)
 * https://github.com/sherweb/ng2-materialize#materializemodule-deprecated
 */
@NgModule({
  imports: MZ_MODULES,
  exports: MZ_MODULES,
})
export class MaterializeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterializeModule,
    };
  }
}
