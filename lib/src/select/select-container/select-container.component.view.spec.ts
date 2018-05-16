import { CommonModule } from '@angular/common';
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
        CommonModule,
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

    it('should have inline css class when inline is true', async(() => {

      buildComponent<MzSelectContainerComponent>(`
        <mz-select-container [inline]="true"></mz-select-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).toContain('inline');
      });
    }));

    it('should not have inline css class when inline is false', async(() => {

      buildComponent<MzSelectContainerComponent>(`
        <mz-select-container [inline]="false"></mz-select-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(inputField().classList).not.toContain('inline');
      });
    }));

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

    function errorMessageElement(): HTMLElement {
      return nativeElement.querySelector('mz-error-message div');
    }

    function inputElement(): HTMLInputElement {
      return nativeElement.querySelector('input.select-dropdown');
    }

    function selectElement(): HTMLSelectElement {
      return nativeElement.querySelector('select');
    }

    it('should be disabled/enabled correctly when control disabled status changes', async(() => {

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
            formGroup.get('formControl').disable();
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
      };

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

        $(inputElement()).trigger('blur');
        tick(400);
        fixture.detectChanges();
        discardPeriodicTasks();

        expect(inputElement().classList).toContain('invalid');
        expect(errorMessageElement()).toBeTruthy();
        expect(errorMessageElement().innerHTML.trim()).toBeTruthy(errorMessageResource.required);
      });
    }));

    it('should have correctly value when control value changes using string value', fakeAsync(() => {

      buildComponent<{ value: string }>(`
        <mz-select-container>
          <select mz-select
            id="select"
            [label]="'label'"
            [placeholder]="'placeholder'"
            [(ngModel)]="value">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </mz-select-container>`,
        {
          value: 'Option 1',
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        const component = fixture.componentInstance;
        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('Option 1');

        component.value = 'Option 2';
        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('Option 2');

        component.value = null;
        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('placeholder');
      });
    }));

    it('should have correctly value when control value changes using object value', fakeAsync(() => {

      interface Option {
        text: string;
        value: number;
      }

      const options = [
        { text: 'Option 1', value: 1 },
        { text: 'Option 2', value: 2 },
        { text: 'Option 3', value: 3 },
      ];

      const value = options[0];

      buildComponent<{ options: Option[], value: Option }>(`
        <mz-select-container>
          <select mz-select
            id="select"
            [label]="'label'"
            [placeholder]="'placeholder'"
            [(ngModel)]="value">
            <option *ngFor="let option of options" [ngValue]="option">{{ option.text }}</option>
          </select>
        </mz-select-container>`,
        {
          options,
          value,
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        const component = fixture.componentInstance;
        fixture.autoDetectChanges();

        // couldn't force mutationobserver to execute before the end of the test
        // therefore options used with *ngFor need to be present for the test to work
        $('select').material_select();

        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('Option 1');

        component.value = options[1];
        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('Option 2');

        component.value = null;
        fixture.detectChanges();
        tick();

        expect(inputElement().value).toBe('placeholder');
      });
    }));

    describe('multiple select', () => {

      it('should have correctly value when control value changes using string value', fakeAsync(() => {

        buildComponent<{ value: string[] }>(`
          <mz-select-container>
            <select mz-select multiple
              id="select"
              [label]="'label'"
              [placeholder]="'placeholder'"
              [(ngModel)]="value">
              <option *ngFor="let option of options" [value]="option">{{ option }}</option>
            </select>
          </mz-select-container>`,
          {
            options: ['Option 1', 'Option 2', 'Option 3'],
            value: ['Option 2', 'Option 3'],
          },
        ).then((fixture) => {
          nativeElement = fixture.nativeElement;
          const component = fixture.componentInstance;
          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('Option 2, Option 3');

          component.value = ['Option 1'];
          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('Option 1');

          component.value = null;
          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('placeholder');
        });
      }));

      it('should have correctly value when control value changes using object value', fakeAsync(() => {

        interface Option {
          text: string;
          value: number;
        }

        const options: Option[] = [
          { text: 'Option 1', value: 1 },
          { text: 'Option 2', value: 2 },
          { text: 'Option 3', value: 3 },
        ];

        const value = options.slice(0, 1);

        buildComponent<{ options: Option[], value: Option[] }>(`
          <mz-select-container>
            <select mz-select multiple
              id="select"
              [label]="'label'"
              [placeholder]="'placeholder'"
              [(ngModel)]="value">
              <option *ngFor="let option of options" [ngValue]="option">{{ option.text }}</option>
            </select>
          </mz-select-container>`,
          {
            options,
            value,
          },
        ).then((fixture) => {
          nativeElement = fixture.nativeElement;
          const component = fixture.componentInstance;
          fixture.detectChanges();

          // couldn't force mutationobserver to execute before the end of the test
          // therefore options used with *ngFor need to be present for the test to work
          $('select').material_select();

          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('Option 1');

          component.value = options.slice(1, 3);
          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('Option 2, Option 3');

          component.value = null;
          fixture.detectChanges();
          tick();

          expect(inputElement().value).toBe('placeholder');
        });
      }));
    });
  });
});
