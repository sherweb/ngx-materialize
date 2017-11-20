import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MzButtonModule, MzIconMdiModule, MzParallaxModule } from 'ng2-materialize';
import { MarkdownModule } from 'ngx-markdown';

import { HomeComponent } from './home.component';
import { ROUTES } from './home.routing';

@NgModule({
  imports: [
    MarkdownModule.forRoot(),
    MzButtonModule,
    MzIconMdiModule,
    MzParallaxModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
