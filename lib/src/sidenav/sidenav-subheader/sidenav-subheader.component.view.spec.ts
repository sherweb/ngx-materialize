import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSidenavSubheaderComponent } from './sidenav-subheader.component';

describe('MzSidenavSubheaderComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavSubheaderComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-sidenav-subheader', () => {

    let nativeElement: any;

    function sidenavSubheader(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav-subheader');
    }

    it('should display correctly', async(() => {

      buildComponent<MzSidenavSubheaderComponent>(`
        <mz-sidenav-subheader></mz-sidenav-subheader>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const mzSidenavSubheader = sidenavSubheader();
        expect(mzSidenavSubheader).toBeTruthy();
        expect(mzSidenavSubheader.children.length).toBe(1);

        const li = sidenavSubheader().children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(0);
        expect(li.children.length).toBe(1);

        const a = li.children[0];
        expect(a.nodeName).toBe('A');
        expect(a.classList.length).toBe(1);
        expect(a.classList).toContain('subheader');
        expect(a.children.length).toBe(0);
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzSidenavSubheaderComponent>(`
        <mz-sidenav-subheader>
          subheader-x
        </mz-sidenav-subheader>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenavSubheader().innerText.trim()).toBe('subheader-x');
      });
    }));
  });
});
