import { async, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzErrorMessageComponent } from '../../validation/error-message/error-message.component';
import { ErrorMessageResource } from '../../validation/error-message/models/error-message';
import { MzValidationComponent } from '../../validation/validation.component';
import { MzSelectDirective } from '../select.directive';
import { MzSelectContainerComponent } from './select-container.component';

describe('MzSelectContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        MzErrorMessageComponent,
        MzSelectContainerComponent,
        MzSelectDirective,
        MzTestWrapperComponent,
        MzValidationComponent,
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MzErrorMessageComponent],
      },
    });
  }));

  describe('input-field', () => {
    let nativeElement: any;

    function inputField(): HTMLElement {
      return nativeElement.querySelector('.input-field');
    }

    it('should transclude correctly', async(() => {

      buildComponent<MzSelectContainerComponent>(`
        <mz-select-container>
          content-x
        </mz-select-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().innerText.trim()).toBe('content-x');
      });
    }));
  });

  describe('input.select-dropdown', () => {
    let nativeElement: any;
    let formBuilder: FormBuilder;
    let formGroup: FormGroup;

    function selectElement(): HTMLSelectElement {
      return nativeElement.querySelector('select');
    }

    function inputElement(): HTMLInputElement {
      return nativeElement.querySelector('input.select-dropdown');
    }

    function errorMessageElement(): HTMLElement {
      return nativeElement.querySelector('mz-error-message div');
    }

    it('should be disabled/enabled correctly when NgControl disabled status changes', async(() => {

      buildComponent<any>(`
        <form [formGroup]="formGroup">
          <mz-select-container>
            <select mz-select formControlName="formControl"></select>
          </mz-select-container>
        </form>`,
      ).then((fixture) => {
        formBuilder = TestBed.get(FormBuilder);

        formGroup = formBuilder.group({
          'formControl': null,
        });

        fixture.componentInstance.formGroup = formGroup;
        nativeElement = fixture.nativeElement;

        [true, false].forEach(disabled => {
          if (disabled) {
            formGroup.get('formControl').disable()
          } else {
            formGroup.get('formControl').enable();
          }

          fixture.detectChanges();

          expect(inputElement().disabled).toBe(disabled);
        });
      });
    }));

    it('should set control as touched and call setValidationState when control is reset', fakeAsync(() => {

      const errorMessageResource: ErrorMessageResource = {
        required: 'Required',
      }

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

        $(inputElement()).trigger('blur');
        tick(400);
        fixture.detectChanges();
        discardPeriodicTasks();

        expect(inputElement().classList).toContain('invalid');
        expect(errorMessageElement()).toBeTruthy();
        expect(errorMessageElement().innerHTML.trim()).toBeTruthy(errorMessageResource.required);
      });
    }));
  });
});
