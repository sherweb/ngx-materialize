import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzAvatarDirective } from './avatar.directive';

describe('MzAvatarDirective:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzAvatarDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('host element', () => {

    it('should have circle css class applied correctly', async(() => {

      buildComponent<any>(`
        <div mz-avatar></div>
      `).then((fixture) => {

        fixture.detectChanges();

        const avatarElement = fixture.nativeElement.querySelector('[mz-avatar]');

        expect(avatarElement.classList.length).toBe(1);
        expect(avatarElement.classList).toContain('circle');
      });
    }));
  });
});
