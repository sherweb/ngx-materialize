import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class BadgeComponent {
  properties: IPropertyRow[] = [
    { name: 'value',
      mandatory: false,
      type: 'number',
      description: `The number to display inside the badge`,
    },
    { name: 'new',
      mandatory: false,
      type: 'boolean',
      description: `If the background must be displayed`,
    },
    { name: 'badgeClass',
      mandatory: false,
      type: 'string',
      description: `Color class for the background`,
      defaultValue: `Default color will be used when the <code class="language-markup">new</code>
        property is <code class="language-markup">true</code>`,
    },
    { name: 'caption',
      mandatory: false,
      type: 'boolean',
      description: `Custom caption to display next to the value`,
    },
  ];
}
