import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzDropdownComponent, MzDropdownDividerComponent, MzDropdownItemComponent } from './';

describe('MzDropdownComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzDropdownComponent,
        MzDropdownDividerComponent,
        MzDropdownItemComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));


  describe('dropdown', () => {
    let nativeElement: any;

    function dropdown() {
      return nativeElement.querySelector('ul#dropdownId');
    }

    function dropdownDivider() {
      return dropdown().querySelector('mz-dropdown-divider');
    }

    function dropdownItem() {
      return dropdown().querySelector('mz-dropdown-item');
    }

    it('should display a dropdown', async(() => {
      buildComponent<MzDropdownComponent>(`
        <a id="dropdownButtonId" href="#">Dropdown</a>
        <mz-dropdown
          [id]="'dropdownId'"
          [dropdownButtonId]="'dropdownButtonId'"
        >
        </mz-dropdown>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(dropdown()).toBeTruthy();
      });
    }));

    it('should have data-activates', async(() => {
      buildComponent<MzDropdownComponent>(`
        <a id="dropdownButtonId" href="#">Dropdown</a>
        <mz-dropdown
          [id]="'dropdownId'"
          [dropdownButtonId]="'dropdownButtonId'"
        >
        </mz-dropdown>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(nativeElement.querySelector('#dropdownButtonId').getAttribute('data-activates')).toContain('dropdownId');
      });
    }));

    it('should have id when provided', async(() => {
      buildComponent<MzDropdownComponent>(`
        <a id="dropdownButtonId" href="#">Dropdown</a>
        <mz-dropdown
          [id]="'dropdownId'"
          [dropdownButtonId]="'dropdownButtonId'"
        >
        </mz-dropdown>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(dropdown().getAttribute('id')).toContain('dropdownId');
      });
    }));

    it('should transclude divider', async(() => {
      buildComponent<MzDropdownComponent>(`
        <a id="dropdownButtonId" href="#">Dropdown</a>
        <mz-dropdown
          [id]="'dropdownId'"
          [dropdownButtonId]="'dropdownButtonId'"
        >
          <mz-dropdown-divider></mz-dropdown-divider>
        </mz-dropdown>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContentDivider = dropdownDivider().querySelector('li');

        expect(transcludeContentDivider).toBeTruthy();
        expect(transcludeContentDivider.classList).toContain('divider');
        expect(dropdownDivider().parentElement.nodeName).toBe(dropdown().nodeName);
      });
    }));

    it('should transclude dropdown item', async(() => {
      buildComponent<MzDropdownComponent>(`
        <a id="dropdownButtonId" href="#">Dropdown</a>
        <mz-dropdown
          [id]="'dropdownId'"
          [dropdownButtonId]="'dropdownButtonId'"
        >
          <mz-dropdown-item><span class="some-class">some-text</span></mz-dropdown-item>
        </mz-dropdown>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContentDropdownItem = dropdownItem().querySelector('li span');

        expect(transcludeContentDropdownItem).toBeTruthy();
        expect(transcludeContentDropdownItem.classList).toContain('some-class');
        expect(transcludeContentDropdownItem.innerHTML.trim()).toBe('some-text');
        expect(dropdownItem().parentElement.nodeName).toBe(dropdown().nodeName);
      });
    }));
  });
});
