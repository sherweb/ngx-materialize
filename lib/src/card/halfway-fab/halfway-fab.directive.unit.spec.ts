import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzHalfwayFabDirective } from './halfway-fab.directive';

describe('MzHalfwayFab:unit', () => {
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        MzHalfwayFabDirective,
        MzTestWrapperComponent,
      ],
    });
  }));

  function button(): HTMLDivElement {
    return nativeElement.querySelector('button');
  }

  it('should add halfway-fab class', async() => {
    buildComponent(`
      <button mz-halfway-fab>
        test
      </button>
    `).then((fixture) => {
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();

      expect(button().classList).toContain('halfway-fab');
    });
  });
});
