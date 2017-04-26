import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../../shared/test-wrapper';
import { MzSidenavCollapsibleHeaderComponent } from './sidenav-collapsible-header.component';

describe('MzSidenavCollapsibleHeaderComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavCollapsibleHeaderComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('sidenav collapsible header', () => {

    let nativeElement: any;

    function sidenavCollapsibleHeader(): HTMLElement {
      return nativeElement.querySelector('a.collapsible-header');
    }

    it('should display a sidenav collapsible header', async(() => {

      buildComponent<MzSidenavCollapsibleHeaderComponent>(`
        <mz-sidenav-collapsible-header>some-text</mz-sidenav-collapsible-header>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenavCollapsibleHeader()).toBeTruthy();
      });
    }));

    it('should transclude content', async(() => {

        buildComponent<MzSidenavCollapsibleHeaderComponent>(`
          <mz-sidenav-collapsible-header>some-text</mz-sidenav-collapsible-header>
        `).then((fixture) => {

          nativeElement = fixture.nativeElement;
          fixture.detectChanges();

          const transcludeContentHeader = sidenavCollapsibleHeader();

          expect(transcludeContentHeader).toBeTruthy();
          expect(transcludeContentHeader.innerHTML.trim()).toBe('some-text');
        });
    }));
  });
});
