import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzNavbarItemComponent } from './navbar-item.component';

describe('MzNavbarItemComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzNavbarItemComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('navbar item', () => {

    let nativeElement: any;

    function item(): HTMLElement {
      return nativeElement.querySelector('li');
    }

    it('should display a navbar item', async(() => {

      buildComponent<MzNavbarItemComponent>(`<mz-navbar-item></mz-navbar-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(item()).toBeTruthy();
      });
    }));

    it('should have custom class when itemClass is provided', async(() => {

      buildComponent<MzNavbarItemComponent>(`<mz-navbar-item [itemClass]="'some-class'"></mz-navbar-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(item().classList).toContain('some-class');
      });
    }));

    it('should have active class when active prop is provided', async(() => {

      buildComponent<MzNavbarItemComponent>(`<mz-navbar-item [active]="'true'"></mz-navbar-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(item().classList).toContain('active');
      });
    }));

    it('should not have active class when active prop is not provided', async(() => {

      buildComponent<MzNavbarItemComponent>(`<mz-navbar-item></mz-navbar-item>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(item().classList).not.toContain('active');
      });
    }));

    it('should transclude content', async(() => {

      buildComponent<MzNavbarItemComponent>(`
        <mz-navbar-item>
          <a href="https://some-url/" class="some-class">some-text</a>
        </mz-navbar-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContent = item().querySelector('a');

        expect(transcludeContent).toBeTruthy();
        expect(transcludeContent.href).toBe('https://some-url/');
        expect(transcludeContent.classList).toContain('some-class');
        expect(transcludeContent.innerText.trim()).toBe('some-text');
      });
    }));
  });
});
