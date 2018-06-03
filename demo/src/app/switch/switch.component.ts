import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class SwitchComponent {

  // playground
  labelOff = 'Off';
  labelOn = 'On';
  switchDisabled = false;
  switchValue = true;

  // table properties
  properties: IPropertyRow[] = [
    { name: 'id',
      mandatory: false,
      type: 'string',
      description: `Id of the input`,
    },
    { name: 'off',
      mandatory: false,
      type: 'string',
      description: `Label for 'off' state equivalent to value <code class="language-markup">false</code>`,
    },
    { name: 'on',
      mandatory: false,
      type: 'string',
      description: `Label for 'on' state equivalent to value <code class="language-markup">true</code>`,
    },
  ];
}
