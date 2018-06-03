import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzCheckboxContainerComponent } from './checkbox-container.component';

describe('MzCheckboxContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCheckboxContainerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('checkbox-field', () => {

    let nativeElement: any;

    function checkboxField(): HTMLElement {
      return nativeElement.querySelector('.checkbox-field');
    }

    it('should transclude correctly', async(() => {

      buildComponent<MzCheckboxContainerComponent>(`
        <mz-checkbox-container>
          content-x
        </mz-checkbox-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(checkboxField().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
