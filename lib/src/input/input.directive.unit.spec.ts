import { ElementRef, Renderer } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzInputDirective } from './input.directive';

describe('MzInputDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });
  const mockNgControl = <NgModel>{
    control: new FormControl(),
    valueChanges: { subscribe: () => null },
  };

  let directive: MzInputDirective;
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
    directive = new MzInputDirective(mockNgControl, mockElementRef, renderer);
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(directive, 'initInputSubscription').and.callFake(() => callOrder.push('initInputSubscription'));
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

    it('should call initInputSubscription method', () => {

      directive.ngOnInit();

      expect(directive.initInputSubscription).toHaveBeenCalled();
      expect(callOrder[2]).toBe('initInputSubscription');
    });

    it('should call handleProperties method', () => {

      directive.ngOnInit();

      expect(directive.handleProperties).toHaveBeenCalled();
      expect(callOrder[3]).toBe('handleProperties');
    });
  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe inputValueSubscription when subscribed', () => {

      const mockSubscription = new Subscription();

      spyOn(mockSubscription, 'unsubscribe').and.callThrough();

      directive.inputValueSubscription = mockSubscription;
      directive.ngOnDestroy();

      expect(mockSubscription.closed).toBeTruthy();
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe inputValueSubscription when not subscribed', () => {

      spyOn(Subscription.prototype, 'unsubscribe');

      directive.ngOnDestroy();

      expect(directive.inputValueSubscription).toBeUndefined();
      expect(Subscription.prototype.unsubscribe).not.toHaveBeenCalled();
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        autocomplete: 'handleAutocomplete',
        dataError: 'handleDataError',
        dataSuccess: 'handleDataSuccess',
        label: 'handleLabel',
        length: 'handleLength',
        placeholder: 'handlePlaceholder',
        validate: 'handleValidate',
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

  describe('initInputSubscription', () => {

    it('should subscribe to ngControl.valueChanges when ngControl is provided', () => {

      spyOn(mockNgControl.valueChanges, 'subscribe');

      directive.initInputSubscription();

      expect(mockNgControl.valueChanges.subscribe).toHaveBeenCalled();
    });

    it('should not subscribe to ngControl.valueChanges when ngControl is not provided', () => {

      spyOn(mockNgControl.valueChanges, 'subscribe');

      directive['ngControl'] = null;
      directive.initInputSubscription();

      expect(mockNgControl.valueChanges.subscribe).not.toHaveBeenCalled();
    });

    it('should call setLabelActive when ngControl.valueChanges is triggered', () => {

      spyOn(directive, 'setLabelActive');
      spyOn(mockNgControl.valueChanges, 'subscribe').and.callFake(callback => callback());

      directive.initInputSubscription();

      expect(directive.setLabelActive).toHaveBeenCalled();
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on input-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const inputId = 'input-id';
      const mockInputElement = { input: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', inputId);

      directive.id = inputId;
      directive.inputElement = <any>mockInputElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'after', [mockLabelElement]);
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

    describe('input not wrapped inside mz-input-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockInputElement = { input: true };
        const mockInputContainerElement = { inputContainer: true, length: 0 };

        directive.inputElement = <any>mockInputElement;
        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith(
          'Input with mz-input directive must be placed inside an [mz-input-container] tag',
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

    describe('input wrapped inside mz-input-container', () => {

      it('should call HandlePropChanges.executePropHandlers', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockInputContainerElement = { inputContainer: true, length: 1 };

        directive.inputContainerElement = <any>mockInputContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
      });
    });
  });

  describe('handleAutocomplete', () => {

    it('should add autocomplete css class on input element when autocomplete.data.length > 0', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.autocomplete = { data: { 'value-x': null } };
      directive.handleAutocomplete();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'autocomplete', true);
    });

    it('should remove autocomplete css class on input element when autocomplete is not provided', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.handleAutocomplete();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'autocomplete', false);
    });

    it('should remove autocomplete css class on input element when autocomplete.data is null', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.autocomplete = { data: null };
      directive.handleAutocomplete();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'autocomplete', false);
    });

    it('should remove autocomplete css class on input element when autocomplete.data.length == 0', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.autocomplete = { data: {} };
      directive.handleAutocomplete();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'autocomplete', false);
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
      const mockInputElement = { input: true, autocomplete: undefined };

      directive.inputElement = <any>mockInputElement;
      directive.autocomplete = autocomplete;
      directive.handleAutocomplete();

      tick(100);

      expect(directive.inputElement['autocomplete']).toBeUndefined();
      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();

      mockInputElement.autocomplete = () => null;
      tick(100);

      expect(directive.inputElement['autocomplete']).toBeDefined();
      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'autocomplete', [autocomplete]);
    }));
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

    it('should remove data-error attribute on label element when dataError is not provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const mockLabelElement = { label: true };

      directive.labelElement = <any>[mockLabelElement];
      directive.handleDataError();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockLabelElement, 'data-error', undefined);
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

    it('should remove data-success attribute on label element when dataSuccess is not provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const mockLabelElement = { label: true };

      directive.labelElement = <any>[mockLabelElement];
      directive.handleDataSuccess();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockLabelElement, 'data-success', undefined);
    });
  });

  describe('handleLabel', () => {

    it('should invoke text method to label element when label is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockInputElement = { input: true, val: () => null };
      const mockLabelElement = { label: true };

      directive.inputElement = <any>mockInputElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [label]);
    });

    it('should invoke text method to label element when label is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true, val: () => null };
      const mockLabelElement = { label: true };

      directive.inputElement = <any>mockInputElement;
      directive.labelElement = <any>mockLabelElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [undefined]);
    });
  });

  describe('handleLength', () => {

    it('should add data-length attribute on input element when length is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const length = 100;
      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.length = length;
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockInputElement, 'data-length', length.toString());
    });

    it('should remove data-length attribute on input element when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(renderer, 'setElementAttribute');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockInputElement, 'data-length', null);
    });

    it('should call setCharacterCount method when length is provided', () => {

      spyOn(directive, 'setCharacterCount');

      const length = 100;
      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.length = length;
      directive.handleLength();

      expect(directive.setCharacterCount).toHaveBeenCalled();
    });

    it('should not call setCharacterCount method when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(directive, 'setCharacterCount');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.handleLength();

      expect(directive.setCharacterCount).not.toHaveBeenCalled();
    });

    it('should call removeCharacterCount method when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.handleLength();

      expect(directive.removeCharacterCount).toHaveBeenCalled();
    });

    it('should not call removeCharacterCount method when length is provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(directive, 'setCharacterCount');

      const length = 100;
      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.length = length;
      directive.handleLength();

      expect(directive.removeCharacterCount).not.toHaveBeenCalled();
    });
  });

  describe('handlePlaceholder', () => {

    it('should add placeholder attribute on input element when placeholder is provided', () => {

      spyOn(renderer, 'setElementAttribute');
      spyOn(directive, 'setLabelActive');

      const placeholder = 'placeholder-x';
      const mockInputElement = { input: true };

      directive.placeholder = placeholder;
      directive.inputElement = <any>[mockInputElement];
      directive.handlePlaceholder();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockInputElement, 'placeholder', placeholder);
    });

    it('should mark control to pristine state when input contains control', fakeAsync(() => {

      spyOn(directive, 'setLabelActive');
      spyOn(mockNgControl.control, 'markAsPristine').and.callThrough();

      const placeholder = 'placeholder-x';
      const mockInputElement = { input: true };

      mockNgControl.control.markAsDirty();

      directive['ngControl'] = mockNgControl;
      directive.placeholder = placeholder;
      directive.inputElement = <any>[mockInputElement];

      directive.handlePlaceholder();
      tick();

      expect(mockNgControl.control.markAsPristine).toHaveBeenCalled();
      expect(mockNgControl.control.pristine).toBeTruthy();
    }));

    it('should remove placeholder attribute on input element when placeholder is undefined/null/empty', () => {

      const spySetElementAttribute = spyOn(renderer, 'setElementAttribute');

      spyOn(directive, 'setLabelActive');

      [undefined, null, ''].forEach(value => {

        const mockInputElement = { input: true };

        directive.placeholder = value;
        directive.inputElement = <any>[mockInputElement];
        directive.handlePlaceholder();

        expect(spySetElementAttribute).toHaveBeenCalledWith(mockInputElement, 'placeholder', null);

        spySetElementAttribute.calls.reset();
      });
    });

    it('should call setLabelActive', () => {

      spyOn(directive, 'setLabelActive');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.handlePlaceholder();

      expect(directive.setLabelActive).toHaveBeenCalled();
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

    it('should remove validate css class on input element when validate is false', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.validate = false;
      directive.handleValidate();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'validate', false);
    });

    it('should force validation when validate is true', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.validate = true;
      directive.handleValidate();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'trigger', ['blur']);
    });

    it('should not force validation when validate is false', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.validate = false;
      directive.handleValidate();

      expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
    });

    it('should call removeValidationClasses when validate is false', () => {

      spyOn(directive, 'removeValidationClasses');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.validate = false;
      directive.handleValidate();

      expect(directive.removeValidationClasses).toHaveBeenCalled();
    });

    it('should not call removeValidationClasses when validate is true', () => {

      spyOn(directive, 'removeValidationClasses');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.validate = true;
      directive.handleValidate();

      expect(directive.removeValidationClasses).not.toHaveBeenCalled();
    });
  });

  describe('setCharacterCount', () => {

    it('should invoke characterCounter method on input element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.setCharacterCount();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'characterCounter');
    });

    it('should force validation on input element', fakeAsync(() => {

      spyOn(renderer, 'invokeElementMethod');

      const mockInputElement = { input: true };

      directive.inputElement = <any>mockInputElement;
      directive.setCharacterCount();

      tick(1);

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'trigger', ['input']);
      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockInputElement, 'trigger', ['blur']);
    }));
  });

  describe('setLabelActive', () => {

    it('should add active css class on label element when placeholder is provided', fakeAsync(() => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };
      const mockLabelElement = { label: true };

      directive.placeholder = 'placeholder-x';
      directive.inputElement = <any>[mockInputElement];
      directive.labelElement = <any>[mockLabelElement];
      directive.setLabelActive();

      tick(1);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    }));

    it('should add active css class on label element when input element has a value', fakeAsync(() => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true, value: 'value-x' };
      const mockLabelElement = { label: true };

      directive.inputElement = <any>[mockInputElement];
      directive.labelElement = <any>[mockLabelElement];
      directive.setLabelActive();

      tick(1);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    }));

    it('should remove active css class on label element when placeholder and input element have no value', fakeAsync(() => {

      const spySetElementClass = spyOn(renderer, 'setElementClass');

      [undefined, null, ''].forEach(value => {

        const mockInputElement = { input: true, value: value };
        const mockLabelElement = { label: true };

        directive.placeholder = value;
        directive.inputElement = <any>[mockInputElement];
        directive.labelElement = <any>[mockLabelElement];

        directive.setLabelActive();

        tick(1);

        expect(spySetElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', false);

        spySetElementClass.calls.reset();
      });
    }));
  });

  describe('removeCharacterCount', () => {

    it('should remove character-counter element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockCharacterCounterElement = { characterCounter: true };
      const mockInputElement = { input: true, siblings: () => null };

      spyOn(mockInputElement, 'siblings').and.callFake((selector: string) => {
        return selector === '.character-counter'
          ? mockCharacterCounterElement
          : {};
      });

      directive.inputElement = <any>mockInputElement;
      directive.removeCharacterCount();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockCharacterCounterElement, 'remove');
    });

    it('should call removeValidationClasses method', () => {

      spyOn(directive, 'removeValidationClasses');

      const mockInputElement = { input: true, siblings: () => null };

      directive.inputElement = <any>mockInputElement;
      directive.removeCharacterCount();

      expect(directive.removeValidationClasses).toHaveBeenCalled();
    });
  });

  describe('removeValidationClasses', () => {

    it('should remove valid and invalid css classes on input element', () => {

      spyOn(renderer, 'setElementClass');

      const mockInputElement = { input: true };

      directive.inputElement = <any>[mockInputElement];
      directive.removeValidationClasses();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'invalid', false);
      expect(renderer.setElementClass).toHaveBeenCalledWith(mockInputElement, 'valid', false);
    });
  });
});
