import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSelectContainerComponent } from './select-container.component';

describe('MzSelectContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSelectContainerComponent,
        MzTestWrapperComponent,
      ],
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
});
