import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSidenavCollapsibleComponent, MzSidenavCollapsibleHeaderComponent } from './';

describe('MzSidenavCollapsibleComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavCollapsibleComponent,
        MzSidenavCollapsibleHeaderComponent,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  function forceSetTimeoutEnd() {
    tick(1 * 1000000); // todo: understand why 1 is not working (setTimeOut is set to 0)
  }

  describe('mz-sidenav-collapsible', () => {

    let nativeElement: any;

    function sidenavCollapsible(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav-collapsible');
    }

    it('should display correctly', fakeAsync(() => {

      buildComponent<MzSidenavCollapsibleComponent>(`
        <mz-sidenav-collapsible>
          <mz-sidenav-collapsible-header>some-text</mz-sidenav-collapsible-header>
          <mz-sidenav-collapsible-content></mz-sidenav-collapsible-content>
        </mz-sidenav-collapsible>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        forceSetTimeoutEnd();

        const mzSidenavCollapsible = sidenavCollapsible().children[0];
        expect(mzSidenavCollapsible.nodeName).toBe('LI');
        expect(mzSidenavCollapsible.classList.length).toBe(0);
        expect(mzSidenavCollapsible.children.length).toBe(1);

        // collapsible
        const collapsible = mzSidenavCollapsible.children[0];
        expect(collapsible.nodeName).toBe('UL');
        expect(collapsible.classList.length).toBe(2);
        expect(collapsible.classList).toContain('collapsible');
        expect(collapsible.classList).toContain('collapsible-accordion');
        expect(collapsible.children.length).toBe(1);

        const li = collapsible.children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(0);
        expect(li.children.length).toBe(3);

        // collapsible-header
        const collapsibleHeader = li.children[0];
        expect(collapsibleHeader.nodeName).toBe('A');
        expect(collapsibleHeader.classList.length).toBe(2);
        expect(collapsibleHeader.classList).toContain('collapsible-header');
        expect(collapsibleHeader.classList).toContain('waves-effect');
        expect(collapsibleHeader.innerHTML).toBe('some-text');

        // mz-sidenav-collapsible-header
        const mzSidenavCollapsibleHeader = li.children[1];
        expect(mzSidenavCollapsibleHeader.nodeName).toBe('MZ-SIDENAV-COLLAPSIBLE-HEADER');
        expect(mzSidenavCollapsibleHeader.children.length).toBe(0);

        // collapsible-body
        const collapsibleBody = li.children[2];
        expect(collapsibleBody.nodeName).toBe('DIV');
        expect(collapsibleBody.classList.length).toBe(1);
        expect(collapsibleBody.classList).toContain('collapsible-body');
        expect(collapsibleBody.children.length).toBe(1);

        const ul = collapsibleBody.children[0];
        expect(ul.nodeName).toBe('UL');
        expect(ul.classList.length).toBe(0);
        expect(ul.children.length).toBe(1);

        const mzSidenavCollapsibleContent = ul.children[0];
        expect(mzSidenavCollapsibleContent.nodeName).toBe('MZ-SIDENAV-COLLAPSIBLE-CONTENT');
        expect(mzSidenavCollapsibleContent.classList.length).toBe(0);
      });
    }));
  });

  describe('mz-sidenav-collapsible-header', () => {

    let nativeElement: any;

    function collapsibleHeader(): HTMLElement {
      return nativeElement.querySelector('.collapsible-header');
    }

    it('should transclude correctly', fakeAsync(() => {

      buildComponent<MzSidenavCollapsibleComponent>(`
        <mz-sidenav-collapsible>
          <mz-sidenav-collapsible-header>
            header-x
          </mz-sidenav-collapsible-header>
        </mz-sidenav-collapsible>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        forceSetTimeoutEnd();

        expect(collapsibleHeader().innerText.trim()).toBe('header-x');
      });
    }));
  });

  describe('mz-sidenav-collapsible-content', () => {

    let nativeElement: any;

    function collapsibleBody(): HTMLElement {
      return nativeElement.querySelector('.collapsible-body');
    }

    it('should transclude correctly', async(() => {

      buildComponent<MzSidenavCollapsibleComponent>(`
        <mz-sidenav-collapsible>
          <mz-sidenav-collapsible-content>
            content-x
          </mz-sidenav-collapsible-content>
        </mz-sidenav-collapsible>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collapsibleBody().innerText.trim()).toBe('content-x');
      });
    }));
  });
});
