import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-ngmodel',
  templateUrl: './validation-ngmodel.component.html',
  styleUrls: ['./validation-ngmodel.component.scss'],
})
export class ValidationNgmodelComponent {

  @ViewChild('f') form: FormGroup;

  submitted = false;

  values = {
    checkbox: false,
    input: '',
    select: null,
  };

  errorMessages = {
    input: {
      required: 'This field is required.',
    },
    select: {
      required: 'This field is required.',
    },
  };

  constructor() { }

  clear() {
    this.form.reset();

    this.values = {
      checkbox: false,
      input: '',
      select: null,
    };
  }

  onSubmit() {
    this.submitted = true;
  }
}
