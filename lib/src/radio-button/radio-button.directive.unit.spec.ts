import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzRadioButtonDirective } from './radio-button.directive';

describe('MzRadioButtonDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzRadioButtonDirective;
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
    directive = new MzRadioButtonDirective(mockElementRef, renderer);
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
        label: 'handleLabel',
        withGap: 'handleWithGap',
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

      const mockInputElement = $({ input: true, parent: (selector: string) => {} });
      const mockInputContainerElement = $({ inputContainer: true });
      const mockLabelElement = $({ label: true });

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockInputElement
          : {};
      });

      spyOn(mockInputElement, 'parent').and.callFake((selector: string): any => {
        return selector === '.radio-button-field'
          ? mockInputContainerElement
          : {};
      });

      spyOn(directive, 'createLabelElement').and.returnValue(mockLabelElement);

      directive.initElements();

      expect(directive.inputElement).toBe(mockInputElement);
      expect(directive.inputContainerElement).toBe(mockInputContainerElement);
      expect(directive.labelElement).toBe(mockLabelElement);
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on input-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const inputId = 'input-id';
      const mockRadioInputElement = $({ input: true });
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', inputId);

      directive.id = inputId;
      directive.inputElement = mockRadioInputElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockRadioInputElement, 'after', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const inputId = 'input-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', inputId);

      const mockJQueryLabelElement = $({ jQueryLabelElement: true });

      spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
        return selector.outerHTML === mockLabelElement.outerHTML
          ? mockJQueryLabelElement
          : {};
      });

      directive.id = inputId;
      const jQuerylabelElement = directive.createLabelElement();

      expect(jQuerylabelElement).toBe(mockJQueryLabelElement);
    });
  });

  describe('handleProperties', () => {

    describe('radio-button not wrapped inside mz-radio-button-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockInputElement = $({ input: true });
        const mockInputContainerElement = $({ inputContainer: true, length: 0 });

        directive.inputElement = mockInputElement;
        directive.inputContainerElement = mockInputContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Radio Button must be placed inside a [mz-radio-button-container] tag',
          mockInputElement);
      });

      it('should not call HandlePropChanges.executePropHandlers', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockInputContainerElement = { inputContainer: true, length: 0 };

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).not.toHaveBeenCalled();
      });
    });

    describe('radio-button wrapped inside mz-radio-button-container', () => {

      it('should call HandlePropChanges.executePropHandlers', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockInputContainerElement = { inputContainer: true, length: 1 };

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      });
    });
  });

  describe('handleLabel', () => {

    it('should invoke text method to label element when label is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockLabelElement = { label: true };

      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [label]);
    });

    it('should invoke text method when label is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockLabelElement = { label: true };

      directive.labelElement = <any>mockLabelElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [undefined]);
    });
  });

  describe('handleWithGap', () => {

    it('should add with-gap css class on input element when withGap is true', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.withGap = true;
      directive.handleWithGap();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'with-gap', true);
    });

    it('should not add with-gap css class on input element when withGap is false', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.withGap = false;
      directive.handleWithGap();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'with-gap', false);
    });
  });
});
