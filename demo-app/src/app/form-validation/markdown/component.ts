import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public postalCode: string;
  public province: Province;
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent {

  formErrors = {
    'address': '',
    'address2': '',
    'firstName': '',
    'hearAboutUs': '',
    'lastName': '',
    'postalCode': '',
    'province': '',
    'termService': '',
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

  hearAboutUs = [this.hearAboutUsOptions[7]];

  user: User = {
    address: '',
    address2: '',
    city: '',
    firstName: '',
    gender: 'man',
    lastName: '',
    postalCode: '',
    province: null,
  };

  userForm: FormGroup;

  termService = false;

  validationMessages = {
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
    province: {
      required: 'Province is required.',
    },
    termService: {
      required: 'You must accept the terms of service before you can proceed.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
  ) { }

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
      postalCode: [this.user.postalCode, Validators.compose([
          Validators.pattern('[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]'),
        ]),
      ],
      province: [this.user.province, Validators.required],
      termService: [this.termService, Validators.required],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.submitted = true;
    this.user = Object.assign({}, this.userForm.value);
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    Object.keys(this.formErrors).forEach(field => {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];

        Object.keys(control.errors).forEach(key => {
          this.formErrors[field] += messages[key] + ' ';
        });
      }
    });
  }
}
