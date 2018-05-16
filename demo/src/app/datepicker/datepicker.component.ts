import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class DatepickerComponent {

  // options example
  options: Pickadate.DateOptions = {
    clear: 'Clear', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Today', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
    onClose: () => alert('Close has been invoked.'),
    onOpen: () => alert('Open has been invoked.'),
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year
  };

  // playground
  datepickerValue: string;
  datepickerLabel = 'Label';
  datepickerPlaceholder = 'Placeholder';
  datepickerDisabled = false;
  datepickerOptions: Pickadate.DateOptions = {
    format: 'dddd, dd mmm, yyyy',
    formatSubmit: 'yyyy-mm-dd',
  };

  // table properties
  datepickerContainerProperties: IPropertyRow[] = [
    { name: 'inline',
      mandatory: false,
      type: 'boolean',
      description: 'Show datepicker inline',
      defaultValue: 'false',
    },
  ];

  datepickerProperties: IPropertyRow[] = [
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
      type: 'Pickadate.DateOptions',
      description: `Datepicker options`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `Placeholder text`,
    },
  ];
}
