import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzBadgeComponent } from './badge.component';

describe('MzBadgeComponent:view', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzBadgeComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('badge', () => {
    let nativeElement: any;

    function badge(): HTMLElement {
      return nativeElement.querySelector('.badge');
    }

    it('should display a badge', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge [value]="2"></mz-badge>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(badge()).toBeTruthy();
        expect(badge().innerText.trim()).toBe('2');
      });
    }));

    it('should have new class when new property is at true', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge [new]="true"></mz-badge>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(badge().classList).toContain('new');
      });
    }));

    it('should not have new class when new property is at false', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge [new]="false"></mz-badge>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(badge().classList).not.toContain('new');
      });
    }));

    it('should not have new class when new property is not provided', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge></mz-badge>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.new).toBeUndefined();
        expect(badge().classList).not.toContain('new');
      });
    }));

    it('should apply badgeClass class when provided', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge [badgeClass]="'red'"></mz-badge>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(badge().classList).toContain('red');
      });
    }));

    it('should not apply badgeClass class when not provided', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge></mz-badge>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.badgeClass).toBeUndefined();
        expect(badge().classList.length).toBe(1);
      });
    }));

    it('should have caption attribute when caption is provided', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge [caption]="'My Caption'"></mz-badge>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(badge().getAttribute('data-badge-caption')).toContain('My Caption');
      });
    }));

    it('should not have caption attribute when caption is not provided', async(() => {
      buildComponent<MzBadgeComponent>(`<mz-badge></mz-badge>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.caption).toBeUndefined();
        expect(badge().getAttribute('data-badge-caption')).toBeNull();
      });
    }));

  });
});
