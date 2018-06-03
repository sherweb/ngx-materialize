import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzProgressComponent } from './progress.component';

describe('MzProgressComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzProgressComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('progress', () => {

    let nativeElement: any;

    function progress(): HTMLElement {
      return nativeElement.querySelector('.progress');
    }

    it('should apply backgroundClass css class when provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress [backgroundClass]="'class-x'"></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progress().classList).toContain('class-x');
      });
    }));

    it('should not apply backgroundClass css class when not provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress></mz-progress>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.backgroundClass).toBeUndefined();
        expect(progress().classList.length).toBe(1);
        expect(progress().classList).toContain('progress');
      });
    }));
  });

  describe('progress-bar', () => {

    let nativeElement: any;

    function progressBar(): HTMLElement {
      return nativeElement.querySelector('.progress-bar');
    }

    it('should apply progressClass css class when provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress [progressClass]="'class-x'"></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progressBar().classList).toContain('class-x');
      });
    }));

    it('should not apply progressClass css class when not provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress></mz-progress>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.backgroundClass).toBeUndefined();
        expect(progressBar().classList.length).toBe(2);
        expect(progressBar().classList).toContain('progress-bar');
        expect(progressBar().classList).toContain('indeterminate');
      });
    }));

    it('should have determinate css class when percentage is provided', async(() => {

      // tested with percentage = 0 to enforce the concept of percentage != null in progress.component.html
      buildComponent<MzProgressComponent>(`<mz-progress [percentage]="0"></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progressBar().classList.length).toBe(2);
        expect(progressBar().classList).toContain('progress-bar');
        expect(progressBar().classList).toContain('determinate');
      });
    }));

    it('should have indeterminate css class when percentage is not provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progressBar().classList.length).toBe(2);
        expect(progressBar().classList).toContain('progress-bar');
        expect(progressBar().classList).toContain('indeterminate');
      });
    }));

    it('should have provided percentage width style when percentage is provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress [percentage]="55"></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progressBar().style.width).toBe('55%');
      });
    }));

    it('should not have percentage width style when percentage is not provided', async(() => {

      buildComponent<MzProgressComponent>(`<mz-progress></mz-progress>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(progressBar().style.width).toBe('');
      });
    }));
  });
});
