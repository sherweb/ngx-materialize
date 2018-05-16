import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzCardComponent, MzCardTitleDirective } from './card.component';

describe('MzCardComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCardComponent,
        MzCardTitleDirective,
        MzTestWrapperComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  describe('card', () => {

    let nativeElement: any;

    function card(): HTMLElement {
      return nativeElement.querySelector('.card');
    }

    function mzCard(): HTMLElement {
      return nativeElement.querySelector('mz-card');
    }

    it('should apply css class on mz-card when provided', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card class="class-x"></mz-card>
      `).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(mzCard().classList.length).toBe(2);
        expect(mzCard().classList).toContain('card');
        expect(mzCard().classList).toContain('class-x');
      });
    }));

    it('should set hoverable css class when hoverable is true', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card [hoverable]="true"></mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(card().classList).toContain('hoverable');
      });
    }));

    it('should not set hoverable css class when hoverable is false', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card [hoverable]="false"></mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(card().classList).not.toContain('hoverable');
      });
    }));

    it('should not set hoverable css class when hoverable is not provided', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card></mz-card>
      `).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(component.hoverable).toBeUndefined();
        expect(card().classList).not.toContain('hoverable');
      });
    }));
  });

  describe('card-title', () => {

    let nativeElement: any;

    function cardTitle(): HTMLElement {
      return nativeElement.querySelector('.card-title');
    }

    it('should transclude mz-card-title', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-title>
            title-x
          </mz-card-title>
        </mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardTitle().innerText.trim()).toBe('title-x');
      });
    }));

    it('should not display when mz-card-title tag is not present', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-content>
            content-x
          </mz-card-content>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardTitle()).toBeFalsy();
      });
    }));

    it('should not display when mz-card-title tag is present but empty', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-title>
          </mz-card-title>
          <mz-card-content>
            content-x
          </mz-card-content>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardTitle()).toBeFalsy();
      });
    }));
  });

  describe('card-content', () => {

    let nativeElement: any;

    function cardContent(): HTMLElement {
      return nativeElement.querySelector('.card-content');
    }

    function mzCardContent(): HTMLElement {
      return nativeElement.querySelector('mz-card-content');
    }

    it('should apply css class on mz-card-content when provided', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-content class="class-x">
            content-x
          </mz-card-content>
        </mz-card>
      `).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(mzCardContent().classList.length).toBe(1);
        expect(mzCardContent().classList).toContain('class-x');
      });
    }));

    it('should transclude mz-card-content', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-content>
            content-x
          </mz-card-content>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardContent().innerText.trim()).toBe('content-x');
      });
    }));
  });

  describe('card-action', () => {

    let nativeElement: any;

    function cardAction(): HTMLElement {
      return nativeElement.querySelector('.card-action');
    }

    function mzCardAction(): HTMLElement {
      return nativeElement.querySelector('mz-card-action');
    }

    it('should be shown when mz-card-action tag is not empty', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action>
            action-x
          </mz-card-action>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardAction().classList).toContain('card-action');
      });
    }));

    it('should not display when mz-card-action tag is not present', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card></mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardAction()).toBeFalsy();
      });
    }));

    it('should not display when mz-card-action tag is present but empty', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action></mz-card-action>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(cardAction()).toBeFalsy();
      });
    }));

    it('should apply css class on mz-card-action when provided', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action class="class-x">
            action-x
          </mz-card-action>
        </mz-card>
      `).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(mzCardAction().classList.length).toBe(1);
        expect(mzCardAction().classList).toContain('class-x');
      });
    }));

    it('should transclude mz-card-action', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action>
            action-x
          </mz-card-action>
        </mz-card>
      `).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.autoDetectChanges();

        expect(mzCardAction().innerText.trim()).toBe('action-x');
      });
    }));
  });
});
