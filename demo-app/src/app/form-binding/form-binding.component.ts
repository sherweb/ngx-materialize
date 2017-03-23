import { Component } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-form-binding',
  templateUrl: './form-binding.component.html',
  styleUrls: ['./form-binding.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class FormBindingComponent {

  inputLabel = 'Label';
  inputPlaceholder = 'Placeholder';
  inputValidate = false;
  inputDataSuccess = 'Email is valid';
  inputDataError = 'Email is invalid';
  inputDisabled = false;
  inputLength: number;
  inputValue = 'Value test';

  selectLabel = 'Label';
  selectPlaceholder = 'Placeholder';
  selectDisabled = false;
  selectValue = 'Option 1';
  selectOptions: Array<string> = ['Option 1', 'Option 2', 'Option 3'];

  checkboxLabel = 'Label';
  checkboxFilledIn = false;
  checkboxDisabled = false;
  checkboxValue = true;

  selectMultipleOptions: Array<string> = ['Option 1', 'Option 2', 'Option 3'];
  selectMultipleValues: Array<string> = ['Option 1', 'Option 2'];

  radioOption1Label = 'Option 1';
  radioOption2Label = 'Option 2';
  radioWithGap = false;
  radioDisabled = false;
  radioValue = 'Option 1';

  textareaLabel = 'Label';
  textareaPlaceholder = 'Placeholder';
  textareaDisabled = false;
  textareaLength: number;
  textareaValue = 'Lorem ipsum dolor sit amet, sed aliquet quam, dapibus fusce wisi leo,'
    + ' ultricies mauris dui dui sollicitudin sed. Sodales nulla viverra quis cursus ad nullam, mauris'
    + ' ipsum, ultrices quis odio odio ut velit sed, rhoncus ac nam.';
}
