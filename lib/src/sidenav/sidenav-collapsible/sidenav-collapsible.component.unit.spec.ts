import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzSidenavCollapsibleComponent } from './sidenav-collapsible.component';

describe('MzSidenavCollapsibleComponent:unit', () => {
  let component: MzSidenavCollapsibleComponent;
  let fixture: ComponentFixture<MzSidenavCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavCollapsibleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {

    it('should call initCollapsible function', () => {
      spyOn(component, 'initCollapsible');

      component.initCollapsible();

      expect(component.initCollapsible).toHaveBeenCalled();
    });
  });

  describe('initCollapsible', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

    it('should initialize collapsible using jquery', fakeAsync(() => {

      component.onClose = () => null;
      component.onOpen = () => null;

      const mockJQueryCollapsibleNativeElement = { collapsible: true };

      spyOn(component.renderer, 'invokeElementMethod');

      spyOn(window, '$').and.callFake((selector: any) => {
        return selector === component.collapsible.nativeElement
          ? mockJQueryCollapsibleNativeElement
          : {};
      });

      component.initCollapsible();

      forceSetTimeoutEnd();

      expect(component.renderer.invokeElementMethod)
        .toHaveBeenCalledWith(
          mockJQueryCollapsibleNativeElement,
          'collapsible', [{
            accordion: false,
            onClose: component.onClose,
            onOpen: component.onOpen,
          }],
        );
    }));

    it('should call detectChanges', () => {

      spyOn(component.changeDetectorRef, 'detectChanges').and.callThrough();

      component.initCollapsible();

      expect(component.changeDetectorRef.detectChanges).toHaveBeenCalled();
    });
  });
});
