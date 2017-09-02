import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation-binding',
  templateUrl: './validation-binding.component.html',
  styleUrls: ['./validation-binding.component.scss'],
})
export class ValidationBindingComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  errorMessages = {
    input: {
      required: 'This field is required.',
    },
    select: {
      required: 'This field is required.',
    },
    datepicker: {
      required: 'This field is required.',
    },
  };

  values = {
    checkbox: false,
    input: '',
    select: null,
    datepicker: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    this.renderer.invokeElementMethod($('ul.tabs'), 'tabs');
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      checkbox: [this.values.checkbox],
      input: [this.values.input, Validators.required],
      select: [this.values.select, Validators.required],
      datepicker: [this.values.datepicker, Validators.required],
    });
  }

  clear() {
    this.form.reset({
      checkbox: this.values.checkbox,
      input: this.values.input,
      select: this.values.select,
      datepicker: this.values.datepicker,
    });
  }

  onSubmit() {
    this.submitted = true;
    this.values = Object.assign({}, this.form.value);
  }
}
