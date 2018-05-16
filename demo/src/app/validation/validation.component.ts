import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from './../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ValidationComponent {

  errorMessageRessourceProperties: IPropertyRow[] = [
    {
      name: 'maxlength',
      mandatory: false,
      type: 'string',
      description: 'Max length error message.',
      defaultValue: '',
    },
    {
      name: 'minlength',
      mandatory: false,
      type: 'string',
      description: 'Min length error message.',
      defaultValue: '',
    },
    {
      name: 'pattern',
      mandatory: false,
      type: 'string',
      description: 'Pattern error message.',
      defaultValue: '',
    },
    {
      name: 'required',
      mandatory: false,
      type: 'string',
      description: 'Required error message.',
      defaultValue: '',
    },
  ];

  properties: IPropertyRow[] = [
    {
      name: 'errorMessageResource',
      mandatory: false,
      type: 'ErrorMessageResource',
      description: 'Error message resource for a form control.',
      defaultValue: '',
    },
    {
      name: 'formControlDisabled',
      mandatory: false,
      type: 'boolean',
      description: 'Disable a form control',
      defaultValue: 'false',
    },
  ];
}
