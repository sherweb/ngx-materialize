import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzSecondaryContentDirective } from './secondary-content.directive';

describe('MzSecondaryContentDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzSecondaryContentDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('host element', () => {

    it('should have secondary-content css class applied correctly', async(() => {

      buildComponent<any>(`
        <div mz-secondary-content></div>
      `).then((fixture) => {

        fixture.detectChanges();

        const secondaryContentElement = fixture.nativeElement.querySelector('[mz-secondary-content]');

        expect(secondaryContentElement.classList.length).toBe(1);
        expect(secondaryContentElement.classList).toContain('secondary-content');
      });
    }));
  });
});
