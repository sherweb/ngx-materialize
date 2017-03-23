import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class SelectComponent {
  properties: IPropertyRow[] = [
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Floating label`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `Show placeholder`,
    },
    { name: 'filledIn',
      mandatory: false,
      type: 'boolean',
      description: `Display checkbox of a multiple select with the filled in style`,
      defaultValue: `false`,
    },
    { name: 'disabled',
      mandatory: false,
      type: 'boolean',
      description: `Disable the select`,
      defaultValue: `false`,
    },
  ];
}
