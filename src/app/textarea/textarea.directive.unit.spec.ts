import { ElementRef, Renderer } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MzTextareaDirective } from './textarea.directive';

describe('MzTextareaDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzTextareaDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzTextareaDirective(mockElementRef, renderer);
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

      const mockTextareaElement = { textarea: true, parent: (selector: string) => {} };
      const mockTextareaContainerElement = { textareaContainer: true };
      const mockLabelElement = { label: true };

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockTextareaElement
          : {};
      });

      spyOn(mockTextareaElement, 'parent').and.callFake((selector: string): any => {
        return selector === '.input-field'
          ? mockTextareaContainerElement
          : {};
      });

      spyOn(directive, 'createLabelElement').and.returnValue(mockLabelElement);

      directive.initElements();

      expect(directive.textareaElement).toBe(mockTextareaElement);
      expect(directive.textareaContainerElement).toBe(mockTextareaContainerElement);
      expect(directive.labelElement).toBe(mockLabelElement);
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on input-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const textareaId = 'textarea-id';
      const mockTextareaContainerElement = { textareaContainer: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', textareaId);

      directive.id = textareaId;
      directive.textareaContainerElement = <any>mockTextareaContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const textareaId = 'textarea-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', textareaId);

      const mockJQueryLabelElement = { jQueryLabelElement: true };

      spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
        return selector.outerHTML === mockLabelElement.outerHTML
          ? mockJQueryLabelElement
          : {};
      });

      directive.id = textareaId;
      const jQuerylabelElement = directive.createLabelElement();

      expect(jQuerylabelElement).toBe(mockJQueryLabelElement);
    });
  });

  describe('handleProperties', () => {

    describe('input not wrapped inside mz-textarea-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockTextareaElement = { textarea: true };
        const mockTextareaContainerElement = { textareaContainer: true, length: 0 };

        directive.textareaElement = <any>mockTextareaElement;
        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith('Textarea must be placed inside a [mz-textarea-container] tag', mockTextareaElement);
      });

      it('should not call handle methods', () => {

        const mockTextareaContainerElement = { textareaContainer: true, length: 0 };

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(directive, 'handleTextarea');
        spyOn(directive, 'handleLabel');
        spyOn(directive, 'handleLength');

        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(directive.handleTextarea).not.toHaveBeenCalled();
        expect(directive.handleLabel).not.toHaveBeenCalled();
        expect(directive.handleLength).not.toHaveBeenCalled();
      });
    });

    describe('input wrapped inside mz-textarea-container', () => {
      let callOrder: string[];

      beforeEach(() => {
        callOrder = [];
        spyOn(directive, 'handleTextarea').and.callFake(() => callOrder.push('handleTextarea'));
        spyOn(directive, 'handleLabel').and.callFake(() => callOrder.push('handleLabel'));
        spyOn(directive, 'handleLength').and.callFake(() => callOrder.push('handleLength'));
      });

      it('should call handle properties method in the right order', () => {

        const mockTextareaContainerElement = { textareaContainer: true, length: 1 };

        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(directive.handleTextarea).toHaveBeenCalled();
        expect(callOrder[0]).toBe('handleTextarea');

        expect(directive.handleLabel).toHaveBeenCalled();
        expect(callOrder[1]).toBe('handleLabel');

        expect(directive.handleLength).toHaveBeenCalled();
        expect(callOrder[2]).toBe('handleLength');
      });
    });
  });

  describe('handleTextarea', () => {

    it('should add materialize-textarea css class on textarea element', () => {

      spyOn(renderer, 'setElementClass');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.handleTextarea();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockTextareaElement, 'materialize-textarea', true);
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

      const mockTextareaElement = { textarea: true, val: () => 'input-value' };
      const mockLabelElement = { label: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.labelElement = <any>[mockLabelElement];
      directive.handleLabel();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    });

    it('should append text to label element when provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockTextareaElement = { textarea: true, val: () => null };
      const mockLabelElement = { label: true };
      const mockLabelText = document.createTextNode(label);

      directive.textareaElement = <any>mockTextareaElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'append', [mockLabelText]);
    });

    it('should not append label text when none is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockTextareaElement = { textarea: true, val: () => null };

      directive.textareaElement = <any>mockTextareaElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });
  });

  describe('handleLength', () => {

    it('should add length attribute on input element when length is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const length = 100;
      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.length = length;
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockTextareaElement, 'length', length.toString());
    });

    it('should invoke characterCounter method on input element when length is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const length = 100;
      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.length = length;
      directive.handleLength();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaElement, 'characterCounter');
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
});
