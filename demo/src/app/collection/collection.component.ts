import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class CollectionComponent {

  collectionItemProperties: IPropertyRow[] = [
    {
      name: 'dismissable',
      mandatory: false,
      type: 'boolean',
      description: 'Enable collection item to be swiped away (only for touch enabled devices)',
      defaultValue: 'false',
    },
  ];

  collectionLinkProperties: IPropertyRow[] = [
    {
      name: 'active',
      mandatory: false,
      type: 'boolean',
      description: 'Highlight the link item by applying <code class="language-markup">active</code> css class',
      defaultValue: 'false',
    },
  ];
}
