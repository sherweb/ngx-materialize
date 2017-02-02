import { ElementRef, Renderer } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
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

  describe('ngAfterViewInit', () => {

    it('should invoke material_select method on select element for initialization', () => {

      const mockSelectElement = { select: true, on: () => null };

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = <any>mockSelectElement;
      directive.ngAfterViewInit();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select');
    });

    it('should attach event handler for onChange on select element to emit on ngModelChange', () => {

      let onChangeHandler: Function;
      const mockSelectElement = { select: true, on: () => null };

      spyOn(mockSelectElement, 'on').and.callFake((events: string, handler: Function) => {
        onChangeHandler = handler;
      });

      spyOn(directive.ngModelChange, 'emit');

      directive.selectElement = <any>mockSelectElement;
      directive.ngAfterViewInit();

      expect(mockSelectElement.on).toHaveBeenCalledWith('change', jasmine.any(Function));

      const mockValue = 'value-x';
      const mockEvent = { target: { value: mockValue } };

      onChangeHandler(mockEvent);

      expect(directive.ngModelChange.emit).toHaveBeenCalledWith(mockValue);
    });
  });

  describe('ngOnDestroy', () => {

    it('should invoke material_select method on select element to destroy it', () => {

      const mockSelectElement = { select: true, off: () => null };

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = <any>mockSelectElement;
      directive.ngOnDestroy();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select', ['destroy']);
    });

    it('should remove event handlers on select', () => {

      const mockSelectElement = { select: true, off: () => null };

      spyOn(mockSelectElement, 'off');

      directive.selectElement = <any>mockSelectElement;
      directive.ngOnDestroy();

      expect(mockSelectElement.off).toHaveBeenCalled();
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        disabled: 'handleDisabled',
        label: 'handleLabel',
        placeholder: 'handlePlaceholder',
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

      it('should not call HandlePropChanges.executePropHandlers', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockSelectContainerElement = { selectContainer: true, length: 0 };

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).not.toHaveBeenCalled();
      });
    });

    describe('select wrapped inside mz-select-container', () => {

      it('should call HandlePropChanges.executePropHandlers', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockSelectContainerElement = { selectContainer: true, length: 1 };

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      });
    });
  });

  describe('handleDisabled', () => {

    it('should set disabled property on select element when disabled is true', () => {

      const mockSelectElement = [{ select: true }];

      spyOn(renderer, 'setElementProperty');

      directive.disabled = true;
      directive.selectElement = <any>mockSelectElement;
      directive.handleDisabled();

      expect(renderer.setElementProperty).toHaveBeenCalledWith(mockSelectElement[0], 'disabled', true);
    });

    it('should set disabled property on select element when disabled is undefined/null/false', () => {

      const mockSelectElement = [{ select: true }];

      const spySetElementProperty = spyOn(renderer, 'setElementProperty');

      [undefined, null, false].forEach(value => {

        directive.disabled = value;
        directive.selectElement = <any>mockSelectElement;
        directive.handleDisabled();

        expect(spySetElementProperty).toHaveBeenCalledWith(mockSelectElement[0], 'disabled', false);

        spySetElementProperty.calls.reset();
      });
    });

    it('should invoke material_select method on select element to reinitialize', () => {

      const mockSelectElement = [{ select: true }];

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = <any>mockSelectElement;
      directive.handleDisabled();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select');
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

    it('should not invoke text method when label is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      directive.handleLabel();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });
  });

  describe('handlePlaceholder', () => {

    describe('existing placeholder element', () => {

      const mockPlaceholderElement = [
        { placeholder: true },
      ];
      const mockSelectChildrenDisabled = {
        children: true,
        first: () => mockPlaceholderElement,
      };
      const mockSelectElement = {
        select: true,
        children: (selector: string) => {
          return selector === ':disabled'
            ? mockSelectChildrenDisabled
            : {};
        },
      };

      it('should be updated when placeholder is provided', () => {

        const spyInvokeElementMethod = spyOn(renderer, 'invokeElementMethod');

        const mockPlaceholder = 'placeholder-x';

        directive.placeholder = mockPlaceholder;
        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(spyInvokeElementMethod.calls.allArgs()).toEqual([
          [ mockPlaceholderElement, 'text', [mockPlaceholder] ], // update existing placeholder element
          [ mockSelectElement, 'material_select' ],              // reinitialize select element
        ]);
      });

      it('should be removed when placeholder is not provided or empty', () => {

        const spyInvokeElementMethod = spyOn(renderer, 'invokeElementMethod');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(spyInvokeElementMethod.calls.allArgs()).toEqual([
          [ mockPlaceholderElement, 'remove' ],     // remove existing placeholder element
          [ mockSelectElement, 'material_select' ], // reinitialize select element
        ]);
      });
    });

    describe('non existing placeholder element', () => {

      const mockSelectChildrenDisabled = {
        children: true,
        first: () => [],
      };
      const mockSelectChildrenFirst = [{ option: 'option-x' }];
      const mockSelectChildren = {
        children: true,
        first: () => mockSelectChildrenFirst,
      };
      const mockSelectElement = {
        select: true,
        children: (selector: string) => {
          switch (selector) {
            case ':disabled':
              return mockSelectChildrenDisabled;
            case undefined:
              return mockSelectChildren;
            default:
              return {};
          }
        },
      };

      it('should be inserted when placeholder is provided', () => {

        spyOn(renderer, 'invokeElementMethod');

        const mockPlaceholder = 'placeholder-x';
        const mockPlaceholderText = document.createTextNode(mockPlaceholder);
        const mockPlaceholderOption = document.createElement('option');
        mockPlaceholderOption.disabled = true;
        mockPlaceholderOption.selected = true;
        mockPlaceholderOption.appendChild(mockPlaceholderText);

        directive.selectElement = <any>mockSelectElement;
        directive.placeholder = mockPlaceholder;
        directive.handlePlaceholder();

        expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectChildrenFirst, 'before', [mockPlaceholderOption]);
      });

      it('should not be inserted when placeholder is not provided', () => {

        spyOn(renderer, 'invokeElementMethod');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
      });
    });
  });
});
