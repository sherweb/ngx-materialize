import { async, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzSelectContainerComponent, MzSelectDirective } from './';

describe('MzSelectDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSelectContainerComponent,
        MzSelectDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('option changes', () => {
    let nativeElement: any;

    describe('should sync materialize select with native select when properties is updated', () => {

      it('Add option 2', async(() => {

        const selectAsyncOptions = ['Option 1'];

        buildComponent<any>(`
          <mz-select-container>
            <select mz-select
              id="async-options-select"
              [label]="'Label'"
              [placeholder]="'Placeholder'"
            >
              <option *ngFor="let option of selectAsyncOptions">{{ option }}</option>
            </select>
          </mz-select-container>
        `, {
          selectAsyncOptions,
        }).then((fixture) => {

          nativeElement = fixture.nativeElement;

          fixture.detectChanges();

          const optionLength = () => fixture.nativeElement.querySelectorAll('option').length;
          const optionListLength = () => fixture.nativeElement.querySelectorAll('li').length;

          expect(optionLength()).toBe(1 + 1);
          expect(optionLength()).toBe(1 + 1);

          fixture.componentInstance.selectAsyncOptions = ['Option 1', 'Option 2'];
          fixture.detectChanges();

          // Wait for the MutationObserver to detect the native option elements change and for the native select to emit the change event.
          setTimeout(() => {
            // The MutationObserver from the select directive detected the native option elements change
            // and notified the native select component. The native select then calls material_select() to update
            // the materialize select option list.
            fixture.detectChanges();

            expect(optionLength()).toBe(1 + 2);
            expect(optionListLength()).toBe(1 + 2);
          });
        });
      }));

      it('Add option 3 and remove option 2', async(() => {

        const selectAsyncOptions = ['Option 1', 'Option 2'];

        buildComponent<any>(`
          <mz-select-container>
            <select mz-select
              id="async-options-select"
              [label]="'Label'"
              [placeholder]="'Placeholder'"
            >
              <option *ngFor="let option of selectAsyncOptions">{{ option }}</option>
            </select>
          </mz-select-container>
        `, {
          selectAsyncOptions,
        }).then((fixture) => {

          nativeElement = fixture.nativeElement;

          fixture.detectChanges();

          const optionLength = () => fixture.nativeElement.querySelectorAll('option').length;
          const optionListLength = () => fixture.nativeElement.querySelectorAll('li').length;

          expect(optionLength()).toBe(1 + 2);
          expect(optionLength()).toBe(1 + 2);

          fixture.componentInstance.selectAsyncOptions = ['Option 1', 'Option 3'];
          fixture.detectChanges();

          // Wait for the MutationObserver to detect the native option elements change and for the native select to emit the change event.
          setTimeout(() => {
            // The MutationObserver from the select directive detected the native option elements change
            // and notified the native select component. The native select then calls material_select() to update
            // the materialize select option list.
            fixture.detectChanges();

            expect(optionLength()).toBe(1 + 2);
            expect(optionListLength()).toBe(1 + 2);
          });
        });
      }));

      it('Remove option 3', async(() => {

        const selectAsyncOptions = ['Option 1', 'Option 3'];

        buildComponent<any>(`
          <mz-select-container>
            <select mz-select
              id="async-options-select"
              [label]="'Label'"
              [placeholder]="'Placeholder'"
            >
              <option *ngFor="let option of selectAsyncOptions">{{ option }}</option>
            </select>
          </mz-select-container>
        `, {
          selectAsyncOptions,
        }).then((fixture) => {

          nativeElement = fixture.nativeElement;

          fixture.detectChanges();

          const optionLength = () => fixture.nativeElement.querySelectorAll('option').length;
          const optionListLength = () => fixture.nativeElement.querySelectorAll('li').length;

          expect(optionLength()).toBe(1 + 2);
          expect(optionLength()).toBe(1 + 2);

          fixture.componentInstance.selectAsyncOptions = ['Option 1'];
          fixture.detectChanges();

          // Wait for the MutationObserver to detect the native option elements change and for the native select to emit the change event.
          setTimeout(() => {
            // The MutationObserver from the select directive detected the native option elements change
            // and notified the native select component. The native select then calls material_select() to update
            // the materialize select option list.
            fixture.detectChanges();

            expect(optionLength()).toBe(1 + 1);
            expect(optionListLength()).toBe(1 + 1);
          });
        });
      }));

      it('Add option 2 in optgroup', async(() => {

        const selectAsyncOptions = ['Option 1'];

        buildComponent<any>(`
          <mz-select-container>
            <select mz-select
              id="async-options-select"
              [label]="'Label'"
              [placeholder]="'Placeholder'"
            >
              <optgroup label="Group 1">
                <option *ngFor="let option of selectAsyncOptions">{{ option }}</option>
              </optgroup>
            </select>
          </mz-select-container>
        `, {
          selectAsyncOptions,
        }).then((fixture) => {

          nativeElement = fixture.nativeElement;

          fixture.detectChanges();

          const optionLength = () => fixture.nativeElement.querySelectorAll('option:not([disabled])').length;
          const optionGroupLength = () => fixture.nativeElement.querySelectorAll('li.optgroup').length;
          const optionListLength = () => fixture.nativeElement.querySelectorAll('li.optgroup-option').length;

          expect(optionLength()).toBe(1);
          expect(optionGroupLength()).toBe(1);
          expect(optionListLength()).toBe(0);

          fixture.componentInstance.selectAsyncOptions = ['Option 1', 'Option 2'];
          fixture.detectChanges();

          // Wait for the MutationObserver to detect the native option elements change and for the native select to emit the change event.
          setTimeout(() => {
            // The MutationObserver from the select directive detected the native option elements change
            // and notified the native select component. The native select then calls material_select() to update
            // the materialize select option list.
            fixture.detectChanges();

            expect(optionLength()).toBe(2);
            expect(optionGroupLength()).toBe(1);
            expect(optionListLength()).toBe(2);
          });
        });
      }));
    });
  });

  describe('handleDOMEvents', () => {

    it('should propagate DOM events from input to select element', () => {
      buildComponent<any>(`
        <mz-select-container>
          <select mz-select
            id="my-select"
            [label]="'Label'"
            [placeholder]="'Placeholder'"
          >
            <option>Option 1</option>
          </select>
        </mz-select-container>
      `).then((fixture) => {
        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.nativeElement;
        const inputElement = nativeElement.querySelector('input.select-dropdown');
        const selectElement = nativeElement.querySelector('#my-select');

        ['blur', 'focus'].forEach((event) => {
          const eventListener = jasmine.createSpy('onEvent');
          selectElement.addEventListener(event, eventListener);

          inputElement.dispatchEvent(new Event(event));
          expect(eventListener).toHaveBeenCalled();
        });
      });
    });
  });
});
