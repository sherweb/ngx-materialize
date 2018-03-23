import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
import { MzFeatureDiscoveryComponent } from './feature-discovery.component';

describe('MzFeatureDiscoveryComponent:view', () => {
  let nativeElement: any;

  function mzFeatureDiscovery(): HTMLElement {
    return nativeElement.querySelector('mz-feature-discovery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzFeatureDiscoveryComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('feature-discovery', () => {

    it('should have tap-target class applied correctly', async(() => {

      buildComponent(`
        <mz-feature-discovery>
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzFeatureDiscovery().classList).toContain('tap-target');
      });
    }));

    it('should have host element display as block', async(() => {

      buildComponent(`
        <mz-feature-discovery>
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(window.getComputedStyle(mzFeatureDiscovery()).display).toBe('block');
      });
    }));

    it('should transclude correctly', async(() => {

      buildComponent(`
        <mz-feature-discovery>
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzFeatureDiscovery().children.length).toBe(1);
        expect(mzFeatureDiscovery().children[0].nodeName).toBe('DIV');
        expect(mzFeatureDiscovery().children[0].classList).toContain('tap-target-content');

        expect(mzFeatureDiscovery().children[0].innerHTML.trim()).toBe('feature-discovery-x');
      });
    }));
  });

  describe('targetId', () => {

    it('should be applied as data-activates attribute correctly', () => {

      buildComponent(`
        <mz-feature-discovery [targetId]="'target-id-x'">
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(mzFeatureDiscovery().getAttribute('data-activates')).toBe('target-id-x');
      });
    });
  });

  describe('open', () => {

    function button(): HTMLElement {
      return nativeElement.querySelector('button');
    }

    it('should call tapTarget jquery extension method correctly', () => {

      buildComponent(`
        <button (click)="featureDiscovery.open()">open</button>
        <mz-feature-discovery [targetId]="'target-id-x'" #featureDiscovery>
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        const mockFeatureDiscoveryElement = { tapTarget: (action: string) => {} };

        spyOn(mockFeatureDiscoveryElement, 'tapTarget');

        spyOn(window, '$').and.callFake(selector => {
          return selector === mzFeatureDiscovery()
            ? mockFeatureDiscoveryElement
            : null;
        });

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        button().click();

        expect(mockFeatureDiscoveryElement.tapTarget).toHaveBeenCalledWith('open');
      });
    });

  });
  describe('close', () => {

    function button(): HTMLElement {
      return nativeElement.querySelector('button');
    }

    it('should call tapTarget jquery extension method correctly', () => {

      buildComponent(`
        <button (click)="featureDiscovery.close()">close</button>
        <mz-feature-discovery [targetId]="'target-id-x'" #featureDiscovery>
          feature-discovery-x
        </mz-feature-discovery>
      `).then((fixture) => {
        const mockFeatureDiscoveryElement = { tapTarget: (action: string) => {} };

        spyOn(mockFeatureDiscoveryElement, 'tapTarget');

        spyOn(window, '$').and.callFake(selector => {
          return selector === mzFeatureDiscovery()
            ? mockFeatureDiscoveryElement
            : null;
        });

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        button().click();

        expect(mockFeatureDiscoveryElement.tapTarget).toHaveBeenCalledWith('close');
      });
    });
  });
});
