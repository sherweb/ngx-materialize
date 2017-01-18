import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSidenavDividerComponent } from './sidenav-divider.component';

describe('MzSidenavDividerComponent:view', () => {

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSidenavDividerComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-sidenav-divider', () => {

    let nativeElement: any;

    function sidenavDivider(): HTMLElement {
      return nativeElement.querySelector('mz-sidenav-divider');
    }

    it('should display correctly', async(() => {

      buildComponent<MzSidenavDividerComponent>(`
        <mz-sidenav-divider></mz-sidenav-divider>`).then(fixture => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const li = sidenavDivider().children[0];
        expect(li.nodeName).toBe('LI');
        expect(li.classList.length).toBe(0);

        const div = li.children[0];
        expect(div.nodeName).toBe('DIV');
        expect(div.classList.length).toBe(1);
        expect(div.classList).toContain('divider');
        expect(div.children.length).toBe(0);
      });
    }));
  });
});
