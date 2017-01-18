import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSidenavHeaderComponent } from './sidenav-header.component';

describe('MzSidenavHeaderComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavHeaderComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-sidenav-divider', () => {

    let nativeElement: any;

    function sidenavHeader(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav-header');
    }

    it('should display correctly', async(() => {

      buildComponent<MzSidenavHeaderComponent>(`
        <mz-sidenav-header></mz-sidenav-header>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const mzSidenavHeader = sidenavHeader();
        expect(mzSidenavHeader).toBeTruthy();
        expect(mzSidenavHeader.children.length).toBe(1);

        const li = sidenavHeader().children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(1);
        expect(li.classList).toContain('sidenav-header');
        expect(li.children.length).toBe(0);
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzSidenavHeaderComponent>(`
        <mz-sidenav-header>
          header-x
        </mz-sidenav-header>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenavHeader().innerText.trim()).toBe('header-x');
      });
    }));
  });
});
