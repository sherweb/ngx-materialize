import 'rxjs/add/operator/filter';

import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { Router, Route, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public routes: Route[];

  constructor(private router: Router, private renderer: Renderer, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.routes = this.router.config;

    // scroll to top on each route change
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const parentElement = this.elementRef.nativeElement.parentElement;
        this.renderer.setElementProperty(parentElement, 'scrollTop', 0);
      });
  }
}
