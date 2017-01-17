import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzCardComponent } from './card.component';

describe('MzCardComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzCardComponent,
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

    it('should apply backgroundClass css class when provided', async(() => {

      buildComponent<MzCardComponent>(`<mz-card [backgroundClass]="'class-x'"></mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(card().classList).toContain('class-x');
      });
    }));

    it('should not apply backgroundClass css class when not provided', async(() => {

      buildComponent<MzCardComponent>(`<mz-card></mz-card>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.backgroundClass).toBeUndefined();
        expect(card().classList.length).toBe(1);
        expect(card().classList).toContain('card');
      });
    }));

    it('should set hoverable css class when hoverable is true', async(() => {

      buildComponent<MzCardComponent>(`<mz-card [hoverable]="true"></mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(card().classList).toContain('hoverable');
      });
    }));

    it('should not set hoverable css class when hoverable is false', async(() => {

      buildComponent<MzCardComponent>(`<mz-card>[hoverable]="false"></mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(card().classList).not.toContain('hoverable');
      });
    }));

    it('should not set hoverable css class when hoverable is not provided', async(() => {

      buildComponent<MzCardComponent>(`<mz-card></mz-card>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

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
        fixture.detectChanges();

        expect(cardTitle().innerText.trim()).toBe('title-x');
      });
    }));
  });

  describe('card-content', () => {

    let nativeElement: any;

    function cardContent(): HTMLElement {
      return nativeElement.querySelector('.card-content');
    }

    it('should apply textClass css class when provided', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card [textClass]="'class-x'"></mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardContent().classList).toContain('class-x');
      });
    }));

    it('should not apply textClass css class when not provided', async(() => {

      buildComponent<MzCardComponent>(`<mz-card></mz-card>`).then((fixture) => {

        const component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(component.textClass).toBeUndefined();
        expect(cardContent().classList.length).toBe(1);
        expect(cardContent().classList).toContain('card-content');
      });
    }));

    it('should transclude mz-card-content', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-content>
            content-x
          </mz-card-content>
        </mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardContent().innerText.trim()).toBe('content-x');
      });
    }));
  });

  describe('card-action', () => {

    let nativeElement: any;

    function cardActionWrapper(): HTMLElement {
      return nativeElement.querySelector('.card-action');
    }

    function cardAction(): HTMLElement {
      return nativeElement.querySelector('mz-card-action');
    }

    it('should be shown when mz-card-action tag is not empty', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action>
            action-x
          </mz-card-action>
        </mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardActionWrapper().style.display).not.toBe('none');
      });
    }));

    it('should be hidden when mz-card-action tag is not present', async(() => {

      buildComponent<MzCardComponent>(`<mz-card></mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardActionWrapper().style.display).toBe('none');
      });
    }));

    it('should be hidden when mz-card-action tag is present but empty', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action></mz-card-action>
        </mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardActionWrapper().style.display).toBe('none');
      });
    }));

    it('should transclude mz-card-action', async(() => {

      buildComponent<MzCardComponent>(`
        <mz-card>
          <mz-card-action>
            action-x
          </mz-card-action>
        </mz-card>`).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(cardAction().innerText.trim()).toBe('action-x');
      });
    }));
  });
});
