import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import {
  async,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        ValidationTestModule,
      ],
    });
  }));

  describe('validation', () => {

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
                [placeholder]="'place'">
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

      const errorMessageResource: ErrorMessageResource = {
        minlength: 'Too short',
      }

      it('should add invalid class and show error message when it is invalid and dirty', fakeAsync(() => {

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'" />
            </mz-input-container>
          </form>
          `,
          {
            errorMessageResource,
          },
        ).then((fixture) => {

            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': ['', Validators.minLength(2)],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();
            tick();

            formGroup.controls['formControl'].markAsDirty();
            formGroup.controls['formControl'].setValue('a');

            tick();
            fixture.detectChanges();

            expect(inputElement().classList).toContain('invalid');

            expect(errorMessageDivElement().innerHTML.trim()).toBe('Too short');
          });
      }));

      it('should add valid class when it is valid and dirty', fakeAsync(() => {

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'" />
            </mz-input-container>
          </form>
          `,
          {
            errorMessageResource,
          },
        ).then((fixture) => {

            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': ['', Validators.minLength(2)],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            tick();

            formGroup.controls['formControl'].markAsTouched();
            formGroup.controls['formControl'].setValue('abc');

            tick();
            fixture.detectChanges();

            expect(inputElement().classList).toContain('valid');

            expect(errorMessageDivElement()).toBeFalsy();
          });
      }));

      it('should not add any class when it is untouched and pristine', fakeAsync(() => {

        buildComponent<any>(`
          <form [formGroup]="formGroup">
            <mz-input-container>
              <input mz-input mz-validation
                id="input-id"
                formControlName="formControl"
                [errorMessageResource]="errorMessageResource"
                [label]="'label'" />
            </mz-input-container>
          </form>
          `,
          {
            errorMessageResource,
          },
        ).then((fixture) => {

            formBuilder = TestBed.get(FormBuilder);

            formGroup = formBuilder.group({
              'formControl': ['', Validators.minLength(2)],
            });

            fixture.componentInstance.formGroup = formGroup;
            nativeElement = fixture.nativeElement;
            fixture.detectChanges();

            tick();

            tick();
            fixture.detectChanges();

            expect(inputElement().classList).not.toContain('valid');
            expect(inputElement().classList).not.toContain('invalid');

            expect(errorMessageDivElement()).toBeFalsy();
          });
      }));
    });

    describe('focusout', () => {

      const errorMessageResource: ErrorMessageResource = {
        required: 'Required',
      }

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
            </form>
            `,
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

              formGroup.controls['formControl'].markAsTouched();
              inputElement().dispatchEvent(new CustomEvent('focusout'));

              fixture.detectChanges();

              expect(inputElement().classList).toContain('invalid');

              expect(errorMessageDivElement()).toBeTruthy();
              expect(errorMessageDivElement().innerHTML).toBeTruthy('Required');
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
            </form>
            `,
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

              formGroup.controls['formControl'].markAsTouched();
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
                  [placeholder]="'place'">
                  <option>Option 1</option>
                </select>
              </mz-select-container>
            </form>
            `,
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

              $(inputSelectDropdownElement()).click();
              tick();
              fixture.detectChanges();
              $(inputSelectDropdownElement()).trigger('blur');
              tick(400);
              fixture.detectChanges();

              fixture.whenStable().then(() => {
                fixture.detectChanges();
                discardPeriodicTasks();
                expect(inputSelectDropdownElement().classList).toContain('invalid');

                expect(errorMessageDivElement()).toBeTruthy();
                expect(errorMessageDivElement().innerHTML.trim()).toBeTruthy('Required');
              });
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
                  [placeholder]="'place'">
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
});

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MzValidationComponent],
  declarations: [
    MzInputContainerComponent,
    MzInputDirective,
    MzSelectContainerComponent,
    MzSelectDirective,
    MzErrorMessageComponent,
    MzValidationComponent,
    MzTestWrapperComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MzErrorMessageComponent],
})
class ValidationTestModule { }
