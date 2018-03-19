import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

// sections name
const css = 'CSS';
const formControls = 'Form Controls';
const layout = 'Layout';
const loading = 'Loading';
const indicator = 'Indicators';
const service = 'Services';

// tslint:disable:max-line-length
export const ROUTES: Routes = [
  // home route
  { path: 'home', loadChildren: './home/home.module#HomeModule' },

  // components routes - CSS
  { path: 'materialize-css-class', loadChildren: './materialize-css-class/materialize-css-class.module#MaterializeCssClassModule', data: { icon: 'language-css3', text: 'Materialize CSS Class', section: css } },

  // components routes - Form controls
  { path: 'button', loadChildren: './button/button.module#ButtonModule', data: { icon: 'box-shadow', text: 'Button', section: formControls } },
  { path: 'checkbox', loadChildren: './checkbox/checkbox.module#CheckboxModule', data: { icon: 'checkbox-marked', text: 'Checkbox', section: formControls } },
  { path: 'chip', loadChildren: './chip/chip.module#ChipModule', data: { icon: 'tag', text: 'Chip', section: formControls } },
  { path: 'datepicker', loadChildren: './datepicker/datepicker.module#DatepickerModule', data: { icon: 'calendar', text: 'Datepicker', section: formControls } },
  { path: 'form-validation', loadChildren: './validation/validation.module#ValidationModule', data: { icon: 'checkbox-marked-circle-outline', text: 'Form validation', section: formControls } },
  { path: 'input', loadChildren: './input/input.module#InputModule', data: { icon: 'textbox', text: 'Input', section: formControls } },
  { path: 'radio-button', loadChildren: './radio-button/radio-button.module#RadioButtonModule', data: { icon: 'radiobox-marked', text: 'Radio button', section: formControls } },
  { path: 'select', loadChildren: './select/select.module#SelectModule', data: { icon: 'menu-down-outline', text: 'Select', section: formControls } },
  { path: 'switch', loadChildren: './switch/switch.module#SwitchModule', data: { icon: 'toggle-switch', text: 'Switch', section: formControls } },
  { path: 'textarea', loadChildren: './textarea/textarea.module#TextareaModule', data: { icon: 'cursor-text', text: 'Textarea', section: formControls } },
  { path: 'timepicker', loadChildren: './timepicker/timepicker.module#TimepickerModule', data: { icon: 'clock', text: 'Timepicker', section: formControls } },

  // components routes - Layout
  { path: 'card', loadChildren: './card/card.module#CardModule', data: { icon: 'cards-outline', text: 'Card', section: layout } },
  { path: 'collapsible', loadChildren: './collapsible/collapsible.module#CollapsibleModule', data: { icon: 'view-carousel', class: 'rotate90', text: 'Collapsible', section: layout } },
  { path: 'collection', loadChildren: './collection/collection.module#CollectionModule', data: { icon: 'view-sequential', text: 'Collection', section: layout } },
  { path: 'dropdown', loadChildren: './dropdown/dropdown.module#DropdownModule', data: { icon: 'dots-vertical', text: 'Dropdown', section: layout } },
  { path: 'modal', loadChildren: './modal/modal.module#ModalModule', data: { icon: 'image-filter-none', text: 'Modal', section: layout } },
  { path: 'navbar', loadChildren: './navbar/navbar.module#NavbarModule', data: { icon: 'view-day', text: 'Navbar', section: layout } },
  { path: 'parallax', loadChildren: './parallax/parallax.module#ParallaxModule', data: { icon: 'image-area', text: 'Parallax', section: layout } },
  { path: 'sidenav', loadChildren: './sidenav/sidenav.module#SidenavModule', data: { icon: 'menu', text: 'Sidenav', section: layout } },
  { path: 'tab', loadChildren: './tab/tab.module#TabModule', data: { icon: 'tab', text: 'Tab', section: layout } },

  // components routes - Loading
  { path: 'progress', loadChildren: './progress/progress.module#ProgressModule', data: { icon: 'timer-sand', text: 'Progress', section: loading } },
  { path: 'spinner', loadChildren: './spinner/spinner.module#SpinnerModule', data: { icon: 'reload', text: 'Spinner', section: loading } },

  // components routes - Indicator
  { path: 'badge', loadChildren: './badge/badge.module#BadgeModule', data: { icon: 'numeric-2-box-outline', text: 'Badge', section: indicator } },
  { path: 'feature-discovery', loadChildren: './feature-discovery/feature-discovery.module#FeatureDiscoveryModule', data: { icon: 'asterisk', text: 'Feature discovery', section: indicator } },
  { path: 'icon', loadChildren: './icon/icon.module#IconModule', data: { icon: 'emoticon-happy', text: 'Icon', section: indicator } },
  { path: 'toast', loadChildren: './toast/toast.module#ToastModule', data: { icon: 'tooltip-text', text: 'Toast', section: indicator } },
  { path: 'tooltip', loadChildren: './tooltip/tooltip.module#TooltipModule', data: { icon: 'tooltip', text: 'Tooltip', section: indicator } },

  // components routes - Service
  { path: 'media', loadChildren: './media/media.module#MediaModule', data: { icon: 'monitor', text: 'Media', section: service } },

  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
