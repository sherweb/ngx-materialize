import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  // playground
  selectLabel = 'Label';
  selectPlaceholder = 'Placeholder';
  selectDisabled = false;
  selectOptions = ['Option 1', 'Option 2', 'Option 3'];
  selectValue = this.selectOptions[1];

  selectMultipleOptions = ['Option 1', 'Option 2', 'Option 3'];
  selectMultipleValues = this.selectMultipleOptions.slice(0, 2);

  // table properties
  selectContainerProperties: IPropertyRow[] = [
    { name: 'inline',
      mandatory: false,
      type: 'boolean',
      description: 'Show select inline',
      defaultValue: 'false',
    },
  ];

  selectProperties: IPropertyRow[] = [
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Floating label`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `Placeholder text`,
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

  selectAsyncOptions = new Observable((observer) => {
    observer.next([
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ]);
    observer.complete();
  }).pipe(delay(500));
}
