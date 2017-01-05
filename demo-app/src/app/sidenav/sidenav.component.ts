import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routes.animation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class SidenavComponent {
  @ViewChild('codeSample') codeSample: ElementRef;

  // Hide sidenav-demo during route animation
  @HostListener('@routeAnimation.start', ['$event']) onRouteAnimationStart(event: Event) {
    $('#sidenav-demo').css('display', 'none');
  }

  // Make sidenav-demo visible again after route animation
  @HostListener('@routeAnimation.done', ['$event']) onRouteAnimationDone(event: Event) {
    $('#sidenav-demo').css('display', 'block');
  }
}
