import { ElementRef, Renderer } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzTestWrapperComponent } from '../shared/test-wrapper';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzDropdownComponent } from './dropdown.component';

describe('MzDropdownComponent:unit', () => {
  const mockElementRef = new ElementRef({ elementRef: true });

  let component: MzDropdownComponent;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzDropdownComponent,
        MzTestWrapperComponent,
      ],
      providers: [
        { provide: Renderer, useValue: mockRenderer },
      ],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    component = new MzDropdownComponent(mockElementRef, renderer);
    component.id = 'dropdownId';
    component.dropdownButtonId = 'dropdownButtonId';
  });

  function forceSetTimeoutEnd() {
    tick(1); // force setTimeout execution
  }

  describe('ngAfterViewInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(component, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(component, 'initDropdownButtonElement').and.callFake(() => callOrder.push('initDropdownButtonElement'));
      spyOn(component, 'handleProperties').and.callFake(() => callOrder.push('handleProperties'));
    });

    it('should call initHandlers method', () => {

      component.ngAfterViewInit();

      expect(component.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');
    });

    it('should call initDropdownButtonElement method', () => {

      component.ngAfterViewInit();

      expect(component.initDropdownButtonElement).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initDropdownButtonElement');
    });

    it('should call handleProperties method', () => {

      component.ngAfterViewInit();

      expect(component.handleProperties).toHaveBeenCalled();
      expect(callOrder[2]).toBe('handleProperties');
    });
  });

  describe('close', () => {

    it('should invoke close method', fakeAsync(() => {

      const mockDropdownButtonElement = $({ button: true });

      spyOn(renderer, 'invokeElementMethod');

      component.dropdownButtonElement = mockDropdownButtonElement;

      component.close();

      forceSetTimeoutEnd();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockDropdownButtonElement, 'dropdown', ['close']);
    }));
  });

  describe('initDropdownButtonElement', () => {

    it('should get dropdown button element correctly', () => {

      const mockDropdownButtonElement = { button: true };

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === '#' + mockElementRef.nativeElement
          ? mockDropdownButtonElement
          : {};
      });
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        align: 'handleDropdown',
        belowOrigin: 'handleDropdown',
        constrainWidth: 'handleDropdown',
        dropdownButtonId: 'handleDataActivates',
        gutter: 'handleDropdown',
        hover: 'handleDropdown',
        id: 'handleDropdown',
        inDuration: 'handleDropdown',
        outDuration: 'handleDropdown',
        stopPropagation: 'handleDropdown',
      };

      component.initHandlers();

      expect(Object.keys(component.handlers).length).toBe(Object.keys(handlers).length);

      spyOn(component, 'handleDataActivates');
      spyOn(component, 'handleDropdown');

      Object.keys(handlers).forEach(key => {

        const handler = handlers[key];

        component[handler]();

        expect(component[handler]).toHaveBeenCalled();
      });
    });
  });

  describe('handleDataActivates', () => {

    it('should add attribute data-activates', () => {

      spyOn(renderer, 'setElementAttribute');

      component.dropdownButtonElement = <any>[mockElementRef];
      component.id = 'dropdownId';
      component.handleDataActivates();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockElementRef, 'data-activates', component.id);
    });
  });

  describe('handleDropdown', () => {

    it('should invoke dropdown method with all options provided', () => {

      spyOn(component, 'validateProperties');
      spyOn(renderer, 'invokeElementMethod');

      const options: Materialize.DropDownOptions = {
        alignment: 'left',
        belowOrigin: true,
        constrainWidth: true,
        gutter: 10,
        hover: true,
        inDuration: 200,
        outDuration: 200,
        stopPropagation: true,
      };

      Object.assign(component, options);
      component.align = options.alignment;

      component.handleDropdown();

      expect(component.validateProperties).toHaveBeenCalled();
      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(component.dropdownButtonElement, 'dropdown', [options]);
    });
  });

  describe('handleProperties', () => {

    it('should call handleDataActivates method', () => {

      spyOn(component, 'handleDataActivates');
      spyOn(component, 'handleDropdown').and.callFake(() => { });

      component.handleProperties();

      expect(component.handleDataActivates).toHaveBeenCalled();
    });

    it('should call handleDropdown method', () => {

      spyOn(component, 'handleDataActivates').and.callFake(() => { });
      spyOn(component, 'handleDropdown');

      component.handleProperties();

      expect(component.handleDropdown).toHaveBeenCalled();
    });
  });

  describe('open', () => {

    it('should invoke open method', fakeAsync(() => {

      spyOn(renderer, 'invokeElementMethod');

      component.dropdownButtonElement = <any>[mockElementRef.nativeElement];

      component.open();

      forceSetTimeoutEnd();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(component.dropdownButtonElement, 'dropdown', ['open']);
    }));
  });

  describe('validateProperties', () => {

    it('should throw an error when dropdownButtonId is not provided', () => {

      component.dropdownButtonElement = <any>[];

      expect(() => { component.validateProperties(); }).toThrowError(
        'Attribute [dropdownButtonId] from mz-dropdown is required and should be an existing element. ' +
        mockElementRef.nativeElement);
    });

    it('should throw an error when id is not provided', () => {

      component.id = null;

      expect(() => { component.validateProperties(); }).toThrowError(
        'Attribute [id] from mz-dropdown is required. ' +
        mockElementRef.nativeElement);
    });
  });
});
