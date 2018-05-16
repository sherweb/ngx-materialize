/**
 * As there is no way yet to assign an animation to all route paths use the
 * following workaround to avoid copy-pasting @HostBinding decorators in each components.
 * https://github.com/angular/angular/issues/9845
 *
 * - Import _route-animation-host.scss in your component .scss file
 * - Add the following properties to the @Component decorator
 *
 *   @Component({
 *     ...
 *     host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
 *     animations: [ROUTE_ANIMATION],
 *   })
 *
 * Note that disabling use-host-property-decorator property is necessary to avoid tsling error
 **/
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ROUTE_ANIMATION_HOST = { '[@routeAnimation]': 'true' };

export const ROUTE_ANIMATION =
  trigger('routeAnimation', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(6%)',
      }),
      animate('0.35s cubic-bezier(0.550, 0.055, 0.675, 0.190)'),
    ]),
    transition(':leave', [
      style({
        opacity: 0,
      }),
    ]),
  ]);
