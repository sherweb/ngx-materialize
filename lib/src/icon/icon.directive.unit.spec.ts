import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzIconDirective } from './icon.directive';

describe('MzIconDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzIconDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Renderer, useValue: mockRenderer },
      ],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzIconDirective(mockElementRef, renderer);
  });

  describe('ngAfterViewInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initMaterialize').and.callFake(() => callOrder.push('initMaterialize'));
      spyOn(HandlePropChanges.prototype, 'executePropHandlers').and.callFake(() => callOrder.push('executePropHandlers'));
    });

    it('should call initHandlers method', () => {

      directive.ngAfterViewInit();

      expect(directive.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');
    });

    it('should call initMaterialize method', () => {

      directive.ngAfterViewInit();

      expect(directive.initMaterialize).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initMaterialize');
    });

    it('should call executePropHandler method', () => {

      directive.ngAfterViewInit();

      expect(directive.executePropHandlers).toHaveBeenCalled();
      expect(callOrder[2]).toBe('executePropHandlers');
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
         align: 'handleAlign',
         icon: 'handleIcon',
         size: 'handleSize',
      };

      directive.initHandlers();

      expect(Object.keys(directive.handlers).length).toBe(Object.keys(handlers).length);

      Object.keys(handlers).forEach(key => {
        const handler = handlers[key];
        const previousValue = 'previous-value';

        spyOn(directive, handler);

        directive[handler](previousValue);

        expect(directive[handler]).toHaveBeenCalledWith(previousValue);
      });
    });
  });

  describe('initMaterialize', () => {

    it('should add material-icons css class', () => {

      spyOn(renderer, 'setElementClass');

      directive.initMaterialize();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'material-icons', true);
    });
  });

  describe('handleAlign', () => {

    it('should add align css class when align is provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.align = 'left';

      directive.handleAlign();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, directive.align, true);
    });

    it('should not add align css class when align is not provided', () => {

      const spy = spyOn(renderer, 'setElementClass');

      directive.handleAlign();

      expect(spy.calls.count()).toEqual(0);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-align-value';

      directive.handleAlign(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, previousValue, false);
    });
  });

  describe('handleIcon', () => {

    it('should add icon to the element innerHTML', () => {

      spyOn(renderer, 'setElementProperty');

      directive.icon = 'cloud';

      directive.handleIcon();

      expect(renderer.setElementProperty).toHaveBeenCalledWith(mockElementRef.nativeElement, 'innerHTML', directive.icon);
    });
  });

  describe('handleSize', () => {

    it('should add size css class when size is provided.', () => {

      spyOn(renderer, 'setElementClass');

      directive.size = 'medium';

      directive.handleSize();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, directive.size, true);
    });

    it('should not add size css class when size is not provided', () => {

      const spy = spyOn(renderer, 'setElementClass');

      directive.handleSize();

      expect(spy.calls.count()).toEqual(0);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-size-value';

      directive.handleSize(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, previousValue, false);
    });
  });
});
