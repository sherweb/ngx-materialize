import { Component, OnDestroy, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation-form-state',
  templateUrl: './validation-form-state.component.html',
  styleUrls: ['./validation-form-state.component.scss'],
})
export class ValidationFormStateComponent implements OnInit, OnDestroy {

  checkboxSubscription: Subscription;
  form: FormGroup;
  submitted = false;

  values = {
    checkbox: false,
    input: '',
    select: null,
    datepicker: '',
    timepicker: '',
  };

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
    timepicker: {
      required: 'This field is required.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    this.renderer.invokeElementMethod($('ul.tabs'), 'tabs');
    this.buildForm();
    this.initCheckboxSubscription();
  }

  ngOnDestroy() {
    this.removeCheckboxSubscription();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      checkbox: [this.values.checkbox],
      input: [
        { value: this.values.input, disabled: this.values.checkbox },
        Validators.required,
      ],
      select: [
        { value: this.values.select, disabled: this.values.checkbox },
        Validators.required,
      ],
      datepicker: [
        { value: this.values.datepicker, disabled: this.values.checkbox },
        Validators.required,
      ],
      timepicker: [
        { value: this.values.timepicker, disabled: this.values.checkbox },
        Validators.required,
      ],
    });
  }

  clear() {
    this.form.reset({
      checkbox: this.values.checkbox,
      input: this.values.input,
      select: this.values.select,
      datepicker: this.values.datepicker,
      timepicker: this.values.timepicker,
    });
  }

  initCheckboxSubscription() {
    this.checkboxSubscription = this.form.get('checkbox').valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.form.get('input').disable();
        this.form.get('select').disable();
        this.form.get('datepicker').disable();
        this.form.get('timepicker').disable();
      } else {
        this.form.get('input').enable();
        this.form.get('select').enable();
        this.form.get('datepicker').enable();
        this.form.get('timepicker').enable();
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.submitted = true;
    this.values = Object.assign({}, this.form.value);
  }

  removeCheckboxSubscription() {
    this.checkboxSubscription.unsubscribe();
  }
}
