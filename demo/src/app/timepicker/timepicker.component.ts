import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class TimepickerComponent {
  // options example
  options: any = {
    default: 'now',
    fromnow: 0,
    twelvehour: true,
    donetext: 'OK',
    cleartext: 'Clear',
    canceltext: 'Cancel',
    autoclose: true,
    ampmclickable: true,
    afterShow: () => alert('AfterShow has been invoked.'),
  };

  // playground
  timepickerValue: string;
  timepickerLabel = 'Label';
  timepickerPlaceholder = 'Placeholder';
  timepickerDisabled = false;
  timepickerOptions: any = {
    default: 'now',
    fromnow: 0,
    twelvehour: true,
    donetext: 'OK',
    cleartext: 'Clear',
    canceltext: 'Cancel',
    autoclose: true,
    ampmclickable: true,
  };

  // table properties
  timepickerContainerProperties: IPropertyRow[] = [
    { name: 'inline',
      mandatory: false,
      type: 'boolean',
      description: 'Show timepicker inline',
      defaultValue: 'false',
    },
  ];

  timepickerProperties: IPropertyRow[] = [
    { name: 'id',
      mandatory: true,
      type: 'string',
      description: `Id of the input`,
    },
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Floating label`,
    },
    { name: 'options',
      mandatory: false,
      type: 'Pickadate.TimeOptions',
      description: `Timepicker options`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `Placeholder text`,
    },
  ];
}
