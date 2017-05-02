import { ChangeDetectorRef, ElementRef, Renderer } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { MzSelectDirective } from './select.directive';

describe('MzSelectDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let changeDetectorRef: ChangeDetectorRef;
  let directive: MzSelectDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeDetectorRef, Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    changeDetectorRef = TestBed.get(ChangeDetectorRef);
    directive = new MzSelectDirective(mockElementRef, renderer, changeDetectorRef);
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
     const value = 'value';
     const mockSelectElement = { select: true, on: () => null, val: () => value };

    beforeEach(() => {
      directive.selectElement = <any>mockSelectElement;
      spyOn(directive, 'initOnChange');
      spyOn(directive, 'listenOptionChanges');
      spyOn(directive, 'initMultiple');
      spyOn(directive, 'initFilledIn');
    });

    it('should invoke material_select method on select element for initialization', () => {
      spyOn(renderer, 'invokeElementMethod');

      directive.ngAfterViewInit();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select');
    });

    it('should call initOnChange', () => {
      directive.ngAfterViewInit();

      expect(directive.initFilledIn).toHaveBeenCalled();
    });

    it('should call listenOptionChanges', () => {
      directive.ngAfterViewInit();

      expect(directive.listenOptionChanges).toHaveBeenCalled();
    });

    it('should call initMultiple', () => {
      directive.ngAfterViewInit();

      expect(directive.initMultiple).toHaveBeenCalled();
    });

    it('should call initFilledIn', () => {
      directive.ngAfterViewInit();

      expect(directive.initFilledIn).toHaveBeenCalled();
    });
  });

  describe('initFilledIn', () => {

    it('should initialize FilledIn handler and call handler once', () => {
      const mockSelectContainerElement = { find: () => null };
      directive.selectContainerElement = <any>mockSelectContainerElement;

      spyOn(directive, 'handleFilledIn');

      directive.initHandlers();
      directive.initFilledIn();

      directive.handlers['filledIn']();

      // Once from initFilledIn and once from the handlers test call
      expect(directive['handleFilledIn']).toHaveBeenCalledTimes(2);
    });
  });

  describe('initMultiple', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

    function createOption(value: string, selected: boolean) {
      const option = document.createElement('option');
      option.selected = selected;
      option.value = value;
      return option;
    }

    it('should set selected values through setTimeout when select is multiple', fakeAsync(() => {

      const mockSelect = document.createElement('select');
      mockSelect.multiple = true;

      const option1 = createOption('option-1', false);
      const option2 = createOption('option-2', true);
      const option3 = createOption('option-3', true);

      mockSelect.appendChild(option1);
      mockSelect.appendChild(option2);
      mockSelect.appendChild(option3);

      directive.selectElement = $(mockSelect);

      spyOn(directive.selectElement, 'val');

      directive.initMultiple();

      forceSetTimeoutEnd();

      expect(directive.selectElement.val).toHaveBeenCalledWith([option2.value, option3.value]);
    }));

    it('should not set selected values when select is not multiple', fakeAsync(() => {

      const mockSelect = document.createElement('select');
      mockSelect.appendChild(createOption('option-1', false));
      mockSelect.appendChild(createOption('option-2', false));
      mockSelect.appendChild(createOption('option-3', true));

      directive.selectElement = $(mockSelect);

      spyOn(directive.selectElement, 'val');

      directive.initMultiple();

      forceSetTimeoutEnd();

      expect(directive.selectElement.val).not.toHaveBeenCalled();
    }));

    it('should set lastOptions', () => {
      const mockSelect = document.createElement('select');
      mockSelect.multiple = true;
      mockSelect.appendChild(createOption('option-1', false));
      mockSelect.appendChild(createOption('option-2', false));
      mockSelect.appendChild(createOption('option-3', true));

      directive.selectElement = $(mockSelect);

      expect(directive.lastOptions).toBe(undefined);

      directive.initMultiple();

      expect(directive.lastOptions).toEqual(Array.from(directive.selectElement[0].children));
    });
  });

  describe('initOnChange', () => {

    beforeEach(() => {
      const mockSelect = document
        .createElement('select')
        .appendChild(document.createElement('option'));

      directive.selectElement = $(mockSelect);
    });

    it('should register a change event', () => {
      spyOn(directive.selectElement, 'on');

      directive.initOnChange();

      expect(directive.selectElement.on).toHaveBeenCalledWith('change', jasmine.any(Function));
    });

    it('should suspend propagation after a change event', () => {
      spyOn(directive.selectElement, 'on').and.callFake((eventName, callback) => {
        const mockEvent = { target: { value: null } };
        callback(mockEvent);
      });

      expect(directive.suspend).toBe(false);

      directive.initOnChange();

      expect(directive.suspend).toBe(true);
    });

    it('should dispatch change event on native select', () => {
      const onChange = jasmine.createSpy('onChange');

      directive.selectElement[0].addEventListener('change', onChange);

      spyOn(renderer, 'invokeElementMethod').and.callFake((element, method, params) => {
        element[method](...params);
      });

      spyOn(directive.selectElement, 'on').and.callFake((eventName, callback) => {
        const mockEvent = { target: { value: null } };
        callback(mockEvent);
      });

      directive.initOnChange();

      expect(onChange).toHaveBeenCalled();
    });

    it('should not dispatch event if suspend is true', () => {
      directive.suspend = true;

      const onChange = jasmine.createSpy('onChange');

      directive.selectElement[0].addEventListener('change', onChange);

      spyOn(renderer, 'invokeElementMethod').and.callFake((element, method, params) => {
        element[method](...params);
      });

      spyOn(directive.selectElement, 'on').and.callFake((eventName, callback) => {
        const mockEvent = { target: { value: null } };
        callback(mockEvent);
      });

      directive.initOnChange();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should register a change event on select to stop propagation', () => {
      spyOn(directive.selectElement[0], 'addEventListener');

      directive.initOnChange();

      expect(directive.selectElement[0].addEventListener).toHaveBeenCalledWith('change', jasmine.any(Function));
    });

    it('should stop propagation on select change', () => {
      let onChangeCallback: Function;

      spyOn(directive.selectElement[0], 'addEventListener').and.callFake((eventName, callback: Function) => {
        onChangeCallback = callback;
      });

      directive.suspend = true;

      directive.initOnChange();
      onChangeCallback();

      expect(directive.suspend).toBe(false);
    });
  });

  describe('handleFilledIn', () => {

    it('should add filled-in class when filledIn property is set', () => {
      const element1 = {};
      const element2 = {};
      const mockCheckboxElements = { length: 2, toArray: () => [ element1, element2] };
      directive.checkboxElements = <any>mockCheckboxElements;
      directive.filledIn = true;

      spyOn(renderer, 'setElementClass');

      directive.handleFilledIn();

      expect(renderer['setElementClass']).toHaveBeenCalledWith(element1, 'filled-in', true);
      expect(renderer['setElementClass']).toHaveBeenCalledWith(element2, 'filled-in', true);
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

      const mockSelectElement = { select: true, parents: (selector: string) => {} };
      const mockSelectContainerElement = { selectContainer: true };
      const mockLabelElement = { label: true };

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockSelectElement
          : {};
      });

      spyOn(mockSelectElement, 'parents').and.callFake((selector: string): any => {
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

      const selectId = 'select-id';
      const mockSelectContainerElement = { selectContainer: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', selectId);

      directive.id = selectId;
      directive.selectContainerElement = <any>mockSelectContainerElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectContainerElement, 'append', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const selectId = 'select-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', selectId);

      const mockJQueryLabelElement = { jQueryLabelElement: true };

      spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
        return selector.outerHTML === mockLabelElement.outerHTML
          ? mockJQueryLabelElement
          : {};
      });

      directive.id = selectId;
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
        const mockSelectElement = { children: () => $({ length: 0 }) };

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.selectElement = <any>mockSelectElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      });

      it('should call selectFirstOption', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');
        spyOn(directive, 'selectFirstOption');

        const mockSelectContainerElement = { selectContainer: true, length: 1 };
        const mockSelectElement = { children: () => $({ length: 0 }) };

        directive.selectContainerElement = <any>mockSelectContainerElement;
        directive.selectElement = <any>mockSelectElement;
        directive.handleProperties();

        expect(directive.selectFirstOption).toHaveBeenCalled();
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
        spyOn(changeDetectorRef, 'detectChanges');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(spyInvokeElementMethod.calls.allArgs()).toEqual([
          [ mockPlaceholderElement, 'remove' ],     // remove existing placeholder element
          [ mockSelectElement, 'change' ], // force trigger change event
          [ mockSelectElement, 'material_select' ], // reinitialize select element
        ]);
        expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
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

        const spy = spyOn(renderer, 'invokeElementMethod');

        const mockPlaceholder = 'placeholder-x';
        const mockPlaceholderText = document.createTextNode(mockPlaceholder);
        const mockPlaceholderOption = document.createElement('option');
        mockPlaceholderOption.disabled = true;
        mockPlaceholderOption.appendChild(mockPlaceholderText);

        directive.selectElement = <any>mockSelectElement;
        directive.placeholder = mockPlaceholder;
        directive.handlePlaceholder();

        expect(spy.calls.allArgs()).toEqual([
          [ mockSelectElement, 'prepend', [mockPlaceholderOption] ],     // add placeholder element
          [ mockSelectElement, 'material_select' ], // reinitialize select element
        ]);
      });

      it('should not be inserted when placeholder is not provided', () => {

        spyOn(renderer, 'invokeElementMethod');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(renderer.invokeElementMethod).not.toHaveBeenCalledWith(jasmine.any(Object), 'before', jasmine.any(Array));
      });
    });

    describe('selectFirstOption', () => {

      it('should set the selected attribute of the first option to true', () => {
        const mockSelect = document.createElement('select');
        const mockOption = document.createElement('option');
        mockSelect.appendChild(mockOption);

        spyOn(mockOption, 'setAttribute');

        directive.selectElement = $(mockSelect);
        directive.selectFirstOption();

        expect(mockOption.setAttribute).toHaveBeenCalledWith('selected', 'true');
      });

      it('should not set the selected attribute of the first option to true if an option is already selected', () => {
        const mockSelect = document.createElement('select');
        const mockOption = document.createElement('option');
        mockOption.setAttribute('selected', 'true');
        mockSelect.appendChild(mockOption);

        spyOn(mockOption, 'setAttribute');

        directive.selectElement = $(mockSelect);
        directive.selectFirstOption();

        expect(mockOption.setAttribute).not.toHaveBeenCalled();
      });

      it('should not set the selected attribute of the first option to true if the select is multiple', () => {
        const mockSelect = document.createElement('select');
        mockSelect.setAttribute('multiple', 'true');
        const mockOption = document.createElement('option');
        mockSelect.appendChild(mockOption);

        spyOn(mockOption, 'setAttribute');

        directive.selectElement = $(mockSelect);
        directive.selectFirstOption();

        expect(mockOption.setAttribute).not.toHaveBeenCalled();
      });
    });
  });
});
