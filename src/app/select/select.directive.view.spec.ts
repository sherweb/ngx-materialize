import { async, TestBed } from '@angular/core/testing';

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

    it('should sync materialize select with native select when properties is updated', async(() => {

      const selectAsyncOptions = ['Option 1'];

      buildComponent<any>(`
        <mz-select-container>
          <select mz-select
            id="async-options-select"
            [label]="'Label'"
            [placeholder]="'Placeholder'"
          >
            <option *ngFor="let option of selectAsyncOptions" [selected]="option === optionValue">{{ option }}</option>
          </select>
        </mz-select-container>
      `, {
        selectAsyncOptions,
      }).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const optionLength = () => fixture.nativeElement.querySelectorAll('option').length;

        expect(optionLength()).toBe(1 + 1);

        fixture.componentInstance.selectAsyncOptions = ['Option 1', 'Option 2'];

        fixture.detectChanges();

        expect(optionLength()).toBe(1 + 2);
      });
    }));
  });
});
