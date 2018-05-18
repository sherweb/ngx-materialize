import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzCheckboxDirective } from './checkbox.directive';

describe('MzCheckboxDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzCheckboxDirective;
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
    directive = new MzCheckboxDirective(mockElementRef, renderer);
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(directive, 'handleProperties').and.callFake(() => callOrder.push('handleProperties'));
    });

    it('should call initHandlers method', () => {

      directive.ngOnInit();

      expect(directive.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');
    });

    it('should call initElements method', () => {

      directive.ngOnInit();

      expect(directive.initElements).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initElements');
    });

    it('should call handleProperties method', () => {

      directive.ngOnInit();

      expect(directive.handleProperties).toHaveBeenCalled();
      expect(callOrder[2]).toBe('handleProperties');
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        filledIn: 'handleFilledIn',
        label: 'handleLabel',
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

  describe('initElements', () => {

    it('should get elements correctly', () => {

      const mockCheckboxElement = $({ checkbox: true, parent: (selector: string) => {} });
      const mockCheckboxContainerElement = $({ checkboxContainer: true });
      const mockLabelElement = $({ label: true });

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockCheckboxElement
          : {};
      });

      spyOn(mockCheckboxElement, 'parent').and.callFake((selector: string): any => {
        return selector === '.checkbox-field'
          ? mockCheckboxContainerElement
          : {};
      });

      spyOn(directive, 'createLabelElement').and.returnValue(mockLabelElement);

      directive.initElements();

      expect(directive.checkboxElement).toBe(mockCheckboxElement);
      expect(directive.checkboxContainerElement).toBe(mockCheckboxContainerElement);
      expect(directive.labelElement).toBe(mockLabelElement);
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on checkbox-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const checkboxId = 'checkbox-id';
      const mockCheckboxElement = $({ checkbox: true });
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', checkboxId);

      directive.id = checkboxId;
      directive.checkboxElement = mockCheckboxElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockCheckboxElement, 'after', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const checkboxId = 'checkbox-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', checkboxId);

      const mockJQueryLabelElement = $({ jQueryLabelElement: true });

      spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
        return selector.outerHTML === mockLabelElement.outerHTML
          ? mockJQueryLabelElement
          : {};
      });

      directive.id = checkboxId;
      const jQuerylabelElement = directive.createLabelElement();

      expect(jQuerylabelElement).toBe(mockJQueryLabelElement);
    });
  });

  describe('handleProperties', () => {

    describe('checkbox not wrapped inside mz-checkbox-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockCheckboxElement = $({ checkbox: true });
        const mockCheckboxContainerElement = $({ checkboxContainer: true, length: 0 });

        directive.checkboxElement = mockCheckboxElement;
        directive.checkboxContainerElement = mockCheckboxContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-checkbox directive must be placed inside a [mz-checkbox-container] tag',
          mockCheckboxElement);
      });

      it('should not call HandlePropChanges.executePropHandlers', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockCheckboxContainerElement = $({ checkboxContainer: true, length: 0 });

        directive.checkboxContainerElement = mockCheckboxContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).not.toHaveBeenCalled();
      });
    });

    describe('checkbox wrapped inside mz-checkbox-container', () => {

      it('should call HandlePropChanges.executePropHandlers', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockCheckboxContainerElement = $({ checkboxContainer: true, length: 1 });

        directive.checkboxContainerElement = mockCheckboxContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      });
    });
  });

  describe('handleLabel', () => {

    it('should invoke text method to label element when label is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockLabelElement = $({ label: true });

      directive.labelElement = mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [label]);
    });

    it('should invoke text method when label is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockLabelElement = $({ label: true });

      directive.labelElement = mockLabelElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [undefined]);
    });
  });

  describe('handleFilledIn', () => {

    it('should add filled-in css class to checkbox element when true', () => {

      spyOn(renderer, 'setElementClass');

      const mockCheckboxElement = { checkbox: true };

      directive.checkboxElement = <any>[mockCheckboxElement];
      directive.filledIn = true;
      directive.handleFilledIn();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockCheckboxElement, 'filled-in', true);
    });

    it('should remove filled-in css class to checkbox element when false', () => {

      spyOn(renderer, 'setElementClass');

      const mockCheckboxElement = { checkbox: true };

      directive.checkboxElement = <any>[mockCheckboxElement];
      directive.filledIn = false;
      directive.handleFilledIn();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockCheckboxElement, 'filled-in', false);
    });
  });
});
