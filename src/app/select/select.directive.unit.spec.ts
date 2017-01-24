import { ElementRef, Renderer } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { MzSelectDirective } from './select.directive';

describe('MzSelectDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzSelectDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzSelectDirective(mockElementRef, renderer);
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

  describe('ngAfterViewInit', () => {

    it('should invoke material_select method on select element for initialization', () => {

      const mockSelectElement = { select: true };

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = mockSelectElement;
      directive.ngAfterViewInit();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select');
    });
  });

  describe('ngOnDestroy', () => {

    it('should invoke material_select method on select element to destroy it', () => {

      const mockSelectElement = { select: true };

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = mockSelectElement;
      directive.ngOnDestroy();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select', ['destroy']);
    });
  });

  describe('initElements', () => {

    it('should get elements correctly', () => {

      const mockSelectElement = { select: true, parent: (selector: string) => {} };
      const mockSelectContainerElement = { selectContainer: true };
      const mockLabelElement = { label: true };

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockSelectElement
          : {};
      });

      spyOn(mockSelectElement, 'parent').and.callFake((selector: string): any => {
        return selector === '.input-field'
          ? mockSelectContainerElement
          : {};
      });

      spyOn(directive, 'createLabelElement').and.returnValue(mockLabelElement);

      directive.initElements();

      expect(directive.selectElement).toBe(mockSelectElement);
      expect(directive.selectContainerElement).toBe(mockSelectContainerElement);
      expect(directive.labelElement).toBe(mockLabelElement);
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on select-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockSelectContainerElement = { selectContainer: true };
      const mockLabelElement = document.createElement('label');

      directive.selectContainerElement = <any>mockSelectContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const mockLabelElement = document.createElement('label');

      const mockJQueryLabelElement = { jQueryLabelElement: true };

      spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
        return selector.outerHTML === mockLabelElement.outerHTML
          ? mockJQueryLabelElement
          : {};
      });

      const jQuerylabelElement = directive.createLabelElement();

      expect(jQuerylabelElement).toBe(mockJQueryLabelElement);
    });
  });

  describe('handleProperties', () => {

    describe('select not wrapped inside mz-select-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockSelectElement = { select: true };
        const mockSelectContainerElement = { selectContainer: true, length: 0 };

        directive.selectElement = <any>mockSelectElement;
        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Select with mz-select directive must be place inside a [mz-select-container] tag',
          mockSelectElement);
      });

      it('should not call handle methods', () => {

        const mockSelectContainerElement = { selectContainer: true, length: 0 };

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(directive, 'handleLabel');
        spyOn(directive, 'handlePlaceholder');

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).not.toHaveBeenCalled();
        expect(directive.handlePlaceholder).not.toHaveBeenCalled();
      });
    });

    describe('select wrapped inside mz-select-container', () => {
      let callOrder: string[];

      beforeEach(() => {
        callOrder = [];
        spyOn(directive, 'handleLabel').and.callFake(() => callOrder.push('handleLabel'));
        spyOn(directive, 'handlePlaceholder').and.callFake(() => callOrder.push('handlePlaceholder'));
      });

      it('should call handle properties method in the right order', () => {

        const mockSelectContainerElement = { selectContainer: true, length: 1 };

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.handleProperties();

        expect(directive.handleLabel).toHaveBeenCalled();
        expect(callOrder[0]).toBe('handleLabel');

        expect(directive.handlePlaceholder).toHaveBeenCalled();
        expect(callOrder[1]).toBe('handlePlaceholder');
      });
    });
  });

  describe('handleLabel', () => {

    it('should append text to label element when provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockSelectElement = { select: true };
      const mockLabelElement = { label: true };
      const mockLabelText = document.createTextNode(label);

      directive.selectElement = <any>mockSelectElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'append', [mockLabelText]);
    });

    it('should not append label text when none is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockSelectElement = { select: true };

      directive.selectElement = <any>mockSelectElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });
  });

  describe('handlePlaceholder', () => {

    it('should insert placeholder when provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const placeholder = 'placeholder-x';
      const mockSelectFirstChildrenElement = { firstChildren: true };
      const mockSelectChildrenElement = { first: () => mockSelectFirstChildrenElement };
      const mockSelectElement = { select: true, children: () => mockSelectChildrenElement };
      const mockPlaceholderText = document.createTextNode(placeholder);
      const mockPlaceholderOption = document.createElement('option');
      mockPlaceholderOption.disabled = true;
      mockPlaceholderOption.selected = true;
      mockPlaceholderOption.append(mockPlaceholderText);

      directive.selectElement = <any>mockSelectElement;
      directive.placeholder = placeholder;
      directive.handlePlaceholder();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectFirstChildrenElement, 'before', [mockPlaceholderOption]);
    });

    it('should not insert placeholder when none is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      directive.handlePlaceholder();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });
  });
});
