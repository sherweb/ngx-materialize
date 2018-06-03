import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

import { MatchOperator, Media, MediaBreakpoint } from './models/index';

@Injectable()
export class MzMediaService {

  media: Observable<Media>;

  // based on nodes_modules/materialize-css/sass/components/_variable.scss
  private readonly mediaBreakpoints: MediaBreakpoint[] = [
    { alias: 's', minWidth: 0, maxWidth: 600 },
    { alias: 'm', minWidth: 601, maxWidth: 992 },
    { alias: 'l', minWidth: 993, maxWidth: 1200 },
    { alias: 'xl', minWidth: 1201, maxWidth: Number.MAX_VALUE },
  ];

  private readonly matchOperators: MatchOperator[] = [
    {
      operator: 'gt',
      match: (breakpoint: MediaBreakpoint) => window.innerWidth > breakpoint.maxWidth,
    },
    {
      operator: 'lt',
      match: (breakpoint: MediaBreakpoint) => window.innerWidth < breakpoint.minWidth,
    },
    {
      operator: null,
      match: (breakpoint: MediaBreakpoint) => window.innerWidth >= breakpoint.minWidth && window.innerWidth <= breakpoint.maxWidth,
    },
  ];

  constructor() {
    this.media = this.registerWindowResizeListener();
  }

  isActive(breakpoint: string): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.media.subscribe((media: Media) => {
        try {
          subscriber.next(this.isActiveBreakpoint(breakpoint));
        } catch (error) {
          subscriber.error(error);
        }
      });
    });
  }

  private registerWindowResizeListener(): Observable<Media> {
    return fromEvent(window, 'resize')
      .pipe(
        map(() => this.getWindowMedia()),
        startWith(this.getWindowMedia()),
        publishReplay(1),
        refCount(),
      );
  }

  private getWindowMedia(): Media {
    return {
      alias: this.mediaBreakpoints.find((breakpoint: MediaBreakpoint) => window.innerWidth <= breakpoint.maxWidth).alias,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  }

  private isActiveBreakpoint(breakpoint: string): boolean {
    let matchOperator: MatchOperator;
    let mediaBreakpoint: MediaBreakpoint;

    if (breakpoint) {
      const fragments = breakpoint.split('-');

      if (fragments.length === 1) {
        matchOperator = this.matchOperators.find(x => x.operator === null);
        mediaBreakpoint = this.mediaBreakpoints.find(x => x.alias === fragments[0]);
      } else if (fragments.length === 2) {
        matchOperator = this.matchOperators.find(x => x.operator === fragments[0]);
        mediaBreakpoint = this.mediaBreakpoints.find(x => x.alias === fragments[1]);
      }
    }

    if (!mediaBreakpoint || !matchOperator) {
      throw Error(`MzMediaService.isActive parameter is invalid: '${breakpoint}' is not a recognized breakpoint.`);
    }

    return matchOperator.match(mediaBreakpoint);
  }
}
