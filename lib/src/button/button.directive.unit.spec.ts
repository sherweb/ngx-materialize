import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzButtonDirective } from './button.directive';

describe('MzButtonDirective:unit', () => {
  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzButtonDirective;
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
    directive = new MzButtonDirective(mockElementRef, renderer);
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initMaterialize').and.callFake(() => callOrder.push('initMaterialize'));
      spyOn(HandlePropChanges.prototype, 'executePropHandlers').and.callFake(() => callOrder.push('executePropHandlers'));
    });

    it('should call initHandlers method', () => {
      directive.ngOnInit();

      expect(directive.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');
    });

    it('should call initMaterialize method', () => {
      directive.ngOnInit();

      expect(directive.initMaterialize).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initMaterialize');
    });

    it('should call executePropHandlers method', () => {
      directive.ngOnInit();

      expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      expect(callOrder[2]).toBe('executePropHandlers');
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        disabled: 'handleDisabled',
        flat: 'handleFlat',
        float: 'handleFloat',
        large: 'handleLarge',
        noWaves: 'handleNoWaves',
      };

      directive.initHandlers();

      expect(Object.keys(directive.handlers).length).toBe(Object.keys(handlers).length);

      Object.keys(handlers).forEach(key => {

        const handler = handlers[key];

        spyOn(directive, handler);

        directive[handler]();

        expect(directive[handler]).toHaveBeenCalled();
      });
    });

    describe('handleDisabled', () => {

      it('should add disabled css class on button element when disabled is true', () => {

        spyOn(renderer, 'setElementClass');

        directive.disabled = true;
        directive.handleDisabled();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'disabled', directive.disabled);
      });

      it('should not add disabled css class on button element when disabled is false', () => {

        spyOn(renderer, 'setElementClass');

        directive.disabled = false;
        directive.handleDisabled();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'disabled', directive.disabled);
      });
    });

    describe('handleFlat', () => {

      it('should add btn-flat css class on button element when flat is true', () => {

        spyOn(renderer, 'setElementClass');

        directive.flat = true;
        directive.handleFlat();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn', !directive.flat);
        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-flat', directive.flat);
      });

      it('should not add btn-flat css class on button element when flat is false', () => {

        spyOn(renderer, 'setElementClass');

        directive.flat = false;
        directive.handleFlat();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-flat', directive.flat);
      });
    });

    describe('handleFloat', () => {

      it('should add btn-floating css class on button element when float is true', () => {
        spyOn(renderer, 'setElementClass');

        directive.float = true;
        directive.handleFloat();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-floating', directive.float);
      });

      it('should not add btn-floating css class on button element when float is false', () => {

        spyOn(renderer, 'setElementClass');

        directive.float = false;
        directive.handleFloat();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-floating', directive.float);
      });
    });

    describe('handleLarge', () => {

      it('should add btn-large css class on button element when large is true', () => {

        spyOn(renderer, 'setElementClass');

        directive.large = true;
        directive.handleLarge();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-large', directive.large);
      });

      it('should not add btn-large css class on button element when large is false', () => {

        spyOn(renderer, 'setElementClass');

        directive.large = false;
        directive.handleLarge();

        expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'btn-large', directive.large);
      });
    });

    describe('handleNoWaves', () => {
      it('should add waves-effect and waves-light css class on button element when noWaves is false', () => {

        const rendererSpy = spyOn(renderer, 'setElementClass');

        directive.noWaves = false;
        directive.handleNoWaves();

        expect(rendererSpy.calls.count()).toBe(2);
        expect(rendererSpy.calls.allArgs()).toEqual([
          [mockElementRef.nativeElement, 'waves-effect', !directive.noWaves],
          [mockElementRef.nativeElement, 'waves-light', !directive.noWaves],
        ]);
      });

      it('should add only waves-effect on button element when flat is true', () => {

        const rendererSpy = spyOn(renderer, 'setElementClass');

        directive.flat = true;
        directive.handleNoWaves();

        expect(rendererSpy.calls.count()).toBe(1);
        expect(rendererSpy.calls.allArgs()).toEqual([
          [mockElementRef.nativeElement, 'waves-effect', !directive.noWaves],
        ]);
      });

      it('should not add waves-effect and waves-light on button element when noWaves is true', () => {

        const rendererSpy = spyOn(renderer, 'setElementClass');

        directive.noWaves = true;
        directive.handleNoWaves();

        expect(rendererSpy.calls.count()).toBe(2);
        expect(rendererSpy.calls.allArgs()).toEqual([
          [mockElementRef.nativeElement, 'waves-effect', !directive.noWaves],
          [mockElementRef.nativeElement, 'waves-light', !directive.noWaves],
        ]);
      });
    });
  });
});
