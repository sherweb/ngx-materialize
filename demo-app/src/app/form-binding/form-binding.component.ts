import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routes.animation';

@Component({
  selector: 'app-form-binding',
  templateUrl: './form-binding.component.html',
  styleUrls: ['./form-binding.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class FormBindingComponent {

  inputLabel: string = 'Label';
  inputPlaceholder: string = 'Placeholder';
  inputValidate: boolean = false;
  inputDataSuccess: string = 'Email is valid';
  inputDataError: string = 'Email is invalid';
  inputDisabled: boolean = false;
  inputLength: number;
  inputValue: string = 'Value test';

  selectLabel: string = 'Label';
  selectPlaceholder: string = 'Placeholder';
  selectDisabled: boolean = false;
  selectValue: string;

  checkboxLabel: string = 'Label';
  checkboxFilledIn: boolean = false;
  checkboxDisabled: boolean = false;
  checkboxValue: boolean = true;

  radioOption1Label: string = 'Option 1';
  radioOption2Label: string = 'Option 2';
  radioWithGap: boolean = false;
  radioDisabled: boolean = false;
  radioValue: string = 'Option 1';

  textareaLabel: string = 'Label';
  textareaPlaceholder: string = 'Placeholder';
  textareaDisabled: boolean = false;
  textareaLength: number;
  textareaValue: string = 'Lorem ipsum dolor sit amet, sed aliquet quam, dapibus fusce wisi leo,'
    + ' ultricies mauris dui dui sollicitudin sed. Sodales nulla viverra quis cursus ad nullam, mauris'
    + ' ipsum, ultrices quis odio odio ut velit sed, rhoncus ac nam.';
}
