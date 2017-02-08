import 'rxjs/add/operator/filter';

import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

type KeyRoutesPair = {key: string, routes: Route[]};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public groupedRoutes: Array<KeyRoutesPair>;

  constructor(private router: Router, private renderer: Renderer, private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Take all the possible routes and group them by sections
    this.groupedRoutes = this.router.config.reduce<Array<KeyRoutesPair>>(
      (returnValues, currentValue: any) => { // currentValue is a route. But, if typed, doesn't compile because of the 'data.section' access
        if (currentValue.data) {
          const key = currentValue.data.section;
          const existingSection = returnValues.find((r) => r && r.key === key);

          if (existingSection) {
            existingSection.routes.push(currentValue);
          } else {
            returnValues.push({ key: key, routes: [currentValue] });
          }
        }
        return returnValues;
      },
      new Array<KeyRoutesPair>());

    // scroll to top on each route change
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const parentElement = this.elementRef.nativeElement.parentElement;
        this.renderer.setElementProperty(parentElement, 'scrollTop', 0);
      });
  }
}
