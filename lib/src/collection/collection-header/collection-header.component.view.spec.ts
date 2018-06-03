import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzCollectionHeaderComponent } from './collection-header.component';

describe('MzCollectionHeaderComponent:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollectionHeaderComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('collection-header', () => {

    function collectionHeader(): HTMLElement {
      return nativeElement.querySelector('div.collection-header');
    }

    it('should transclude correctly', async(() => {

      buildComponent<any>(`
        <mz-collection-header>
          collection-header-x
        </mz-collection-header>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collectionHeader().innerHTML.trim()).toBe('collection-header-x');
      });
    }));
  });
});
