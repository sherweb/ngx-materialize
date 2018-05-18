import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { MzSidenavComponent } from 'ngx-materialize';
import { filter } from 'rxjs/operators';

abstract class SectionRoutesPair {
  section: string;
  routes: Route[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MzSidenavComponent;

  groupedRoutes: Array<SectionRoutesPair>;
  scrollElement: JQuery;

  constructor(
    private router: Router,
    private mScrollbarService: MalihuScrollbarService,
  ) { }

  ngOnInit() {
    this.populateSideNavWithRoutesGroupedBySections();
    this.setNavigationEndEvent();
  }

  ngAfterViewInit() {
    this.initElement();
    this.initScrollbar();
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy(this.scrollElement);
  }

  initElement() {
    this.scrollElement = $(`#${this.sidenav.id}`);
  }

  initScrollbar() {
    this.mScrollbarService.initScrollbar(this.scrollElement, { axis: 'y', theme: 'minimal', scrollInertia: 100 });
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }
}
