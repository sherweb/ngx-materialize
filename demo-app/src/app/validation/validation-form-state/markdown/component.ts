import { Component, OnDestroy, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
  };

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
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
    });
  }

  clear() {
    this.form.reset();
    this.form.get('checkbox').setValue(this.values.checkbox);
    this.form.get('input').setValue(this.values.input);
    this.form.get('select').setValue(this.values.select);
    this.form.get('datepicker').setValue(this.values.datepicker);
  }

  initCheckboxSubscription() {
    this.checkboxSubscription = this.form.get('checkbox').valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        this.form.get('input').disable();
        this.form.get('select').disable();
        this.form.get('datepicker').disable();
      } else {
        this.form.get('input').enable();
        this.form.get('select').enable();
        this.form.get('datepicker').enable();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.values = Object.assign({}, this.form.value);
  }

  removeCheckboxSubscription() {
    this.checkboxSubscription.unsubscribe();
  }
}
