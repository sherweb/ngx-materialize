import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzTimepickerContainerComponent, MzTimepickerDirective } from './';

describe('MzTimepickerDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        MzTimepickerContainerComponent,
        MzTimepickerDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('label', () => {
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input')
    }

    function label(): HTMLLabelElement {
      return nativeElement.querySelector('label');
    }

    function timepicker(): HTMLDivElement {
      return nativeElement.querySelector('div.picker');
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent<any>(`
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

        expect(input().nextSibling).toBe(timepicker());
        expect(timepicker().nextSibling).toBe(label());
        expect(label().innerHTML).toBe('label-x');
      });
    }));

    it('should be empty when omitted', async(() => {

      buildComponent<any>(`
        <mz-timepicker-container>
          <input mz-timepicker
            id="timepicker">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        // trigger timepicker opening otherwise it does not exist in DOM
        input().click();

        expect(input().nextSibling).toBe(timepicker());
        expect(timepicker().nextSibling).toBe(label());
        expect(label().innerHTML).toBe('');
      });
    }));
  });

  describe('placeholder', () => {
    let nativeElement: any;

    function input(): HTMLInputElement {
      return nativeElement.querySelector('input')
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent<any>(`
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

      buildComponent<any>(`
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

      buildComponent<any>(`
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

      buildComponent<any>(`
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

    it('should be disabled correctly when disabled attribute is not provided or false', async(() => {

      buildComponent<any>(`
        <mz-timepicker-container>
          <input mz-timepicker id="timepicker">
        </mz-timepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });

      buildComponent<any>(`
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

      buildComponent<any>(`
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

    it('should be initialized with options correctly', fakeAsync(() => {

      const options = {
        efault: 'now',
        fromnow: 0,
        twelvehour: true,
        donetext: 'OK',
        cleartext: 'Clear',
        canceltext: 'Cancel',
        autoclose: true,
        ampmclickable: true,
      };

      spyOn($.fn, 'pickatime');

      buildComponent<any>(`
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
        tick();

        expect($.fn.pickatime).toHaveBeenCalledWith(options);
      });
    }));

    it('should set input value correctly when initialized', fakeAsync(() => {

      buildComponent<any>(`
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

      buildComponent<any>(`
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

    it('should set ngControl value correctly when input value changes', fakeAsync(() => {

      buildComponent<any>(`
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

        $(input()).val('05:45PM')
        $(input()).change();
        tick();

        expect(input().value).toBe('05:45PM');
        expect(component.time).toBe('05:45PM');
      });
    }));
  });
});
