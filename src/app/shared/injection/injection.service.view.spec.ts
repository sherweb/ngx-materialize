import { ApplicationRef, Component, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzInjectionService } from './injection.service';

@Component({
  selector: 'mz-test',
  template: `<div>injected-component-x</div>`,
})
class MzTestComponent {
  @Input() inputProperty: string;
}

describe('MzInjectionService:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzTestComponent,
        MzTestWrapperComponent,
      ],
      providers: [
        MzInjectionService,
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MzTestComponent],
      },
    });
  }));

  describe('appendComponent', () => {
    let nativeElement: any;

    function testComponent(): HTMLElement {
      return nativeElement.querySelector('mz-test');
    }

    it('should inject component in the DOM', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        // expect not be in the DOM
        expect(testComponent()).toBeNull();

        injectionService.setRootViewContainer(fixture.componentRef);
        injectionService.appendComponent(MzTestComponent);

        // expect to be in the DOM
        expect(testComponent()).toBeDefined();
        expect(testComponent().innerText).toBe('injected-component-x');
      });
    }));

    it('should project input options to the component instance', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        injectionService.setRootViewContainer(fixture.componentRef);
        const componentRef = injectionService.appendComponent(MzTestComponent, { inputProperty: 'input-property-x' });

        expect(componentRef.instance.inputProperty).toBe('input-property-x');
      });
    }));

    it('should detach view when component is destroyed', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const applicationRef: ApplicationRef = TestBed.get(ApplicationRef);
        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        injectionService.setRootViewContainer(fixture.componentRef);
        const componentRef = injectionService.appendComponent(MzTestComponent);

        // expect to be in the DOM
        expect(testComponent()).toBeDefined();

        spyOn(applicationRef, 'detachView').and.callThrough();

        componentRef.destroy();

        expect(applicationRef.detachView).toHaveBeenCalledWith(componentRef.hostView);

        // expect not be in the DOM
        expect(testComponent()).toBeNull();
      });
    }));

    it('should append component to specific location in the DOM when location provided', async(() => {

      buildComponent(`<div class="location"></div>`).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);
        const location: HTMLElement = nativeElement.querySelector('.location');

        injectionService.appendComponent(MzTestComponent, null, location);

        expect(testComponent().parentElement).toBe(location);
      });
    }));

    it('should append component to application root component in the DOM when location not provided', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const applicationRef: ApplicationRef = TestBed.get(ApplicationRef);
        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        // mock _rootComponents as this does not exists in the context of TestBed
        applicationRef['_rootComponents'] = [fixture.componentRef];

        injectionService.appendComponent(MzTestComponent);

        expect(testComponent().parentElement).toBe(fixture.nativeElement);
      });
    }));

    it('should throw an error when applicationRef does not have _rootComponents and no default location is set', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        expect(() => injectionService.appendComponent(MzTestComponent))
          .toThrowError('View Container not found! It needs to be manually set via setRootViewContainer.');
      });
    }));
  });

  describe('setRootViewContainer', () => {
    let nativeElement: any;

    function testComponent(): HTMLElement {
      return nativeElement.querySelector('mz-test');
    }

    it('should override default root view container', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);

        injectionService.setRootViewContainer(fixture.componentRef);
        injectionService.appendComponent(MzTestComponent);

        expect(testComponent().parentElement).toBe(fixture.nativeElement);
      });
    }));
  });
});
