import { ElementRef, Renderer } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzInputDirective } from './input.directive';

describe('MzInputDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzInputDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzInputDirective(mockElementRef, renderer);
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
        return selector === '.input-field'
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
      mockLabelElement.for = inputId;

      directive.id = inputId;
      directive.inputContainerElement = <any>mockInputContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const inputId = 'input-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.for = inputId;

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

        expect(console.error).toHaveBeenCalledWith('Input must be placed inside an [mz-input-container] tag', mockInputElement);
      });

      it('should not call handle methods', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        const mockInputContainerElement = { inputContainer: true, length: 0 };

        spyOn(directive, 'handleLabel');
        spyOn(directive, 'handleValidate');
        spyOn(directive, 'handleDataError');
        spyOn(directive, 'handleDataSuccess');
        spyOn(directive, 'handleLength');
        spyOn(directive, 'handleAutocomplete');

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).not.toHaveBeenCalled();
        expect(directive.handleValidate).not.toHaveBeenCalled();
        expect(directive.handleDataError).not.toHaveBeenCalled();
        expect(directive.handleDataSuccess).not.toHaveBeenCalled();
        expect(directive.handleLength).not.toHaveBeenCalled();
        expect(directive.handleAutocomplete).not.toHaveBeenCalled();
      });
    });

    describe('input wrapped inside mz-input-container', () => {
      let callOrder: string[];

      beforeEach(() => {
        callOrder = [];
        spyOn(directive, 'handleLabel').and.callFake(() => callOrder.push('handleLabel'));
        spyOn(directive, 'handleValidate').and.callFake(() => callOrder.push('handleValidate'));
        spyOn(directive, 'handleDataError').and.callFake(() => callOrder.push('handleDataError'));
        spyOn(directive, 'handleDataSuccess').and.callFake(() => callOrder.push('handleDataSuccess'));
        spyOn(directive, 'handleLength').and.callFake(() => callOrder.push('handleLength'));
        spyOn(directive, 'handleAutocomplete').and.callFake(() => callOrder.push('handleAutocomplete'));
      });

      it('should call handle properties method in the right order', () => {

        const mockInputContainerElement = { inputContainer: true, length: 1 };

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).toHaveBeenCalled();
        expect(callOrder[0]).toBe('handleLabel');

        expect(directive.handleValidate).toHaveBeenCalled();
        expect(callOrder[1]).toBe('handleValidate');

        expect(directive.handleDataError).toHaveBeenCalled();
        expect(callOrder[2]).toBe('handleDataError');

        expect(directive.handleDataSuccess).toHaveBeenCalled();
        expect(callOrder[3]).toBe('handleDataSuccess');

        expect(directive.handleLength).toHaveBeenCalled();
        expect(callOrder[4]).toBe('handleLength');

        expect(directive.handleAutocomplete).toHaveBeenCalled();
        expect(callOrder[5]).toBe('handleAutocomplete');
      });
    });
  });

  describe('handleLabel', () => {

    it('should add active css class on label element when placeholder is provided', () => {

      spyOn(renderer, 'setElementClass');

      const mockLabelElement = { label: true };

      directive.placeholder = 'placeholder-x';
      directive.labelElement = <any>[mockLabelElement];
      directive.handleLabel();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    });

    it('should add active css class on label element when input element has a value', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true, val: () => 'input-value' };
      const mockLabelElement = { label: true };

      directive.inputElement = <any>mockInputElement;
      directive.labelElement = <any>[mockLabelElement];
      directive.handleLabel();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    });

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

  describe('handleValidate', () => {

    it('should add validate css class on input element when validate is true', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.validate = true;
      directive.handleValidate();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'validate', true);
    });

    it('should not add validate css class on input element when validate is false', () => {

      spyOn(renderer, 'setElementClass');

      directive.validate = false;
      directive.handleValidate();

      expect(renderer.setElementClass).not.toHaveBeenCalled();
    });
  });

  describe('handleDataError', () => {

    it('should add data-error attribute on label element when dataError is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const dataError = 'data-error-x';
      const mockLabelElement = { label: true };

      directive.labelElement = <any>[mockLabelElement];
      directive.dataError = dataError;
      directive.handleDataError();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockLabelElement, 'data-error', dataError);
    });

    it('should not add data-error attribute on label element when dataError is not provided', () => {

      spyOn(renderer, 'setElementAttribute');

      directive.handleDataError();

      expect(renderer.setElementAttribute).not.toHaveBeenCalled();
    });
  });

  describe('handleDataSuccess', () => {

    it('should add data-success attribute on label element when dataSuccess is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const dataSuccess = 'data-success-x';
      const mockLabelElement = { label: true };

      directive.labelElement = <any>[mockLabelElement];
      directive.dataSuccess = dataSuccess;
      directive.handleDataSuccess();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockLabelElement, 'data-success', dataSuccess);
    });

    it('should not add data-success attribute on label element when dataSuccess is not provided', () => {

      spyOn(renderer, 'setElementAttribute');

      directive.handleDataSuccess();

      expect(renderer.setElementAttribute).not.toHaveBeenCalled();
    });
  });

  describe('handleLength', () => {

    it('should add length attribute on input element when length is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const length = 100;
      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.length = length;
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockInputElement, 'length', length.toString());
    });

    it('should invoke characterCounter method on input element when length is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const length = 100;
      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.length = length;
      directive.handleLength();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'characterCounter');
    });

    it('should not add length attribute on input element when length is not provided', () => {

      spyOn(renderer, 'setElementAttribute');

      directive.handleLength();

      expect(renderer.setElementAttribute).not.toHaveBeenCalledWith();
    });

    it('should not invoke characterCounter method on input element when length is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      directive.handleLength();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalledWith();
    });
  });

  describe('handleAutocomplete', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

    it('should add autocomplete css class on input element when autocomplete is provided', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.autocomplete = {};
      directive.handleAutocomplete();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'autocomplete', true);
    });

    it('should invoke autocomplete method on input element when autocomplete is provided', fakeAsync(() => {

      spyOn(renderer, 'invokeElementMethod');

      const autocomplete = {
        data: {
          Apple: null,
          Microsoft: null,
          Google: 'http://some-image.png',
        },
      };
      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.autocomplete = autocomplete;
      directive.handleAutocomplete();

      forceSetTimeoutEnd();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'autocomplete', [autocomplete]);
    }));

    it('should not add autocomplete css class on input element when autocomplete is not provided', () => {

      spyOn(renderer, 'setElementClass');

      directive.handleAutocomplete();

      expect(renderer.setElementClass).not.toHaveBeenCalled();
    });

    it('should not invoke autocomplete method on input element when autocomplete is not provided', fakeAsync(() => {

      spyOn(renderer, 'invokeElementMethod');

      directive.handleAutocomplete();

      forceSetTimeoutEnd();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    }));
  });
});
