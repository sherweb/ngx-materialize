import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzCollapsibleComponent } from './collapsible.component';

describe('MzCollapsibleComponent:unit', () => {
  let component: MzCollapsibleComponent;
  let fixture: ComponentFixture<MzCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollapsibleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should call handleDataCollapsible function', () => {
      spyOn(component, 'handleDataCollapsible');

      component.ngAfterViewInit();

      expect(component.handleDataCollapsible).toHaveBeenCalled();
    });

    it('should call initCollapsible function', () => {
      spyOn(component, 'initCollapsible');

      component.initCollapsible();

      expect(component.initCollapsible).toHaveBeenCalled();
    });
  });

  describe('handleDataCollapsible', () => {

    it('should set data collapsible value when provided', () => {

      component.mode = 'accordion';

      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleDataCollapsible();

      expect(component.renderer.setElementAttribute)
        .toHaveBeenCalledWith(
          component.collapsible.nativeElement,
          'data-collapsible',
          component.mode);
    });

    it('should not set data collapsible value when not provided', () => {

      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleDataCollapsible();

      expect(component.renderer.setElementAttribute).not.toHaveBeenCalled();
    });
  });

  describe('initCollapsible', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

    it('should initialize collapsible using jquery', fakeAsync(() => {

      component.onClose = () => { const close = 'close'; };
      component.onOpen = () => { const open = 'open'; };

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

      component.mode = 'accordion';

      spyOn(component.changeDetectorRef, 'detectChanges').and.callThrough();

      component.initCollapsible();

      expect(component.changeDetectorRef.detectChanges).toHaveBeenCalled();
    });
  });
});
