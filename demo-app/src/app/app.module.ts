import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { BadgeModule } from './badge/badge.module';
import { ButtonModule } from './button/button.module';
import { CardModule } from './card/card.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CollapsibleModule } from './collapsible/collapsible.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { FormBindingModule } from './form-binding/form-binding.module';
import { HomeModule } from './home/home.module';
import { IconModule } from './icon/icon.module';
import { InputModule } from './input/input.module';
import { NavbarModule } from './navbar/navbar.module';
import { ParallaxModule } from './parallax/parallax.module';
import { ProgressModule } from './progress/progress.module';
import { RadioButtonModule } from './radio-button/radio-button.module';
import { SelectModule } from './select/select.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { SpinnerModule } from './spinner/spinner.module';
import { TextareaModule } from './textarea/textarea.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  imports: [
    // external modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MalihuScrollbarModule.forRoot(),
    MaterializeModule.forRoot(),
    RouterModule.forRoot(ROUTES),

    // internal modules
    BadgeModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    CollapsibleModule,
    DropdownModule,
    FormBindingModule,
    HomeModule,
    IconModule,
    InputModule,
    NavbarModule,
    ParallaxModule,
    ProgressModule,
    RadioButtonModule,
    SelectModule,
    SidenavModule,
    SpinnerModule,
    TextareaModule,
    ToastModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
