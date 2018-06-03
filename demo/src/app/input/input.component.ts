import { AfterViewInit, Component, OnInit, Renderer } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { first, skipWhile } from 'rxjs/operators';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class InputComponent implements AfterViewInit, OnInit {

  // autocomplete
  autocomplete: { data: { [key: string]: string } };

  // playground
  inputLabel = 'Label';
  inputPlaceholder = 'Placeholder';
  inputValidate = false;
  inputDataSuccess = 'Email is valid';
  inputDataError = 'Email is invalid';
  inputDisabled = false;
  inputLength: number;
  inputValue = 'Value test';

  // table properties
  inputContainerProperties: IPropertyRow[] = [
    { name: 'inline',
      mandatory: false,
      type: 'boolean',
      description: 'Show input inline',
      defaultValue: 'false',
    },
  ];

  inputProperties: IPropertyRow[] = [
    { name: 'autocomplete',
      mandatory: false,
      type: '{ data: { [key: string]: string }, limit: number }',
      description: `Suggest possible values`,
    },
    { name: 'dataError',
      mandatory: false,
      type: 'string',
      description: `Invalid message`,
    },
    { name: 'dataSuccess',
      mandatory: false,
      type: 'string',
      description: `Valid message`,
    },
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
    { name: 'type',
      mandatory: true,
      type: 'string',
      description: `HTML5 input type`,
    },
    { name: 'validate',
      mandatory: false,
      type: 'boolean',
      description: `Activate HTML5 validation`,
      defaultValue: `false`,
    },
  ];

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.setAutocomplete();
  }

  ngAfterViewInit() {
    this.forceValidate();
  }

  forceValidate() {
    // need until window.validate_field is defined otherwise loading directly on the page doesn't trigger the validation
    interval(100)
      .pipe(
        skipWhile(() => !window['validate_field']),
        first())
      .subscribe(() => this.renderer.invokeElementMethod($('#valid-input, #invalid-input'), 'trigger', ['blur']));
  }

  setAutocomplete() {
    this.autocomplete = {
      data: {
        Apple: null,
        Microsoft: null,
        Google: 'assets/google_g_logo.png',
      },
    };
  }
}
