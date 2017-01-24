import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MzCheckboxDirective } from './checkbox.directive';

describe('MzCheckboxDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzCheckboxDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
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
      spyOn(directive, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(directive, 'handleProperties').and.callFake(() => callOrder.push('handleProperties'));
    });

    it('should call initElements method', () => {

      directive.ngOnInit();

      expect(directive.initElements).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initElements');
    });

    it('should call handleProperties method', () => {

      directive.ngOnInit();

      expect(directive.handleProperties).toHaveBeenCalled();
      expect(callOrder[1]).toBe('handleProperties');
    });
  });

  describe('initElements', () => {

    it('should get elements correctly', () => {

      const mockCheckboxElement = { checkbox: true, parent: (selector: string) => {} };
      const mockCheckboxContainerElement = { checkboxContainer: true };
      const mockLabelElement = { label: true };

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
      const mockCheckboxContainerElement = { checkboxContainer: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', checkboxId);

      directive.id = checkboxId;
      directive.checkboxContainerElement = <any>mockCheckboxContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockCheckboxContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const checkboxId = 'checkbox-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', checkboxId);

      const mockJQueryLabelElement = { jQueryLabelElement: true };

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

        const mockCheckboxElement = { checkbox: true };
        const mockCheckboxContainerElement = { checkboxContainer: true, length: 0 };

        directive.checkboxElement = <any>mockCheckboxElement;
        directive.checkboxContainerElement = <any>mockCheckboxContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-checkbox directive must be placed inside a [mz-checkbox-container] tag',
          mockCheckboxElement);
      });

      it('should not call handle methods', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(directive, 'handleLabel');
        spyOn(directive, 'handleFilledIn');

        const mockCheckboxContainerElement = { checkboxContainer: true, length: 0 };

        directive.checkboxContainerElement = <any>mockCheckboxContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).not.toHaveBeenCalled();
        expect(directive.handleFilledIn).not.toHaveBeenCalled();
      });
    });

    describe('checkbox wrapped inside mz-checkbox-container', () => {
      let callOrder: string[];

      beforeEach(() => {
        callOrder = [];
        spyOn(directive, 'handleLabel').and.callFake(() => callOrder.push('handleLabel'));
        spyOn(directive, 'handleFilledIn').and.callFake(() => callOrder.push('handleFilledIn'));
      });

      it('should call handle property methods in the right order', () => {

        const mockCheckboxContainerElement = { checkboxContainer: true, length: 1 };

        directive.checkboxContainerElement = <any>mockCheckboxContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).toHaveBeenCalled();
        expect(callOrder[0]).toBe('handleLabel');

        expect(directive.handleFilledIn).toHaveBeenCalled();
        expect(callOrder[1]).toBe('handleFilledIn');
      });
    });
  });

  describe('handleLabel', () => {

    it('should append text to label element when provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockCheckboxElement = { checkbox: true, val: () => null };
      const mockLabelElement = { label: true };
      const mockLabelText = document.createTextNode(label);

      directive.checkboxElement = <any>mockCheckboxElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'append', [mockLabelText]);
    });

    it('should not append label text when none is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockCheckboxElement = { checkbox: true, val: () => null };

      directive.checkboxElement = <any>mockCheckboxElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });
  });

  describe('handleFilledIn', () => {

    it('should add filled-in css class to checkbox element when true', () => {

      spyOn(renderer, 'setElementClass');

      const mockCheckboxElement = { checkbox: true, val: () => null };

      directive.checkboxElement = <any>[mockCheckboxElement];
      directive.filledIn = true;
      directive.handleFilledIn();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockCheckboxElement, 'filled-in', true);
    });

    it('should not add filled-in css class to checkbox element when false', () => {

      spyOn(renderer, 'setElementClass');

      directive.filledIn = false;
      directive.handleFilledIn();

      expect(renderer.setElementClass).not.toHaveBeenCalled();
    });
  });
});
