import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzIconMdiDirective } from './icon-mdi.directive';

describe('MzIconMdiDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzIconMdiDirective;
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
    directive = new MzIconMdiDirective(mockElementRef, renderer);
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

    it('should initilialize handlers correctly', () => {

      const handlers = {
         align: 'handleAlign',
         flip: 'handleFlip',
         icon: 'handleIcon',
         rotate: 'handleRotate',
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

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi', true);
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

  describe('handleFlip', () => {

    it('should add flip css class when flip is provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.flip = 'vertical';

      directive.handleFlip();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-flip-' + directive.flip, true);
    });

    it('should not add flip css class when flip is not provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.handleFlip();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-flip-' + directive.flip, false);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-flip-value';

      directive.handleFlip(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-flip-' + previousValue, false);
    });
  });

  describe('handleIcon', () => {

    it('should add icon to the icon tag class attribute', () => {

      spyOn(renderer, 'setElementClass');

      directive.icon = 'sword';

      directive.handleIcon();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-' + directive.icon, true);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-icon-value';

      directive.handleIcon(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-' + previousValue, false);
    });
  });

  describe('handleRotate', () => {

    it('should add rotate css class when flip is provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.rotate = '90';

      directive.handleRotate();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-rotate-' + directive.rotate, true);
    });

    it('should not add rotate css class when flip is not provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.handleRotate();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-rotate-' + directive.rotate, false);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-rotate-value';

      directive.handleRotate(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-rotate-' + previousValue, false);
    });
  });

  describe('handleSize', () => {

    it('should add size css class when size is provided.', () => {

      spyOn(renderer, 'setElementClass');

      directive.size = '36px';

      directive.handleSize();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-' + directive.size, true);
    });

    it('should add default size css class when size is not provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.handleSize();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-24px', true);
    });

    it('should remove previous css class when provided', () => {

      spyOn(renderer, 'setElementClass');

      const previousValue = 'previous-size-value';

      directive.handleSize(previousValue);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'mdi-' + previousValue, false);
    });
  });
});
