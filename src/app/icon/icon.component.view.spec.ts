import { async, TestBed } from '@angular/core/testing';

import { MzTestWrapperComponent, buildComponent } from '../shared/test-wrapper';
import { MzIconComponent } from './icon.component';

describe('ButtonComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzIconComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('icon', () => {
    let nativeElement: any;

    function icon(): HTMLElement {
      return nativeElement.querySelector('i');
    }

    it('should display a material icon', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [icon]="'cloud'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList.length).toBe(1);
        expect(icon().classList).toContain('material-icons');
        expect(icon().innerText.trim()).toBe('cloud');
      });
    }));

    it('should have iconClass when provided', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [icon]="'cloud'" [iconClass]="'red-text'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList).toContain('red-text');
      });
    }));

    it('should be left aligned when iconAlign left is provided', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [icon]="'cloud'" [iconAlign]="'left'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList).toContain('left');
      });
    }));

    it('should be right aligned when iconAlign right is provided', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [icon]="'cloud'" [iconAlign]="'right'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList).toContain('right');
      });
    }));

    it('should display a material design icon (mdi)', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [mdiIcon]="'owl'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList.length).toBe(3);
        expect(icon().classList).toContain('mdi');
        expect(icon().classList).toContain('mdi-owl');
        expect(icon().classList).toContain('mdi-24px'); // default mdi size
      });
    }));

    it('should have mdiIconSize when provided', async(() => {
      buildComponent<MzIconComponent>(`<mz-icon [mdiIcon]="'owl'" [mdiIconSize]="'32px'"></mz-icon>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(icon().classList).toContain('mdi-32px');
      });
    }));
  });
});
