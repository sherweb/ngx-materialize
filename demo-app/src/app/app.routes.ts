import { Routes } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { FormBindingComponent } from './form-binding/form-binding.component';
import { HomeComponent } from './home/home.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { ProgressComponent } from './progress/progress.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextareaComponent } from './textarea/textarea.component';

export const ROUTES: Routes = [
  // home route
  { path: 'home', component: HomeComponent, data: { icon: 'home', text: 'Home' } },

  // components routes
  { path: 'button', component: ButtonComponent, data: { icon: 'box-shadow', text: 'Button' } },
  { path: 'card', component: CardComponent, data: { icon: 'cards-outline', text: 'Card' } },
  { path: 'checkbox', component: CheckboxComponent, data: { icon: 'checkbox-marked', text: 'Checkbox' } },
  { path: 'collapsible', component: CollapsibleComponent, data: { icon: 'view-carousel', class: 'rotate90', text: 'Collapsible' } },
  { path: 'form-binding', component: FormBindingComponent, data: { icon: 'code-brackets', text: 'Form Binding' } },
  { path: 'icon', component: IconComponent, data: { icon: 'emoticon-happy', text: 'Icon' } },
  { path: 'input', component: InputComponent, data: { icon: 'textbox', text: 'Input' } },
  { path: 'navbar', component: NavbarComponent, data: { icon: 'view-day', text: 'Navbar' } },
  { path: 'parallax', component: ParallaxComponent, data: { icon: 'image-area', text: 'Parallax' } },
  { path: 'progress', component: ProgressComponent, data: { icon: 'timer-sand', text: 'Progress' } },
  { path: 'radio-button', component: RadioButtonComponent, data: { icon: 'radiobox-marked', text: 'Radio button' } },
  { path: 'select', component: SelectComponent, data: { icon: 'menu-down-outline', text: 'Select' } },
  { path: 'sidenav', component: SidenavComponent, data: { icon: 'menu', text: 'Sidenav' } },
  { path: 'spinner', component: SpinnerComponent, data: { icon: 'reload', text: 'Spinner' } },
  { path: 'textarea', component: TextareaComponent, data: { icon: 'cursor-text', text: 'Textarea' } },

  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
