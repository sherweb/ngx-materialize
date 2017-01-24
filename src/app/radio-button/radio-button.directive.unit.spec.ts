import { ElementRef, Renderer } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzRadioButtonDirective } from './radio-button.directive';

describe('MzRadioButtonDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzRadioButtonDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
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

      const mockInputElement = { input: true, parent: (selector: string) => {} };
      const mockInputContainerElement = { inputContainer: true };
      const mockLabelElement = { label: true };

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
      const mockInputContainerElement = { inputContainer: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', inputId);

      directive.id = inputId;
      directive.inputContainerElement = <any>mockInputContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const inputId = 'input-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', inputId);

      const mockJQueryLabelElement = { jQueryLabelElement: true };

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

    describe('input not wrapped inside mz-input-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockInputElement = { input: true };
        const mockInputContainerElement = { inputContainer: true, length: 0 };

        directive.inputElement = <any>mockInputElement;
        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Radio Button must be placed inside a [mz-radio-button-container] tag',
          mockInputElement);
      });

      it('should not call handle methods', () => {

        const mockInputContainerElement = { inputContainer: true, length: 0 };

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(directive, 'handleLabel');
        spyOn(directive, 'handleWithGap');

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).not.toHaveBeenCalled();
        expect(directive.handleWithGap).not.toHaveBeenCalled();
      });
    });

    describe('input wrapped inside mz-input-container', () => {
      let callOrder: string[];

      beforeEach(() => {
        callOrder = [];
        spyOn(directive, 'handleLabel').and.callFake(() => callOrder.push('handleLabel'));
        spyOn(directive, 'handleWithGap').and.callFake(() => callOrder.push('handleWithGap'));
      });

      it('should call handle properties method in the right order', () => {

        const mockInputContainerElement = { inputContainer: true, length: 1 };

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).toHaveBeenCalled();
        expect(callOrder[0]).toBe('handleLabel');

        expect(directive.handleWithGap).toHaveBeenCalled();
        expect(callOrder[1]).toBe('handleWithGap');
      });
    });
  });

  describe('handleLabel', () => {

    it('should append text to label element when provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockInputElement = { input: true, val: () => null };
      const mockLabelElement = { label: true };
      const mockLabelText = document.createTextNode(label);

      directive.inputElement = <any>mockInputElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'append', [mockLabelText]);
    });

    it('should not append label text when none is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true, val: () => null };

      directive.inputElement = <any>mockInputElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
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

      directive.withGap = false;
      directive.handleWithGap();

      expect(renderer.setElementClass).not.toHaveBeenCalled();
    });
  });
});
