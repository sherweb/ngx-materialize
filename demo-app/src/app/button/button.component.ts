import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ButtonComponent {
  properties: IPropertyRow[] = [
    { name: 'disabled',
      mandatory: false,
      type: 'boolean',
      description: `Button will be disabled`,
      defaultValue: `false`,
    },
    { name: 'flat',
      mandatory: false,
      type: 'boolean',
      description: `Button will have flat style`,
      defaultValue: `false`,
    },
    { name: 'float',
      mandatory: false,
      type: 'boolean',
      description: `Button will have float style`,
      defaultValue: `false`,
    },
    { name: 'large',
      mandatory: false,
      type: 'boolean',
      description: `Button will have large style`,
      defaultValue: `false`,
    },
  ];

  clicked(event) {
    alert('Oh it seems that you click on the submit button');
  }
}
