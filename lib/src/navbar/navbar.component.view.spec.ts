import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzNavbarComponent } from './navbar.component';

describe('MzNavbarComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzNavbarComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('navbar', () => {

    let nativeElement: any;

    function navbar() {
      return nativeElement.querySelector('nav');
    }

    function navWrapper() {
      return navbar().querySelector('.nav-wrapper');
    }

    it('should display a navbar', async(() => {

      buildComponent<MzNavbarComponent>(`<mz-navbar></mz-navbar>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(navbar()).toBeTruthy();
        expect(navWrapper()).toBeTruthy();
        expect(navWrapper().classList).toContain('nav-wrapper');
      });
    }));

    it('should have navbarClass when provided', async(() => {

      buildComponent<MzNavbarComponent>(`<mz-navbar [navbarClass]="'some-class'"></mz-navbar>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(navWrapper().classList).toContain('some-class');
      });
    }));

    it('should transclude anything', async(() => {

      buildComponent<MzNavbarComponent>(`
        <mz-navbar>
          <div class="some-class"></div>
        </mz-navbar>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(navWrapper().querySelector('.some-class')).toBeTruthy();
      });
    }));
  });
});
