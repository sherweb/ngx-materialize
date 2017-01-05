import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ButtonModule } from './button/button.module';
import { CardModule } from './card/card.module';
import { HomeModule } from './home/home.module';
import { IconModule } from './icon/icon.module';
import { NavbarModule } from './navbar/navbar.module';
import { ParallaxModule } from './parallax/parallax.module';
import { ProgressModule } from './progress/progress.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  imports: [
    // application modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule.forRoot(),
    RouterModule.forRoot(ROUTES),

    // component modules
    ButtonModule,
    CardModule,
    HomeModule,
    IconModule,
    NavbarModule,
    ParallaxModule,
    ProgressModule,
    SidenavModule,
    SpinnerModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
