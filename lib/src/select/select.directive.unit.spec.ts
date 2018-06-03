import { ChangeDetectorRef, ElementRef, Renderer } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { MockChangeDetectorRef, mockRenderer } from '../shared/test-wrapper/mocks';
import { MzSelectDirective } from './select.directive';

describe('MzSelectDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let changeDetectorRef: ChangeDetectorRef;
  let directive: MzSelectDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
        { provide: Renderer, useValue: mockRenderer },
      ],
    });
  });

  beforeEach(() => {
    changeDetectorRef = TestBed.get(ChangeDetectorRef);
    renderer = TestBed.get(Renderer);
    directive = new MzSelectDirective(mockElementRef, changeDetectorRef, renderer);
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(directive, 'initOnChange').and.callFake(() => callOrder.push('initOnChange'));
      spyOn(directive, 'handleProperties').and.callFake(() => callOrder.push('handleProperties'));
      spyOn(directive, 'initSelectedOption').and.callFake(() => callOrder.push('initSelectedOption'));
      spyOn(directive, 'initMaterialSelect').and.callFake(() => callOrder.push('initMaterialSelect'));
      spyOn(directive, 'listenOptionChanges').and.callFake(() => callOrder.push('listenOptionChanges'));
      spyOn(directive, 'initFilledIn').and.callFake(() => callOrder.push('initFilledIn'));
      spyOn(directive, 'handleDOMEvents').and.callFake(() => callOrder.push('handleDOMEvents'));
    });

    it('should call methods', () => {
      directive.ngOnInit();

      expect(directive.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');

      expect(directive.initElements).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initElements');

      expect(directive.initOnChange).toHaveBeenCalled();
      expect(callOrder[2]).toBe('initOnChange');

      expect(directive.handleProperties).toHaveBeenCalled();
      expect(callOrder[3]).toBe('handleProperties');

      expect(directive.initSelectedOption).toHaveBeenCalled();
      expect(callOrder[4]).toBe('initSelectedOption');

      expect(directive.initMaterialSelect).toHaveBeenCalled();
      expect(callOrder[5]).toBe('initMaterialSelect');

      expect(directive.listenOptionChanges).toHaveBeenCalled();
      expect(callOrder[6]).toBe('listenOptionChanges');

      expect(directive.initFilledIn).toHaveBeenCalled();
      expect(callOrder[7]).toBe('initFilledIn');

      expect(directive.handleDOMEvents).toHaveBeenCalled();
      expect(callOrder[8]).toBe('handleDOMEvents');
    });
  });

  describe('initMaterialSelect', () => {

    it('should call material_select method', () => {
      const mockSelect = document.createElement('select');

      spyOn(renderer, 'invokeElementMethod');

      directive.selectElement = $(mockSelect);
      directive.initMaterialSelect();

      // Once from initFilledIn and once from the handlers test call
      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(directive.selectElement, 'material_select');
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
      const mockCheckboxElements = { length: 2, toArray: () => [element1, element2] };
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

      directive.mutationObserver = new MutationObserver(() => { });
      directive.selectElement = <any>mockSelectElement;
      directive.ngOnDestroy();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'material_select', ['destroy']);
    });

    it('should remove event handlers on select', () => {

      const mockSelectElement = { select: true, off: () => null };

      spyOn(mockSelectElement, 'off');

      directive.mutationObserver = new MutationObserver(() => { });
      directive.selectElement = <any>mockSelectElement;
      directive.ngOnDestroy();

      expect(mockSelectElement.off).toHaveBeenCalled();
    });

    it('should disconnect mutation observer on select', () => {
      const mockSelectElement = { select: true, off: () => null };

      directive.mutationObserver = new MutationObserver(() => { });
      directive.selectElement = <any>mockSelectElement;

      spyOn(directive.mutationObserver, 'disconnect');

      directive.ngOnDestroy();

      expect(directive.mutationObserver.disconnect).toHaveBeenCalled();
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

      const mockSelectElement = $({ select: true, parents: (selector: string) => { } });
      const mockSelectContainerElement = $({ selectContainer: true });
      const mockLabelElement = $({ label: true });

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
      const mockSelectElement = { select: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', selectId);

      directive.id = selectId;
      directive.selectElement = <any>mockSelectElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockSelectElement, 'after', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const selectId = 'select-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', selectId);

      const mockJQueryLabelElement = $({ jQueryLabelElement: true });

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

        const mockSelectElement = $({ select: true });
        const mockSelectContainerElement = $({ selectContainer: true, length: 0 });

        directive.selectElement = mockSelectElement;
        directive.selectContainerElement = mockSelectContainerElement;
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
    });
  });

  describe('handleDisabled', () => {

    it('should not set disabled property or reinitialize select element when disabled is undefined/null', () => {

      const mockSelectElement = [{ select: true }];

      const spySetElementProperty = spyOn(renderer, 'setElementProperty');
      const spyInvokeElementMethod = spyOn(renderer, 'invokeElementMethod');

      [undefined, null].forEach(value => {

        directive.disabled = value;
        directive.selectElement = <any>mockSelectElement;
        directive.handleDisabled();

        expect(spySetElementProperty).not.toHaveBeenCalled();
        expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
      });
    });

    it('should set disabled property and reinitialize select element when disabled is true', () => {

      const mockSelectElement = [{ select: true }];

      spyOn(renderer, 'setElementProperty');
      spyOn(directive, 'initMaterialSelect');
      spyOn(directive, 'handleDOMEvents');

      directive.disabled = true;
      directive.selectElement = <any>mockSelectElement;
      directive.handleDisabled();

      expect(renderer.setElementProperty).toHaveBeenCalledWith(mockSelectElement[0], 'disabled', true);
      expect(directive.initMaterialSelect).toHaveBeenCalled();
    });

    it('should set disabled property and reinitialize select element when disabled is false', () => {

      const mockSelectElement = [{ select: true }];

      spyOn(renderer, 'setElementProperty');
      spyOn(directive, 'initMaterialSelect');
      spyOn(directive, 'handleDOMEvents');

      directive.disabled = false;
      directive.selectElement = <any>mockSelectElement;
      directive.handleDisabled();

      expect(renderer.setElementProperty).toHaveBeenCalledWith(mockSelectElement[0], 'disabled', false);
      expect(directive.initMaterialSelect).toHaveBeenCalled();
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
        spyOn(directive, 'initMaterialSelect');

        const mockPlaceholder = 'placeholder-x';

        directive.placeholder = mockPlaceholder;
        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(spyInvokeElementMethod.calls.allArgs()).toEqual([
          [mockPlaceholderElement, 'text', [mockPlaceholder]], // update existing placeholder element
        ]);
        expect(directive.initMaterialSelect).toHaveBeenCalled();
      });

      it('should be removed when placeholder is not provided or empty', () => {

        const spyInvokeElementMethod = spyOn(renderer, 'invokeElementMethod');
        spyOn(changeDetectorRef, 'detectChanges');
        spyOn(directive, 'initMaterialSelect');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(spyInvokeElementMethod.calls.allArgs()).toEqual([
          [mockPlaceholderElement, 'remove'],     // remove existing placeholder element
          [mockSelectElement, 'change'], // force trigger change event
        ]);
        expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
        expect(directive.initMaterialSelect).toHaveBeenCalled();
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
        spyOn(directive, 'initMaterialSelect');

        const mockPlaceholder = 'placeholder-x';
        const mockPlaceholderText = document.createTextNode(mockPlaceholder);
        const mockPlaceholderOption = document.createElement('option');
        mockPlaceholderOption.disabled = true;
        mockPlaceholderOption.value = null;
        mockPlaceholderOption.appendChild(mockPlaceholderText);

        directive.selectElement = <any>mockSelectElement;
        directive.placeholder = mockPlaceholder;
        directive.handlePlaceholder();

        expect(spy.calls.allArgs()).toEqual([
          [mockSelectElement, 'prepend', [mockPlaceholderOption]],     // add placeholder element
        ]);
        expect(directive.initMaterialSelect).toHaveBeenCalled();
      });

      it('should not be inserted when placeholder is not provided', () => {

        spyOn(renderer, 'invokeElementMethod');

        directive.selectElement = <any>mockSelectElement;
        directive.handlePlaceholder();

        expect(renderer.invokeElementMethod).not.toHaveBeenCalledWith(jasmine.any(Object), 'before', jasmine.any(Array));
      });
    });

    describe('initSelectedOption', () => {

      it('should set the selected attribute/property of the first option to true', () => {
        const mockSelect = document.createElement('select');
        const mockOption = document.createElement('option');
        mockSelect.appendChild(mockOption);

        spyOn(renderer, 'setElementAttribute');

        directive.selectElement = $(mockSelect);
        directive.initSelectedOption();

        expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockOption, 'selected', '');
      });

      it('should not set the selected attribute/property of the first option to true if an option is already selected', () => {
        const mockSelect = document.createElement('select');
        const mockOption = document.createElement('option');
        mockOption.setAttribute('selected', 'true');
        mockSelect.appendChild(mockOption);

        spyOn(renderer, 'setElementAttribute');

        directive.selectElement = $(mockSelect);
        directive.initSelectedOption();

        expect(renderer.setElementAttribute).not.toHaveBeenCalled();
      });

      it('should not set the selected attribute/property of the first option to true if the select is multiple', () => {
        const mockSelect = document.createElement('select');
        mockSelect.setAttribute('multiple', 'true');
        const mockOption = document.createElement('option');
        mockSelect.appendChild(mockOption);

        spyOn(renderer, 'setElementAttribute');

        directive.selectElement = $(mockSelect);
        directive.initSelectedOption();

        expect(renderer.setElementAttribute).not.toHaveBeenCalled();
      });
    });

    describe('updateMaterialSelect', () => {

      it('should reinitialize select correctly when filledIn is false/null/undefined', fakeAsync(() => {
        const spyInitMaterialSelect = spyOn(directive, 'initMaterialSelect');
        const spyInitFilledIn = spyOn(directive, 'initFilledIn');
        const spyHandleDomEvents = spyOn(directive, 'handleDOMEvents');
        const spyUpdateEmit = spyOn(directive.update, 'emit');

        [false, null, undefined].forEach(filledIn => {
          spyInitMaterialSelect.calls.reset();
          spyInitFilledIn.calls.reset();
          spyHandleDomEvents.calls.reset();
          spyUpdateEmit.calls.reset();

          directive.filledIn = filledIn;
          directive.updateMaterialSelect();

          expect(spyInitMaterialSelect).toHaveBeenCalled();
          expect(spyInitFilledIn).not.toHaveBeenCalled();
          expect(spyHandleDomEvents).toHaveBeenCalled();
          expect(spyUpdateEmit).not.toHaveBeenCalled();

          tick();

          expect(spyUpdateEmit).toHaveBeenCalled();
        });
      }));

      it('should reinitialize select correctly when filledIn is true', fakeAsync(() => {
        spyOn(directive, 'initMaterialSelect');
        spyOn(directive, 'initFilledIn');
        spyOn(directive, 'handleDOMEvents');
        spyOn(directive.update, 'emit');

        directive.filledIn = true;
        directive.updateMaterialSelect();

        expect(directive.initMaterialSelect).toHaveBeenCalled();
        expect(directive.initFilledIn).toHaveBeenCalled();
        expect(directive.handleDOMEvents).toHaveBeenCalled();
        expect(directive.update.emit).not.toHaveBeenCalled();

        tick();

        expect(directive.update.emit).toHaveBeenCalled();
      }));
    });
  });
});
