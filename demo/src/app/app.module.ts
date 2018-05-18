import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { MzButtonModule, MzIconMdiModule, MzSidenavModule } from 'ngx-materialize';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routing';

@NgModule({
  imports: [
    // external modules
    BrowserAnimationsModule,
    CommonModule,
    MalihuScrollbarModule.forRoot(),
    MzButtonModule,
    MzIconMdiModule,
    MzSidenavModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(ROUTES),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
