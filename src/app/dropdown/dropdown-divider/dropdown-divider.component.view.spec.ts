import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzDropdownDividerComponent } from './dropdown-divider.component';

describe('MzDropdownDividerComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzDropdownDividerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-dropdown-divider', () => {

    let nativeElement: any;

    function sidenavDivider(): HTMLElement {
      return nativeElement.querySelector('mz-dropdown-divider');
    }

    it('should display correctly', async(() => {

      buildComponent<MzDropdownDividerComponent>(`
        <mz-dropdown-divider></mz-dropdown-divider>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const li = sidenavDivider().children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(1);
        expect(li.classList).toContain('divider');
      });
    }));
  });
});
