import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzChipComponent } from './chip.component';

describe('MzChipComponent:view', () => {
  let nativeElement: any;

  function chip(): HTMLElement {
    return nativeElement.querySelector('.chip');
  }

  function closeIcon(): HTMLElement {
    return nativeElement.querySelector('i.close');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzChipComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('chip', () => {

    it('should transclude correctly', async(() => {

      buildComponent(`
        <mz-chip>
          chip-x
        </mz-chip>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(chip().innerText.trim()).toBe('chip-x');
      });
    }));
  });

  describe('close icon', () => {

    it('should be shown correctly when close is true', async(() => {

      buildComponent(`
        <mz-chip [close]="true">
          chip-x
        </mz-chip>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(closeIcon()).not.toBeNull();
        expect(closeIcon().classList).toContain('material-icons');
        expect(closeIcon().innerHTML).toBe('close');
      });
    }));

    it('should not be shown when close is false', async(() => {

      buildComponent(`
        <mz-chip [close]="false">
          chip-x
        </mz-chip>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(closeIcon()).toBeNull();
      });
    }));

    xit('should emit event correctly when clicked', async(() => {

      const onDelete = jasmine.createSpy('onDelete');

      buildComponent(`
        <mz-chip [close]="true" (delete)="onDelete($event)">
          chip-x
        </mz-chip>
      `, {
        onDelete,
      }).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        closeIcon().click();

        expect(onDelete).toHaveBeenCalledWith('chip-x');
      });
    }));

    xit('should remove chip from the DOM when clicked', async(() => {

      buildComponent(`
        <mz-chip [close]="true">
          chip-x
        </mz-chip>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        closeIcon().click();

        expect(chip()).toBeNull();
      });
    }));
  });
});
