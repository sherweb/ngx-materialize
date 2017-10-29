import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzSidenavComponent } from './sidenav.component';

describe('MzSidenavComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-sidenav', () => {

    let nativeElement: any;

    function sidenav(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav');
    }

    it('should display correctly', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav></mz-sidenav>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const mzSidenav = sidenav();
        expect(mzSidenav).toBeTruthy();
        expect(mzSidenav.children.length).toBe(1);

        const ul = sidenav().children[0];
        expect(ul.nodeName).toBe('UL');
        expect(ul.classList.length).toBe(1);
        expect(ul.classList).toContain('side-nav');
        expect(ul.getAttribute('id')).toBeFalsy();
        expect(ul.children.length).toBe(0);
      });
    }));
  });

  describe('side-nav', () => {

    let nativeElement: any;

    function sidenav(): HTMLElement {
      return nativeElement.querySelector('.side-nav');
    }

    it('should apply backgroundClass css class when provided', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav [backgroundClass]="'class-x'"></mz-sidenav>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenav().classList).toContain('class-x');
      });
    }));

    it('should apply id attribute when provided', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav [id]="'id-x'"></mz-sidenav>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenav().getAttribute('id')).toContain('id-x');
      });
    }));

    it('should apply fixed css class when fixed is true', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav [fixed]="true"></mz-sidenav>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenav().classList).toContain('fixed');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav>
          sidenav-x
        </mz-sidenav>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(sidenav().innerText.trim()).toBe('sidenav-x');
      });
    }));
  });

  describe('opened', () => {

    function sidenavComponent(fixture: ComponentFixture<any>): MzSidenavComponent {
      return fixture
        .debugElement.query(By.css('mz-sidenav'))
        .injector.get(MzSidenavComponent);
    }

    it('should open sidenav when set to true', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav></mz-sidenav>
      `).then(fixture => {
        fixture.detectChanges();

        const sidenav = sidenavComponent(fixture);
        const sidenavSpy = spyOn($.fn, 'sideNav');

        expect(sidenav.opened).toBeFalsy();

        sidenav.opened = true;

        expect(sidenavSpy).toHaveBeenCalledWith('show');
      });
    }));

    it('should close sidenav when set to false', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav></mz-sidenav>
      `).then(fixture => {
        fixture.detectChanges();

        const sidenav = sidenavComponent(fixture);
        sidenav.opened = true;

        const sidenavSpy = spyOn($.fn, 'sideNav');

        sidenav.opened = false;

        expect(sidenavSpy).toHaveBeenCalledWith('hide');
      });
    }));

    it('should be true when sidenav is opened', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav></mz-sidenav>
      `).then(fixture => {
        fixture.detectChanges();

        const sidenav = sidenavComponent(fixture);
        sidenav.opened = false;

        sidenav['collapseButton'].sideNav('show');

        expect(sidenav.opened).toBeTruthy();
      });
    }));

    it('should be false when sidenav is closed', async(() => {

      buildComponent<MzSidenavComponent>(`
        <mz-sidenav></mz-sidenav>
      `).then(fixture => {
        fixture.detectChanges();

        const sidenav = sidenavComponent(fixture);
        sidenav.opened = true;

        sidenav['collapseButton'].sideNav('hide');

        expect(sidenav.opened).toBeFalsy();
      });
    }));
  });
});
