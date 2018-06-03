import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzValidationModule } from '../validation/validation.module';
import { MzDatepickerContainerComponent, MzDatepickerDirective } from './';

@Component({
  selector: `mz-test-datepicker`,
  template: `
    <form [formGroup]="form">
      <mz-datepicker-container>
        <input mz-datepicker mz-validation
          id="datepicker-id"
          type="text"
          [errorMessageResource]="errorMessages.datepicker"
          [formControlName]="'datepicker'"
          [options]="{ format: 'yyyy-mm-dd' }">
      </mz-datepicker-container>
      <button id="submit" mz-button [disabled]="!form.valid">submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MzTestDatepickerComponent {
  errorMessages = {
    datepicker: {
      required: 'This field is required',
    },
  };
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      datepicker: [null, Validators.required],
    });
  }
}

describe('MzDatepickerDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MzValidationModule,
        NoopAnimationsModule,
      ],
      declarations: [
        MzDatepickerContainerComponent,
        MzDatepickerDirective,
        MzTestDatepickerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('label', () => {
    let nativeElement: any;

    function datepicker(): HTMLDivElement {
      return nativeElement.querySelector('div.picker');
    }

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input');
    }

    function label(): HTMLLabelElement {
      return nativeElement.querySelector('label');
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            [label]="'label-x'">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(label().innerHTML).toBe('label-x');
        expect(datepicker().nextSibling).toBe(input());
        expect(input().nextSibling).toBe(label());
      });
    }));

    it('should be empty when omitted', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(label().innerHTML).toBe('');
        expect(datepicker().nextSibling).toBe(input());
        expect(input().nextSibling).toBe(label());
      });
    }));
  });

  describe('placeholder', () => {
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input');
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            [placeholder]="'placeholder-x'">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().getAttribute('placeholder')).toBe('placeholder-x');
      });
    }));

    it('should not be shown correctly when omitted', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().getAttribute('placeholder')).toBeFalsy();
      });
    }));
  });

  describe('input', () => {
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input');
    }

    it('should be disabled correctly when disabled attribute is provided or true', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            disabled>
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeTruthy();
      });

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            [disabled]="true">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeTruthy();
      });
    }));

    it('should not be disabled when disabled attribute is not provided or false', async(() => {

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker id="datepicker">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });

      buildComponent(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            [disabled]="false">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });
    }));

    it('should log an error in the console when input not wrapped inside mz-datepicker-container', async(() => {

      spyOn(console, 'error');

      buildComponent(`
        <input mz-datepicker id="datepicker">
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-datepicker directive must be placed inside an [mz-datepicker-container] tag',
          $(input()));
      });
    }));
  });

  describe('datepicker', () => {
    let component: any;
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input.datepicker');
    }

    function datepicker(): Pickadate.DatePicker {
      return $(input()).pickadate('picker');
    }

    describe('should initialize correctly', () => {

      it('when format and formatSubmit are not provided (default format: d mmmm, yyyy)', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: '3 February, 2017',
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          const selectedDate = datepicker().get('select', 'yyyy-mm-dd');

          expect(selectedDate).toBe('2017-02-03');
          expect(component.date).toBe('3 February, 2017');
          expect(input().value).toBe('3 February, 2017');
        });
      }));

      it('when format is provided', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: '2017-02-03',
          options: { format: 'yyyy-mm-dd' },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          const selectedDate = datepicker().get('select', 'yyyy-mm-dd');

          expect(selectedDate).toBe('2017-02-03');
          expect(component.date).toBe('2017-02-03');
          expect(input().value).toBe('2017-02-03');
        });
      }));

      it('when formatSubmit is provided', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: '2017-02-03',
          options: { formatSubmit: 'yyyy-mm-dd' },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          const selectedDate = datepicker().get('select', 'yyyy-mm-dd');

          expect(selectedDate).toBe('2017-02-03');
          expect(component.date).toBe('2017-02-03');
          expect(input().value).toBe('2017-02-03');
        });
      }));
    });

    describe('should return selected date correctly formatted', () => {

      it('when format and formatSubmit are not provided (default format: d mmmm, yyyy)', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: null,
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          datepicker().set('select', '3 February, 2017');
          tick();

          expect(component.date).toBe('3 February, 2017');
          expect(input().value).toBe('3 February, 2017');
        });
      }));

      it('when format is provided', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: null,
          options: { format: 'yyyy-mm-dd' },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          datepicker().set('select', '2017-02-03');
          tick();

          expect(component.date).toBe('2017-02-03');
          expect(input().value).toBe('2017-02-03');
        });
      }));

      it('when formatSubmit is provided', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: null,
          options: { formatSubmit: 'yyyy-mm-dd' },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          datepicker().set('select', '2017-02-03');
          tick();

          expect(component.date).toBe('2017-02-03');
          expect(input().value).toBe('2017-02-03');
        });
      }));

      it('when format and formatSubmit are provided', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: null,
          options: {
            format: 'd mmmm, yyyy',
            formatSubmit: 'yyyy-mm-dd',
          },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          datepicker().set('select', '2017-02-03', { format: component.options.formatSubmit });
          tick();

          expect(component.date).toBe('2017-02-03');
          expect(input().value).toBe('3 February, 2017');
        });
      }));
    });

    describe('should set selected date correctly', () => {

      it('when ngControl is set with a value', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: null,
          options: {
            format: 'd mmmm, yyyy',
            formatSubmit: 'yyyy-mm-dd',
          },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          let selectedDate = datepicker().get('select', component.options.formatSubmit);

          expect(selectedDate).toBe('');
          expect(input().value).toBe('');

          component.date = '2017-02-03';
          fixture.detectChanges();
          tick();

          selectedDate = datepicker().get('select', component.options.formatSubmit);

          expect(selectedDate).toBe('2017-02-03');
          expect(input().value).toBe('3 February, 2017');
        });
      }));

      it('when ngControl is set with null value', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options"
              [(ngModel)]="date">
          </mz-datepicker-container>
        `, {
          date: '2017-02-03',
          options: {
            format: 'd mmmm, yyyy',
            formatSubmit: 'yyyy-mm-dd',
          },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          let selectedDate = datepicker().get('select', component.options.formatSubmit);

          expect(selectedDate).toBe('2017-02-03');
          expect(input().value).toBe('3 February, 2017');

          component.date = null;
          fixture.detectChanges();
          tick();

          selectedDate = datepicker().get('select', component.options.formatSubmit);

          expect(selectedDate).toBe('');
          expect(input().value).toBe('');
        });
      }));
    });

    describe('options', () => {

      function picker(): HTMLElement {
        return nativeElement.querySelector('.picker');
      }

      it('should extends onClose function correctly', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options">
          </mz-datepicker-container>
        `, {
          options: {
            onClose: () => console.log('close-event-x'),
          },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          // force datepicker to open setting focus automatically
          datepicker().open();
          tick();

          spyOn(console, 'log');
          spyOn(document.activeElement as HTMLElement, 'blur');

          // force datepicker to close
          datepicker().close();
          tick();

          expect(console.log).toHaveBeenCalledWith('close-event-x');
          expect((document.activeElement as HTMLElement).blur).toHaveBeenCalled();
        });
      }));

      it('should be reapplied to datepicker when changed', fakeAsync(() => {

        buildComponent(`
          <mz-datepicker-container>
            <input mz-datepicker
              id="datepicker"
              [options]="options">
          </mz-datepicker-container>
        `, {
          options: {
            disable: [new Date('2001,01,01')],
          },
        }).then((fixture) => {
          component = fixture.componentInstance;
          nativeElement = fixture.nativeElement;
          fixture.detectChanges();
          tick();

          let disabledDates = datepicker().get('disable');

          expect(disabledDates).toEqual(component.options.disable);

          component.options = {
            ...component.options,
            disable: [
              new Date('2001, 01, 01'),
              new Date('2001, 01, 02'),
            ],
          };

          fixture.detectChanges();

          disabledDates = datepicker().get('disable');

          expect(disabledDates).toEqual(component.options.disable);
        });
      }));
    });
  });

  describe('validation', () => {
    let component: MzTestDatepickerComponent;
    let fixture: ComponentFixture<MzTestDatepickerComponent>;
    let nativeElement: HTMLElement;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input.datepicker') as HTMLInputElement;
    }

    function datepicker(): Pickadate.DatePicker {
      return $(input()).pickadate('picker');
    }

    function errorMessage(): HTMLElement {
      return nativeElement.querySelector('mz-error-message') as HTMLElement;
    }

    function submitButton(): HTMLButtonElement {
      return nativeElement.querySelector('button#submit') as HTMLButtonElement;
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(MzTestDatepickerComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should be reflected correctly when used with ChangeStrategy.OnPush', fakeAsync(() => {

      // initial state
      expect(errorMessage().innerText.trim()).toBe('');
      expect(component.form.valid).toBeFalsy();
      expect(submitButton().hasAttribute('disabled')).toBeTruthy();

      // invalid
      datepicker().clear();
      component.form.get('datepicker').markAsDirty();
      fixture.detectChanges();

      expect(errorMessage().innerText.trim()).toBe(component.errorMessages.datepicker.required);
      expect(component.form.valid).toBeFalsy();
      expect(submitButton().hasAttribute('disabled')).toBeTruthy();

      // valid
      datepicker().set('select', '2017-02-03');
      fixture.detectChanges();
      tick();

      expect(errorMessage().innerText.trim()).toBe('');
      expect(component.form.valid).toBeTruthy();
      expect(submitButton().hasAttribute('disabled')).toBeFalsy();
    }));
  });
});
