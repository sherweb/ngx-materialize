import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-native-css-class',
  templateUrl: './native-css-class.component.html',
  styleUrls: ['./native-css-class.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class NativeCssClassComponent { }
