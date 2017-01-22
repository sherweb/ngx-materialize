import { AfterViewInit, Component, Renderer } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routes.animation';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class CheckboxComponent implements AfterViewInit {

  constructor(private renderer: Renderer) { }

  ngAfterViewInit() {
    this.forceIndeterminate();
  }

  forceIndeterminate() {
    const checkboxElements = $('#indeterminate-checkbox, #filledin-indeterminate-checkbox');
    checkboxElements.each((index, element) => {
      this.renderer.setElementProperty(element, 'indeterminate', 'true');
    });
  }
}
