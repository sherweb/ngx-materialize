import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzDatepickerContainerComponent, MzDatepickerDirective } from './';

describe('MzDatepickerDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        MzDatepickerContainerComponent,
        MzDatepickerDirective,
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
      return nativeElement.querySelector('input')
    }

    function label(): HTMLLabelElement {
      return nativeElement.querySelector('label');
    }

    it('should be shown correctly when provided', async(() => {

      buildComponent<any>(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker"
            [label]="'label-x'">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(label().innerHTML).toBe('label-x');
        expect(input().nextSibling).toBe(datepicker());
        expect(datepicker().nextSibling).toBe(label());
      });
    }));

    it('should be empty when omitted', async(() => {

      buildComponent<any>(`
        <mz-datepicker-container>
          <input mz-datepicker
            id="datepicker">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(label().innerHTML).toBe('');
        expect(input().nextSibling).toBe(datepicker());
        expect(datepicker().nextSibling).toBe(label());
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

      buildComponent<any>(`
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

      buildComponent<any>(`
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

      buildComponent<any>(`
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

    it('should be disabled correctly when disabled attribute is not provided or false', async(() => {

      buildComponent<any>(`
        <mz-datepicker-container>
          <input mz-datepicker id="datepicker">
        </mz-datepicker-container>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(input().disabled).toBeFalsy();
      });

      buildComponent<any>(`
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

      buildComponent<any>(`
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
      return nativeElement.querySelector('input');
    }

    function datepicker(): Pickadate.DatePicker {
      return $(input()).pickadate('picker');
    }

    describe('should initialize correctly', () => {

      it('when format and formatSubmit are not provided (default format: d mmmm, yyyy)', fakeAsync(() => {

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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

        buildComponent<any>(`
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
          datepicker().open()
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
    });
  });
});
