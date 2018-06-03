import { ɵAnimationEngine } from '@angular/animations/browser';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
  async,
  discardPeriodicTasks,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

import { MzInputContainerComponent, MzInputDirective } from './../input';
import { MzSelectContainerComponent, MzSelectDirective } from './../select';
import { buildComponent, MzTestWrapperComponent } from './../shared/test-wrapper';
import { ErrorMessageResource, MzErrorMessageComponent } from './error-message';
import { MzValidationComponent } from './validation.component';

describe('MzValidationComponent:view', () => {
  let nativeElement: any;
  let formBuilder: FormBuilder;
  let formGroup: FormGroup;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BrowserTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        MzInputContainerComponent,
        MzInputDirective,
        MzSelectContainerComponent,
        MzSelectDirective,
        MzErrorMessageComponent,
        MzValidationComponent,
        MzTestWrapperComponent,
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MzErrorMessageComponent],
      },
    });
  }));

  function errorMessageDivElement(): HTMLElement {
    return nativeElement.querySelector('mz-error-message div');
  }

  function inputElement(): HTMLElement {
    return nativeElement.querySelector('input#input-id');
  }

  describe('initialization', () => {

    function errorMessageElement(): HTMLElement {
      return nativeElement.querySelector('mz-error-message');
    }

    function requiredElement(): HTMLElement {
      return nativeElement.querySelector('.placeholder-required');
    }

    it('should create required span element when required attribute is provided', async(() => {

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation required
              id="input"
              formControlName="formControl"
              [label]="'label'" />
          </mz-input-container>
        </form>
      `).then((fixture) => {

          formBuilder = TestBed.get(FormBuilder);

          formGroup = formBuilder.group({
            'formControl': ['test', Validators.required],
          });

          fixture.componentInstance.formGroup = formGroup;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(requiredElement()).toBeTruthy();
          expect(requiredElement().textContent).toBe(' *');
        });
    }));

    it('should not create required span element when required attribute is not provided', async(() => {

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation
              id="input"
              formControlName="formControl"
              [label]="'label'" />
          </mz-input-container>
        </form>
      `).then((fixture) => {

          formBuilder = TestBed.get(FormBuilder);

          formGroup = formBuilder.group({
            'formControl': ['test'],
          });

          fixture.componentInstance.formGroup = formGroup;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          expect(requiredElement()).toBeFalsy();
        });
    }));

    it('should create errorMessage component and move it after the select element label', fakeAsync(() => {

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-select-container>
            <select mz-select mz-validation
              id="select-id"
              formControlName="formControl"
              [label]="'label'"
              [placeholder]="'placeholder'">
              <option>Option 1</option>
            </select>
          </mz-select-container>
        </form>
      `).then((fixture) => {

          formBuilder = TestBed.get(FormBuilder);

          formGroup = formBuilder.group({
            'formControl': [null],
          });

          fixture.componentInstance.formGroup = formGroup;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          tick();

          expect((<HTMLElement>errorMessageElement().previousSibling).getAttribute('for')).toContain('select-id');
        });
    }));

    it('should create errorMessage component and move it after the input element label', fakeAsync(() => {

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation
              id="input-id"
              formControlName="formControl"
              [label]="'label'" />
          </mz-input-container>
        </form>
      `).then((fixture) => {

          formBuilder = TestBed.get(FormBuilder);

          formGroup = formBuilder.group({
            'formControl': ['test'],
          });

          fixture.componentInstance.formGroup = formGroup;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          tick();

          expect((<HTMLElement>errorMessageElement().previousSibling).getAttribute('for')).toBe('input-id');
        });
    }));
  });

  describe('form control status change', () => {

    const useCases = [
      // enabled
      { touched: true, dirty: false, valid: false, disabled: false },
      { touched: true, dirty: false, valid: true, disabled: false },
      { touched: false, dirty: true, valid: false, disabled: false },
      { touched: false, dirty: true, valid: true, disabled: false },
      { touched: true, dirty: true, valid: false, disabled: false },
      { touched: true, dirty: true, valid: true, disabled: false },
      { touched: false, dirty: false, valid: false, disabled: false },
      { touched: false, dirty: false, valid: true, disabled: false },
      // disabled
      { touched: true, dirty: false, valid: false, disabled: true },
      { touched: true, dirty: false, valid: true, disabled: true },
      { touched: false, dirty: true, valid: false, disabled: true },
      { touched: false, dirty: true, valid: true, disabled: true },
      { touched: true, dirty: true, valid: false, disabled: true },
      { touched: true, dirty: true, valid: true, disabled: true },
      { touched: false, dirty: false, valid: false, disabled: true },
      { touched: false, dirty: false, valid: true, disabled: true },
    ];

    useCases.forEach(useCase => {

      it(`should set validation state correctly [useCase: ${JSON.stringify(useCase)}]`, fakeAsync(() => {

        const errorMessageResource: ErrorMessageResource = {
          minlength: 'Too short',
        };

        const formControlValue = 'value-x';

        const minLenghtValidatorFn = useCase.valid
            ? Validators.minLength(formControlValue.length)
            : Validators.minLength(formControlValue.length + 1);

        formGroup = new FormGroup({
          'formControl': new FormControl({ value: '', disabled: useCase.disabled }, minLenghtValidatorFn),
        });

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [formControlDisabled]="formControlDisabled"
                [label]="'label'" />
            </mz-input-container>
          </form>`,
          {
            errorMessageResource,
            formGroup,
            formControlDisabled: useCase.disabled,
          },
        ).then((fixture) => {
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          if (useCase.touched) {
            formGroup.get('formControl').markAsTouched();
          }
          if (useCase.dirty) {
            formGroup.get('formControl').markAsDirty();
          }

          formGroup.get('formControl').setValue(formControlValue);

          tick();
          fixture.detectChanges();

          if (!useCase.touched && !useCase.dirty) {
            expect(inputElement().classList).not.toContain('valid', useCase);
            expect(inputElement().classList).not.toContain('invalid', useCase);
          } else if (useCase.disabled) {
            expect(inputElement().classList).not.toContain('valid', useCase);
            expect(inputElement().classList).not.toContain('invalid', useCase);
          } else if (useCase.valid) {
            expect(inputElement().classList).toContain('valid', useCase);
            expect(inputElement().classList).not.toContain('invalid', useCase);
            expect(errorMessageDivElement()).toBeFalsy(useCase);
          } else {
            expect(inputElement().classList).not.toContain('valid', useCase);
            expect(inputElement().classList).toContain('invalid', useCase);
            expect(errorMessageDivElement().innerHTML.trim()).toBe(errorMessageResource.minlength, useCase);
          }
        });
      }));
    });
  });

  describe('form control disabled state', () => {

    it('should handle disabling state correctly', fakeAsync(() => {

      const errorMessageResource: ErrorMessageResource = {
        minlength: 'Too short',
      };

      const formControlValue = 'value-x';

      formGroup = new FormGroup({
        'formControl': new FormControl(
          { value: formControlValue, disabled: false },
          Validators.minLength(formControlValue.length + 1),
        ),
      });

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation
              id="input-id"
              formControlName="formControl"
              [errorMessageResource]="errorMessageResource"
              [label]="'label'" />
          </mz-input-container>
        </form>`,
        {
          errorMessageResource,
          formGroup,
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // status that the field should have when field has been modified
        formGroup.get('formControl').markAsTouched();
        formGroup.get('formControl').markAsDirty();

        // disable field
        formGroup.get('formControl').disable();
        fixture.detectChanges();
        tick();

        expect(inputElement().classList).not.toContain('valid');
        expect(inputElement().classList).not.toContain('invalid');
        expect(errorMessageDivElement()).toBeFalsy();
      });
    }));

    it('should handle enabling state correctly', fakeAsync(() => {

      const errorMessageResource: ErrorMessageResource = {
        minlength: 'Too short',
      };

      const formControlValue = 'value-x';

      formGroup = new FormGroup({
        'formControl': new FormControl(
          { value: formControlValue, disabled: true },
          Validators.minLength(formControlValue.length + 1),
        ),
      });

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation
              id="input-id"
              formControlName="formControl"
              [errorMessageResource]="errorMessageResource"
              [label]="'label'" />
          </mz-input-container>
        </form>`,
        {
          errorMessageResource,
          formGroup,
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // status that the field should have when field has been modified
        formGroup.get('formControl').markAsTouched();
        formGroup.get('formControl').markAsDirty();

        // enable field
        formGroup.get('formControl').enable();
        fixture.detectChanges();
        tick();

        expect(inputElement().classList).not.toContain('valid');
        expect(inputElement().classList).toContain('invalid');
        expect(errorMessageDivElement().innerText).toBe(errorMessageResource.minlength);
      });
    }));

    it('should handle reset form state correctly', fakeAsync(() => {

      const errorMessageResource: ErrorMessageResource = {
        minlength: 'Too short',
      };

      const formControlValue = 'value-x';

      formGroup = new FormGroup({
        'formControl': new FormControl(
          { value: formControlValue, disabled: false },
          Validators.minLength(formControlValue.length + 1),
        ),
      });

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-input-container>
            <input mz-input mz-validation
              id="input-id"
              formControlName="formControl"
              [errorMessageResource]="errorMessageResource"
              [label]="'label'" />
          </mz-input-container>
        </form>`,
        {
          errorMessageResource,
          formGroup,
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const animationEngine: ɵAnimationEngine = TestBed.get(ɵAnimationEngine);

        // expect field to be invalid
        fixture.whenRenderingDone().then(() => {
          tick();
          expect(inputElement().classList).not.toContain('valid');
          expect(inputElement().classList).toContain('invalid');
          expect(errorMessageDivElement().innerText).toBe(errorMessageResource.minlength);
        });

        // simulate lost focus as if user changed the value
        inputElement().dispatchEvent(new CustomEvent('focusout'));
        fixture.detectChanges();

        // force animation to end
        animationEngine.players[0].finish();
        flushMicrotasks();

        // expect field is neither valid or invalid (once animations are done)
        fixture.whenRenderingDone().then(() => {
          tick();
          expect(inputElement().classList).not.toContain('valid');
          expect(inputElement().classList).not.toContain('invalid');
          expect(errorMessageDivElement()).toBeFalsy();
        });

        // reset form group
        fixture.componentInstance.formGroup.reset();
        fixture.detectChanges();

        // force animation to end
        animationEngine.players[0].finish();
        flushMicrotasks();
      });
    }));
  });

  describe('focusout', () => {

    const errorMessageResource: ErrorMessageResource = {
      required: 'Required',
    };

    describe('input', () => {

      it('should add invalid class and show error message when form control is invalid and touched', fakeAsync(() => {
        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation required
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'" />
            </mz-input-container>
          </form>`,
          {
            errorMessageResource,
          },
        ).then((fixture) => {
            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': ['', Validators.required],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
            tick();

            formGroup.get('formControl').markAsTouched();
            inputElement().dispatchEvent(new CustomEvent('focusout'));

            fixture.detectChanges();

            expect(inputElement().classList).toContain('invalid');

            expect(errorMessageDivElement()).toBeTruthy();
            expect(errorMessageDivElement().innerHTML).toBeTruthy(errorMessageResource.required);
          });
      }));

      it('should add valid class when it is valid and touched', fakeAsync(() => {
        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'" />
            </mz-input-container>
          </form>`,
          {
            errorMessageResource,
          },
        ).then((fixture) => {
            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': [''],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            tick();

            formGroup.get('formControl').markAsTouched();
            inputElement().dispatchEvent(new CustomEvent('focusout'));

            fixture.detectChanges();

            expect(inputElement().classList).toContain('valid');

            expect(errorMessageDivElement()).toBeFalsy();
          });
      }));
    });

    describe('select', () => {
      function inputSelectDropdownElement() {
        return nativeElement.querySelector('input.select-dropdown');
      }

      it('should add invalid class and show error message when form control is invalid and touched', fakeAsync(() => {

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-select-container>
              <select mz-select mz-validation required
                id="select"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'"
                [placeholder]="'placeholder'">
                <option>Option 1</option>
              </select>
            </mz-select-container>
          </form>`,
          {
            errorMessageResource,
          },
        ).then((fixture) => {
            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': [null, Validators.required],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            $(inputSelectDropdownElement()).trigger('blur');
            tick(400);
            fixture.detectChanges();
            discardPeriodicTasks();

            expect(inputSelectDropdownElement().classList).toContain('invalid');
            expect(errorMessageDivElement()).toBeTruthy();
            expect(errorMessageDivElement().innerHTML.trim()).toBeTruthy(errorMessageResource.required);
          });
      }));

      it('should add valid class when form control is valid and touched', fakeAsync(() => {

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-select-container>
              <select mz-select mz-validation
                id="select"
                formControlName="formControl"
                [label]="'label'"
                [placeholder]="'placeholder'">
                <option>Option 1</option>
              </select>
            </mz-select-container>
          </form>
        `).then((fixture) => {

          formBuilder = TestBed.get(FormBuilder);

          formGroup = formBuilder.group({
            'formControl': [null],
          });

          fixture.componentInstance.formGroup = formGroup;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          $(inputSelectDropdownElement()).click();
          tick();
          fixture.detectChanges();

          $(inputSelectDropdownElement()).trigger('blur');
          tick(400);
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(inputSelectDropdownElement().classList).toContain('valid');
          });
        });
      }));
    });
  });
});
