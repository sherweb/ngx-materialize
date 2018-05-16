import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSidenavLinkComponent } from './sidenav-link.component';

describe('MzSidenavLinkComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavLinkComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-sidenav-link', () => {

    let nativeElement: any;

    function sidenavLink(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav-link');
    }

    it('should display correctly', async(() => {

      buildComponent<MzSidenavLinkComponent>(`
        <mz-sidenav-link></mz-sidenav-link>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const mzSidenavLink = sidenavLink();
        expect(mzSidenavLink).toBeTruthy();
        expect(mzSidenavLink.children.length).toBe(1);

        const li = sidenavLink().children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(0);
        expect(li.children.length).toBe(0);
      });
    }));

    it('should have active class when active prop is provided', async(() => {

      buildComponent<MzSidenavLinkComponent>(`<mz-sidenav-link [active]="true"></mz-sidenav-link>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const li = sidenavLink().children[0];
        expect(li.classList).toContain('active');
      });
    }));

    it('should not have active class when active prop is not provided', async(() => {

      buildComponent<MzSidenavLinkComponent>(`<mz-sidenav-link></mz-sidenav-link>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const li = sidenavLink().children[0];
        expect(li.classList).not.toContain('active');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzSidenavLinkComponent>(`
        <mz-sidenav-link>
          link-x
        </mz-sidenav-link>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenavLink().innerText.trim()).toBe('link-x');
      });
    }));
  });
});
