// tslint:disable:max-line-length

import { Routes } from '@angular/router';

import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { CollectionComponent } from './collection/collection.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { HomeComponent } from './home/home.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { MaterializeCssClassComponent } from './materialize-css-class/materialize-css-class.component';
import { MediaComponent } from './media/media.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { ProgressComponent } from './progress/progress.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ToastComponent } from './toast/toast.component';
import { TooltipComponent } from './tooltip/tooltip.component';

// sections name
const css = 'CSS';
const formControls = 'Form Controls';
const layout = 'Layout';
const loading = 'Loading';
const indicator = 'Indicators';
const service = 'Services';

export const ROUTES: Routes = [
  // home route
  { path: 'home', component: HomeComponent },

  // components routes - CSS
  /* tslint:disable:max-line-length */
  { path: 'materialize-css-class', component: MaterializeCssClassComponent, data: { icon: 'language-css3', text: 'Materialize CSS Class', section: css } },

  // components routes - Form controls
  { path: 'button', component: ButtonComponent, data: { icon: 'box-shadow', text: 'Button', section: formControls } },
  { path: 'checkbox', component: CheckboxComponent, data: { icon: 'checkbox-marked', text: 'Checkbox', section: formControls } },
  { path: 'input', component: InputComponent, data: { icon: 'textbox', text: 'Input', section: formControls } },
  { path: 'radio-button', component: RadioButtonComponent, data: { icon: 'radiobox-marked', text: 'Radio button', section: formControls } },
  { path: 'select', component: SelectComponent, data: { icon: 'menu-down-outline', text: 'Select', section: formControls } },
  { path: 'textarea', component: TextareaComponent, data: { icon: 'cursor-text', text: 'Textarea', section: formControls } },

  // components routes - Layout
  { path: 'card', component: CardComponent, data: { icon: 'cards-outline', text: 'Card', section: layout } },
  { path: 'collapsible', component: CollapsibleComponent, data: { icon: 'view-carousel', class: 'rotate90', text: 'Collapsible', section: layout } },
  { path: 'collection', component: CollectionComponent, data: { icon: 'view-sequential', text: 'Collection', section: layout } },
  { path: 'dropdown', component: DropdownComponent, data: { icon: 'dots-vertical', text: 'Dropdown', section: layout } },
  { path: 'modal', component: ModalComponent, data: { icon: 'image-filter-none', text: 'Modal', section: layout } },
  { path: 'navbar', component: NavbarComponent, data: { icon: 'view-day', text: 'Navbar', section: layout } },
  { path: 'parallax', component: ParallaxComponent, data: { icon: 'image-area', text: 'Parallax', section: layout } },
  { path: 'sidenav', component: SidenavComponent, data: { icon: 'menu', text: 'Sidenav', section: layout } },

  // components routes - Loading
  { path: 'progress', component: ProgressComponent, data: { icon: 'timer-sand', text: 'Progress', section: loading } },
  { path: 'spinner', component: SpinnerComponent, data: { icon: 'reload', text: 'Spinner', section: loading } },

  // components routes - Indicator
  { path: 'badge', component: BadgeComponent, data: { icon: 'numeric-2-box-outline', text: 'Badge', section: indicator } },
  { path: 'icon', component: IconComponent, data: { icon: 'emoticon-happy', text: 'Icon', section: indicator } },
  { path: 'toast', component: ToastComponent, data: { icon: 'tooltip-text', text: 'Toast', section: indicator } },
  { path: 'tooltip', component: TooltipComponent, data: { icon: 'tooltip', text: 'Tooltip', section: indicator } },

  // components routes - Service
  { path: 'media', component: MediaComponent, data: { icon: 'monitor', text: 'Media', section: service } },

  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
