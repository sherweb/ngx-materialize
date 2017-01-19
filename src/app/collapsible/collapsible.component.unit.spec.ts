/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MzCollapsibleComponent } from './collapsible.component';

describe('MzCollapsibleComponent:unit', () => {
  let component: MzCollapsibleComponent;
  let fixture: ComponentFixture<CollapsibleComponent>;

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
  });

  describe('handleDataCollapsible', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

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

      component.ngAfterViewInit();

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
  });
});
