import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

export abstract class Province {
  public code: string;
  public name: string;
}

export abstract class User {
  public address: string;
  public address2: string;
  public city: string;
  public firstName: string;
  public gender: string;
  public lastName: string;
  public phoneNumbers: Array<string>;
  public postalCode: string;
  public province: Province;
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {

  errorMessageResources = {
    address: {
      required: 'Address is required.',
    },
    address2: {
      required: 'Address2 is required.',
    },
    firstName: {
      required: 'First name is required.',
      minlength: 'First name must be at least 4 characters long.',
      maxlength: 'First name cannot be more than 24 characters long.',
    },
    hearAboutUs: {
      required: 'Hear about us is required.',
    },
    lastName: {
      required: 'Last name is required.',
    },
    postalCode: {
      pattern : 'Postal code is invalid.',
    },
    phoneNumber: {
      pattern: 'Phone number format is invaild. (XXX-XXX-XXXX)',
    },
    province: {
      required: 'Province is required.',
    },
    termService: {
      required: 'You must accept the terms of service before you can proceed.',
    },
  };

  provinces: Province[] = [
    { code: 'ab', name: 'Alberta' },
    { code: 'mb', name: 'Manitoba' },
    { code: 'ns', name: 'Nova Scotia' },
    { code: 'nb', name: 'New Brunswick' },
    { code: 'on', name: 'Ontario' },
    { code: 'pe', name: 'Prince Edward Island' },
    { code: 'qc', name: 'Quebec' },
    { code: 'nl', name: 'Newfoundland and Labrador' },
    { code: 'nt', name: 'Northwest Territories' },
    { code: 'nu', name: 'Nunavut' },
    { code: 'sk', name: 'Saskatchewan' },
    { code: 'yk', name: 'Yukon' },
  ];

  submitted = false;

  hearAboutUsOptions = [
    { value: 'event', text: 'Event' },
    { value: 'facebook', text: 'Facebook' },
    { value: 'family', text: 'Family' },
    { value: 'friend', text: 'Friend' },
    { value: 'search', text: 'Search engine' },
    { value: 'newspaper', text: 'Newspaper, Magazine' },
    { value: 'twitter', text: 'Twitter' },
    { value: 'other', text: 'Other' },
  ];

  hearAboutUs = null;

  user: User = {
    address: '',
    address2: '',
    city: '',
    firstName: '',
    gender: 'man',
    lastName: '',
    phoneNumbers: new Array<string>(),
    postalCode: '',
    province: null,
  };

  userForm: FormGroup;

  termService = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.addPhoneNumber();
  }

  addPhoneNumber(): void {
    const phoneNumbersControl = <FormArray>this.userForm.controls['phoneNumbers'];
    const newPhoneNumberGroup = this.formBuilder.group({
        phoneNumber: ['', [Validators.pattern('^([0-9]( |-)?)?(\\(?[0-9]{3}\\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})')]],
    });
    phoneNumbersControl.push(newPhoneNumberGroup);
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      address: [this.user.address, Validators.required],
      address2: [this.user.address2],
      city: [this.user.city],
      firstName: [this.user.firstName, Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
        ]),
      ],
      gender: [this.user.gender],
      hearAboutUs: [this.hearAboutUs, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      phoneNumbers: this.formBuilder.array([]),
      postalCode: [this.user.postalCode, Validators.compose([
          Validators.pattern('(^\\d{5}(-\\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\\d{1}[A-Z]{1} *\\d{1}[A-Z]{1}\\d{1}$)'),
        ]),
      ],
      province: [this.user.province, Validators.required],
      termService: [this.termService, Validators.required],
    });
  }

  clear() {
    this.userForm.reset();

    const phoneNumbersControl = <FormArray>this.userForm.controls['phoneNumbers'];
    for (let i = phoneNumbersControl.length - 1; i > 0; i--) {
      this.deletePhoneNumber(i);
    }

    this.userForm.controls['gender'].setValue(this.user.gender);
  }

  deletePhoneNumber(index: number): void {
    const phoneNumbersControl = <FormArray>this.userForm.controls['phoneNumbers'];
    phoneNumbersControl.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    this.user = Object.assign({}, this.userForm.value);
  }
}
