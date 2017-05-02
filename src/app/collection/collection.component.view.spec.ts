import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzCollectionComponent } from './collection.component';

describe('MzCollectionComponent:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollectionComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('collection', () => {

    function collection(): HTMLElement {
      return nativeElement.querySelector('div.collection');
    }

    it('should transclude correctly', async(() => {

      buildComponent<any>(`
        <mz-collection>
          collection-x
        </mz-collection>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collection().innerHTML.trim()).toBe('collection-x');
      });
    }));

    it('should have with-header css class when collection header is present', async(() => {

      buildComponent<any>(`
        <mz-collection>
          <div class="collection-header">header-x</div>
        </mz-collection>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collection().classList).toContain('with-header');
      });
    }));

    it('should not have with-header css class when no collection header is present', async(() => {

      buildComponent<any>(`
        <mz-collection>
          <div class="not-collection-header">not-header-x</div>
        </mz-collection>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collection().classList).not.toContain('with-header');
      });
    }));
  });
});
