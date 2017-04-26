import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
  encapsulation: ViewEncapsulation.None,
})
export class CollectionComponent {

  // table properties
  properties: IPropertyRow[] = [
    // {
    //   name: 'delay',
    //   mandatory: false,
    //   type: 'number',
    //   description: 'Delay time in milliseconds before tooltip appears',
    //   defaultValue: '350',
    // },
  ];
}
