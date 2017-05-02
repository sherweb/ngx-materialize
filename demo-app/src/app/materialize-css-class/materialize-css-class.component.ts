import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-materialize-css-class',
  templateUrl: './materialize-css-class.component.html',
  styleUrls: ['./materialize-css-class.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class MaterializeCssClassComponent {
  pages: any[];

  constructor() {
    this.pages = [
      { name: 'Color', link: 'http://materializecss.com/color.html' },
      { name: 'Grid', link: 'http://materializecss.com/grid.html' },
      { name: 'Helpers', link: 'http://materializecss.com/helpers.html' },
      { name: 'Media', link: 'http://materializecss.com/media-css.html' },
      { name: 'Pulse', link: 'http://materializecss.com/pulse.html' },
      { name: 'Sass', link: 'http://materializecss.com/sass.html' },
      { name: 'Shadow', link: 'http://materializecss.com/shadow.html' },
      { name: 'Table', link: 'http://materializecss.com/table.html' },
      { name: 'Transitions', link: 'http://materializecss.com/css-transitions.html' },
      { name: 'Typography', link: 'http://materializecss.com/typography.html' },
      { name: 'Waves', link: 'http://materializecss.com/waves.html' },
    ];
  }
}
