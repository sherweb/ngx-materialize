import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-ngmodel',
  templateUrl: './validation-ngmodel.component.html',
  styleUrls: ['./validation-ngmodel.component.scss'],
})
export class ValidationNgmodelComponent {
  @ViewChild('form') form: FormGroup;

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
