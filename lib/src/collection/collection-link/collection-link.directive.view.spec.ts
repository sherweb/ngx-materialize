import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzCollectionLinkDirective } from './collection-link.directive';

describe('MzCollectionItemLinkDirective:view', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCollectionLinkDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('host element', () => {

    function collectionLink(): HTMLElement {
      return nativeElement.querySelector('[mz-collection-link]');
    }

    it('should have collection-item css class applied correctly', async(() => {

      buildComponent<any>(`
        <a mz-collection-link>link-x</a>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collectionLink().classList.length).toBe(1);
        expect(collectionLink().classList).toContain('collection-item');
      });
    }));

    it('should have active css class applied correctly', async(() => {

      buildComponent<any>(
        `<a mz-collection-link [active]="active">link-x</a>`,
        { active: false },
      ).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(collectionLink().classList.length).toBe(1);
        expect(collectionLink().classList).toContain('collection-item');
        expect(collectionLink().classList).not.toContain('active');

        fixture.componentInstance.active = true;
        fixture.detectChanges();

        expect(collectionLink().classList.length).toBe(2);
        expect(collectionLink().classList).toContain('collection-item');
        expect(collectionLink().classList).toContain('active');
      });
    }));
  });
});
