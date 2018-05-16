import { Component, OnInit, Renderer } from '@angular/core';
import { Media, MzMediaService } from 'ngx-materialize';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class MediaComponent implements OnInit {

  media: Observable<Media>;

  greaterThanSmall: Observable<boolean>;
  greaterThanMedium: Observable<boolean>;
  greaterThanLarge: Observable<boolean>;

  constructor(
    private mediaService: MzMediaService,
    private renderer: Renderer,
  ) {
    this.media = this.mediaService.media;
    this.greaterThanSmall = this.mediaService.isActive('gt-s');
    this.greaterThanMedium = this.mediaService.isActive('gt-m');
    this.greaterThanLarge = this.mediaService.isActive('gt-l');
  }

  ngOnInit() {
    // initialize scrollspy
    const scrollSpy = $('.scrollspy');
    this.renderer.invokeElementMethod(scrollSpy, 'scrollSpy');
  }
}
