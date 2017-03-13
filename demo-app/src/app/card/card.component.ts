import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class CardComponent {
  properties: IPropertyRow[] = [
    { name: 'backgroundClass',
      mandatory: false,
      type: 'string',
      description: `Background css class to be applied on the card`,
    },
    { name: 'hoverable',
      mandatory: false,
      type: 'boolean',
      description: `Box-shadow css animnation on card rollover`,
      defaultValue: `false`,
    },
    { name: 'textClass',
      mandatory: false,
      type: 'string',
      description: `Text css class to be applied on the card`,
    },
  ];
}
