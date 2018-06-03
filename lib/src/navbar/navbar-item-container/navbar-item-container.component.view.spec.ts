import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzNavbarItemContainerComponent } from './navbar-item-container.component';

describe('MzNavbarItemContainerComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzNavbarItemContainerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('navbar item container', () => {

    let nativeElement: any;

    function itemContainer(): HTMLElement {
      return nativeElement.querySelector('ul');
    }

    it('should display a navbar item container', async(() => {

      buildComponent<MzNavbarItemContainerComponent>(`<mz-navbar-item-container></mz-navbar-item-container>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(itemContainer()).toBeTruthy();
        expect(itemContainer().id).toContain('nav-mobile');
      });
    }));

    it('should have align class when provided', async(() => {

      buildComponent<MzNavbarItemContainerComponent>(`
        <mz-navbar-item-container [align]="'right'">
        </mz-navbar-item-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(itemContainer().classList).toContain('right');
      });
    }));

    it('should transclude content', async(() => {

      buildComponent<MzNavbarItemContainerComponent>(`
        <mz-navbar-item-container>
          <div class="some-class"></div>
        </mz-navbar-item-container>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const transcludeContent = itemContainer().querySelector('.some-class');

        expect(transcludeContent).toBeTruthy();
      });
    }));
  });
});
