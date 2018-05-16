import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MzBadgeModule } from './badge';
import { MzButtonModule } from './button';
import { MzCardModule } from './card';
import { MzCheckboxModule } from './checkbox';
import { MzChipModule } from './chip';
import { MzCollapsibleModule } from './collapsible';
import { MzCollectionModule } from './collection';
import { MzDatepickerModule } from './datepicker';
import { MzDropdownModule } from './dropdown';
import { MzFeatureDiscoveryModule } from './feature-discovery';
import { MzIconModule } from './icon';
import { MzIconMdiModule } from './icon-mdi';
import { MzInputModule } from './input';
import { MzMediaModule } from './media';
import { MzModalModule } from './modal';
import { MzNavbarModule } from './navbar';
import { MzPaginationModule } from './pagination';
import { MzParallaxModule } from './parallax';
import { MzProgressModule } from './progress';
import { MzRadioButtonModule } from './radio-button';
import { MzSelectModule } from './select';
import { MzInjectionModule } from './shared';
import { MzSidenavModule } from './sidenav';
import { MzSpinnerModule } from './spinner';
import { MzSwitchModule } from './switch';
import { MzTabModule } from './tab';
import { MzTextareaModule } from './textarea';
import { MzTimepickerModule } from './timepicker';
import { MzToastModule } from './toast';
import { MzTooltipModule } from './tooltip';
import { MzValidationModule } from './validation';

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

/* Deprecated */
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
