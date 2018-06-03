import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzValidationModule } from '../validation/validation.module';
import { MzTimepickerContainerComponent, MzTimepickerDirective } from './';

@Component({
  selector: `mz-test-timepicker`,
  template: `
    <form [formGroup]="form">
      <mz-timepicker-container>
        <input mz-timepicker mz-validation
          id="timepicker-id"
          type="text"
          [errorMessageResource]="errorMessages.timepicker"
          [formControlName]="'timepicker'">
      </mz-timepicker-container>
      <button id="submit" mz-button [disabled]="!form.valid">submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MzTestTimepickerComponent {
  errorMessages = {
    timepicker: {
      required: 'This field is required',
    },
  };
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      timepicker: [null, Validators.required],
    });
  }
}

describe('MzTimepickerDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MzValidationModule,
        NoopAnimationsModule,
      ],
      declarations: [
        MzTimepickerContainerComponent,
        MzTimepickerDirective,
        MzTestTimepickerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('label', () => {
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input');
    }

    function label(): HTMLLabelElement {
      return nativeElement.querySelector('label');
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [label]="'label-x'">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // trigger timepicker opening otherwise it does not exist in DOM
        input().click();

        expect(input().nextSibling).toBe(label());
        expect(label().innerHTML).toBe('label-x');
      });
    }));

    it('should be empty when omitted', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // trigger timepicker opening otherwise it does not exist in DOM
        input().click();

        expect(input().nextSibling).toBe(label());
        expect(label().innerHTML).toBe('');
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
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [placeholder]="'placeholder-x'">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().getAttribute('placeholder')).toBe('placeholder-x');
      });
    }));

    it('should not be shown correctly when omitted', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker">
        </mz-timepicker-container>
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
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            disabled>
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeTruthy();
      });

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [disabled]="true">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeTruthy();
      });
    }));

    it('should not be disabled when disabled attribute is not provided or false', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker id="timepicker">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [disabled]="false">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });
    }));

    it('should log an error in the console when input not wrapped inside mz-timepicker-container', async(() => {

      spyOn(console, 'error');

      buildComponent(`
        <input mz-timepicker id="timepicker">
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-timepicker directive must be placed inside an [mz-timepicker-container] tag',
          $(input()));
      });
    }));
  });

  describe('timepicker', () => {
    let component: any;
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input');
    }

    function clockpicker(): HTMLElement {
      return <HTMLElement>document.querySelector('.clockpicker');
    }

    it('should be initialized with options correctly', async(() => {

      const options = {
        default: 'now',
        fromnow: 0,
        twelvehour: true,
        donetext: 'OK',
        cleartext: 'Clear',
        canceltext: 'Cancel',
        autoclose: true,
        ampmclickable: true,
        container: '.container',
      };

      spyOn($.fn, 'pickatime');

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [options]="options">
        </mz-timepicker-container>
      `, {
        options: options,
      }).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect($.fn.pickatime).toHaveBeenCalledWith(Object.assign({}, options, { afterHide: jasmine.any(Function) }));
      });
    }));

    it('should set label active through afterHide callback', async(() => {

      const options = {
        afterHide: () => console.log('after-hide-callback'),
      };

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [(options)]="options">
        </mz-timepicker-container>
      `, {
        options: options,
      }).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const directive = fixture
          .debugElement
          .query(By.directive(MzTimepickerDirective))
          .injector
          .get(MzTimepickerDirective);

        spyOn(console, 'log');
        spyOn(directive, 'setLabelActive');

        directive.options.afterHide();

        expect(console.log).toHaveBeenCalledWith('after-hide-callback');
        expect(directive.setLabelActive).toHaveBeenCalled();
      });
    }));

    it('should append and remove clockpicker to body when options.container is not provided', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker">
        </mz-timepicker-container>
      `).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // trigger timepicker opening otherwise it does not exist in DOM
        input().click();

        expect(clockpicker().parentNode).toBe(document.body);

        // force component to be destroyed
        fixture.destroy();

        expect(clockpicker()).toBeFalsy();
      });
    }));

    it('should append clockpicker to options.container when provided', async(() => {

      buildComponent(`
        <div class="container"></div>
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [options]="options">
        </mz-timepicker-container>
      `, {
        options: { container: '.container' },
      }).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // trigger timepicker opening otherwise it does not exist in DOM
        input().click();

        const containerElement = nativeElement.querySelector('.container > .clockpicker');

        expect(clockpicker()).toBe(containerElement);
      });
    }));

    it('should set input value correctly when initialized', fakeAsync(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [(ngModel)]="time">
        </mz-timepicker-container>
      `, {
        time: '04:30AM',
      }).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        tick();

        expect(input().value).toBe('04:30AM');
      });
    }));

    it('should set input value correctly when ngControl value changes', fakeAsync(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [(ngModel)]="time">
        </mz-timepicker-container>
      `).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        tick();

        expect(input().value).toBe('');

        component.time = '05:45PM';
        fixture.detectChanges();
        tick();

        expect(input().value).toBe('05:45PM');
      });
    }));

    it('should set ngControl value correctly when input value changes', async(() => {

      buildComponent(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker"
            [(ngModel)]="time">
        </mz-timepicker-container>
      `).then((fixture) => {
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().value).toBe('');

        $(input()).val('05:45PM');
        $(input()).change();

        expect(input().value).toBe('05:45PM');
        expect(component.time).toBe('05:45PM');
      });
    }));
  });

  describe('validation', () => {
    let component: MzTestTimepickerComponent;
    let fixture: ComponentFixture<MzTestTimepickerComponent>;
    let nativeElement: HTMLElement;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input.timepicker') as HTMLInputElement;
    }

    function timepicker(): Pickadate.DatePicker {
      return $(input()).pickadate('picker');
    }

    function errorMessage(): HTMLElement {
      return nativeElement.querySelector('mz-error-message') as HTMLElement;
    }

    function submitButton(): HTMLButtonElement {
      return nativeElement.querySelector('button#submit') as HTMLButtonElement;
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(MzTestTimepickerComponent);
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
      $(input()).val(null);
      $(input()).change();
      component.form.get('timepicker').markAsDirty();
      fixture.detectChanges();

      expect(errorMessage().innerText.trim()).toBe(component.errorMessages.timepicker.required);
      expect(component.form.valid).toBeFalsy();
      expect(submitButton().hasAttribute('disabled')).toBeTruthy();

      // valid
      $(input()).val('05:45PM');
      $(input()).change();
      fixture.detectChanges();
      tick();

      expect(errorMessage().innerText.trim()).toBe('');
      expect(component.form.valid).toBeTruthy();
      expect(submitButton().hasAttribute('disabled')).toBeFalsy();
    }));
  });
});
