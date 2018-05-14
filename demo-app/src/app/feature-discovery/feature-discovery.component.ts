import { Component, OnInit, Renderer } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-feature-discovery',
  templateUrl: './feature-discovery.component.html',
  styleUrls: ['./feature-discovery.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class FeatureDiscoveryComponent implements OnInit {
  // table properties
  properties: IPropertyRow[] = [
    { name: 'targetId',
      mandatory: true,
      type: 'string',
      description: `Id of the target for feature discovery`,
    },
  ];

  constructor(
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    // initialize scrollspy
    const scrollSpy = $('.scrollspy');
    this.renderer.invokeElementMethod(scrollSpy, 'scrollSpy');
  }
}
