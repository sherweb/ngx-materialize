import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzCollectionItemComponent } from './collection-item.component';

describe('MzCollectionItemComponent:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollectionItemComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('mz-collection-item', () => {

    function mzCollectionItem(): HTMLElement {
      return nativeElement.querySelector('mz-collection-item');
    }

    it('should transclude correctly', async(() => {

      buildComponent<any>(`
        <mz-collection-item>
          collection-item-x
        </mz-collection-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzCollectionItem().innerHTML.trim()).toBe('collection-item-x');
      });
    }));

    it('should have display block css style so it can behave like a div', async(() => {

      buildComponent<any>(
        `<mz-collection-item>
          collection-item-x
        </mz-collection-item>`,
        { avatar: false },
      ).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(window.getComputedStyle(mzCollectionItem(), null).display).toBe('block');
      });
    }));

    it('should have collection-item class applied correctly', async(() => {

      buildComponent<any>(
        `<mz-collection-item>
          collection-item-x
        </mz-collection-item>`,
        { avatar: false },
      ).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzCollectionItem().classList.length).toBe(1);
        expect(mzCollectionItem().classList).toContain('collection-item');
      });
    }));

    it('should have avatar css class applied correctly', async(() => {

      buildComponent<any>(
        `<mz-collection-item [avatar]="avatar">
          collection-item-x
        </mz-collection-item>`,
        { avatar: false },
      ).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzCollectionItem().classList.length).toBe(1);
        expect(mzCollectionItem().classList).toContain('collection-item');
        expect(mzCollectionItem().classList).not.toContain('avatar');

        fixture.componentInstance.avatar = true;
        fixture.detectChanges();

        expect(mzCollectionItem().classList.length).toBe(2);
        expect(mzCollectionItem().classList).toContain('collection-item');
        expect(mzCollectionItem().classList).toContain('avatar');
      });
    }));

    it('should have dismissable css class applied correctly', async(() => {

      buildComponent<any>(
        `<mz-collection-item [dismissable]="dismissable">
          collection-item-x
        </mz-collection-item>`,
        { dismissable: false },
      ).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzCollectionItem().classList.length).toBe(1);
        expect(mzCollectionItem().classList).toContain('collection-item');
        expect(mzCollectionItem().classList).not.toContain('dismissable');

        fixture.componentInstance.dismissable = true;
        fixture.detectChanges();

        expect(mzCollectionItem().classList.length).toBe(2);
        expect(mzCollectionItem().classList).toContain('collection-item');
        expect(mzCollectionItem().classList).toContain('dismissable');
      });
    }));
  });
});
