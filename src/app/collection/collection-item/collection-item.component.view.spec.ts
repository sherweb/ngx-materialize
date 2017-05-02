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

    it('should have host element removed', async(() => {

      buildComponent<any>(`
        <mz-collection-item>
          collection-item-x
        </mz-collection-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzCollectionItem()).toBeNull();
      });
    }));
  });

  describe('collection-item', () => {

    function collectionItem(): HTMLElement {
      return nativeElement.querySelector('div.collection-item');
    }

    it('should transclude correctly', async(() => {

      buildComponent<any>(`
        <mz-collection-item>
          collection-item-x
        </mz-collection-item>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collectionItem().innerHTML.trim()).toBe('collection-item-x');
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

        expect(collectionItem().classList.length).toBe(1);
        expect(collectionItem().classList).toContain('collection-item');
        expect(collectionItem().classList).not.toContain('avatar');

        fixture.componentInstance.avatar = true;
        fixture.detectChanges();

        expect(collectionItem().classList.length).toBe(2);
        expect(collectionItem().classList).toContain('collection-item');
        expect(collectionItem().classList).toContain('avatar');
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

        expect(collectionItem().classList.length).toBe(1);
        expect(collectionItem().classList).toContain('collection-item');
        expect(collectionItem().classList).not.toContain('dismissable');

        fixture.componentInstance.dismissable = true;
        fixture.detectChanges();

        expect(collectionItem().classList.length).toBe(2);
        expect(collectionItem().classList).toContain('collection-item');
        expect(collectionItem().classList).toContain('dismissable');
      });
    }));
  });
});
