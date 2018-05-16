import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class TextareaComponent {

  // playground
  textareaLabel = 'Label';
  textareaPlaceholder = 'Placeholder';
  textareaDisabled = false;
  textareaLength: number;
  textareaValue = 'Lorem ipsum dolor sit amet, sed aliquet quam, dapibus fusce wisi leo,'
    + ' ultricies mauris dui dui sollicitudin sed. Sodales nulla viverra quis cursus ad nullam, mauris'
    + ' ipsum, ultrices quis odio odio ut velit sed, rhoncus ac nam.';

  // table properties
  textareaContainerProperties: IPropertyRow[] = [
    { name: 'inline',
      mandatory: false,
      type: 'boolean',
      description: `Show textarea inline`,
      defaultValue: `false`,
    },
  ];

  textareaProperties: IPropertyRow[] = [
    { name: 'id',
      mandatory: true,
      type: 'string',
      description: `Id of the textarea`,
    },
    { name: 'label',
      mandatory: false,
      type: 'string',
      description: `Floating label`,
    },
    { name: 'length',
      mandatory: false,
      type: 'number',
      description: `Show character count`,
    },
    { name: 'placeholder',
      mandatory: false,
      type: 'string',
      description: `Placeholder text`,
    },
  ];
}
