import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class RadioButtonComponent {

  // playground
  radioOption1Label = 'Option 1';
  radioOption2Label = 'Option 2';
  radioWithGap = false;
  radioDisabled = false;
  radioValue = this.radioOption1Label;

  // table properties
  properties: IPropertyRow[] = [
    { name: 'id',
      mandatory: true,
      type: 'string',
      description: `Id of the input`,
    },
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Radio button label`,
    },
    { name: 'name',
      mandatory: false,
      type: 'string',
      description: `Radio group name`,
    },
    { name: 'withGap',
      mandatory: false,
      type: 'boolean',
      description: `Show gap style radio-button`,
      defaultValue: `false`,
    },
  ];
}
