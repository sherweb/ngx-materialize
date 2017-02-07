import { ElementRef, Renderer } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { MzButtonDirective } from './button.directive';

describe('MzButtonDirective:unit', () => {
  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzButtonDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
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
  });
});
