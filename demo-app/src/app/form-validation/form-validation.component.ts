import {
  Component,
  OnInit,
  Renderer,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorMessageResource } from 'ng2-materialize';

import { IPropertyRow } from './../shared/properties-table/properties-table.component';
import { Province, User } from './models/';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class FormValidationComponent implements OnInit {

 // properties table for demo page
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

  // form validation variables
  errorMessageResources = {
    activitySector: {
      required: 'Activity sector is required.',
    },
    address: {
      required: 'Address is required.',
    },
    address2: {
      required: 'Address2 is required.',
    },
    domainName: {
      required: 'Domain name is required.',
    },
    firstName: {
      minlength: 'First name must be at least 4 characters long.',
      maxlength: 'First name cannot be more than 24 characters long.',
      required: 'First name is required.',
    },
    hearAboutUs: {
      required: 'Hear about us is required.',
    },
    jobDescription: {
      maxlength: 'Job description cannot be more than 255 characters long.',
      required: 'Job description is required.',
    },
    jobTitle: {
      required: 'Job title is required.',
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

  user: User = {
    activitySector: '',
    address: '',
    address2: '',
    city: '',
    firstName: '',
    gender: 'man',
    jobTitle: '',
    jobDescription: '',
    jobPrivate: true,
    jobType: 'permanent',
    lastName: '',
    phoneNumbers: [],
    postalCode: '',
    province: null,
  };

  hasJob = true;
  hearAboutUs = null;
  submitted = false;
  userForm: FormGroup;
  termService = false;

  // fake datas
  activitySectorOptions = [
    { value: 'culture-music-art-literature', text: 'Culture,music, arts, literature' },
    { value: 'health-pha-medical', text: 'Health care, pharmaceutical, and medical sector' },
    { value: 'manufacturing', text: 'Manufacturing industries' },
    { value: 'telecom-info-techno', text: 'Telecommunications and information technology' },
    { value: 'transport', text: 'Transport, shipping, aviation, trucking and infrastructures' },
    { value: 'financial-services', text: 'Financial services' },
    { value: 'research', text: 'Research, science, inventions, biotechnology, etc.' },
    { value: 'media-film', text: 'Media and film industry' },
  ]

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

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    this.renderer.invokeElementMethod($('ul.tabs'), 'tabs', []);
    this.buildForm();
    this.addPhoneNumber();
  }

  addPhoneNumber(): void {
    const phoneNumbersControl = <FormArray>this.userForm.get('phoneNumbers');
    const newPhoneNumberGroup = this.formBuilder.group({
      phoneNumber: ['', [Validators.pattern('^([0-9]( |-)?)?(\\(?[0-9]{3}\\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})')]],
    });
    phoneNumbersControl.push(newPhoneNumberGroup);
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      activitySector: [this.user.activitySector, Validators.required],
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
      hasJob: [this.hasJob],
      hearAboutUs: [this.hearAboutUs, Validators.required],
      jobDescription: [this.user.jobDescription, Validators.compose([
          Validators.required,
          Validators.maxLength(255),
        ]),
      ],
      jobPrivate: [this.user.jobPrivate],
      jobTitle: [this.user.jobTitle, Validators.required],
      jobType: [this.user.jobType, Validators.required],
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

    const phoneNumbersControl = <FormArray>this.userForm.get('phoneNumbers');
    for (let i = phoneNumbersControl.length - 1; i > 0; i--) {
      this.deletePhoneNumber(i);
    }

    this.userForm.get('jobPrivate').setValue(this.user.jobPrivate);
    this.userForm.get('jobType').setValue(this.user.jobType)
    this.userForm.get('gender').setValue(this.user.gender);
  }

  deletePhoneNumber(index: number) {
    const phoneNumbersControl = <FormArray>this.userForm.get('phoneNumbers');
    phoneNumbersControl.removeAt(index);
  }

  getPhoneNumbers(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phoneNumbers')).controls;
  }

  onSubmit() {
    this.submitted = true;
    this.user = Object.assign({}, this.userForm.value);
  }
}
