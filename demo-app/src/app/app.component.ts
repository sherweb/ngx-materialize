import 'rxjs/add/operator/filter';

import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

type SectionRoutesPair = { section: string, routes: Route[] };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public groupedRoutes: Array<SectionRoutesPair>;

  constructor(
    private router: Router,
    private renderer: Renderer,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.populateSideNavWithRoutesGroupedBySections();
    this.setNavigationEndEvent();
  }

  populateSideNavWithRoutesGroupedBySections() {
    // Take all routes with data and group them by sections
    this.groupedRoutes = this.router.config.reduce<Array<SectionRoutesPair>>(
      (returnValues, currentValue) => {
        if (currentValue.data) {
          const section = currentValue.data['section'];
          const existingSection = returnValues.find((r) => r && r.section === section);

          if (existingSection) {
            existingSection.routes.push(currentValue);
          } else {
            returnValues.push({ section: section, routes: [currentValue] });
          }
        }
        return returnValues;
      },
      new Array<SectionRoutesPair>());
  }

  setNavigationEndEvent() {
    // scroll to top on each route change
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const parentElement = this.elementRef.nativeElement.parentElement;
        this.renderer.setElementProperty(parentElement, 'scrollTop', 0);
      });
  }
}
