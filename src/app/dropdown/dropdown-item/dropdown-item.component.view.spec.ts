import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzDropdownItemComponent } from './dropdown-item.component';

describe('MzDropdownItemComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzDropdownItemComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('dropdown item', () => {

    let nativeElement: any;

    function dropdownItem(): HTMLElement {
      return nativeElement.querySelector('mz-dropdown-item');
    }

    it('should dsiplay dropdown item', async(() => {
      buildComponent<MzDropdownItemComponent>(`<mz-dropdown-item>some-text</mz-dropdown-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(dropdownItem()).toBeTruthy();
      });
    }));

    it('should transclude content', async(() => {
      buildComponent<MzDropdownItemComponent>(`
        <mz-dropdown-item>
          <p class="some-class">some-text</p>
        </mz-dropdown-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContent = dropdownItem().querySelector('p');

        expect(transcludeContent).toBeTruthy();
        expect(transcludeContent.classList).toContain('some-class');
        expect(transcludeContent.innerHTML.trim()).toBe('some-text');
      });
    }));
  });
});
