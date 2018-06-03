import { ElementRef, Renderer } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzTextareaDirective } from './textarea.directive';

describe('MzTextareaDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });
  const mockNgControl = <NgModel>{
    valueChanges: { subscribe: () => null },
  };

  let directive: MzTextareaDirective;
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
    directive = new MzTextareaDirective(mockNgControl, mockElementRef, renderer);
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(directive, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(directive, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(directive, 'initTextareaSubscription').and.callFake(() => callOrder.push('initTextareaSubscription'));
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

    it('should call initTextareaSubscription method', () => {

      directive.ngOnInit();

      expect(directive.initTextareaSubscription).toHaveBeenCalled();
      expect(callOrder[2]).toBe('initTextareaSubscription');
    });

    it('should call handleProperties method', () => {

      directive.ngOnInit();

      expect(directive.handleProperties).toHaveBeenCalled();
      expect(callOrder[3]).toBe('handleProperties');
    });
  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe textareaValueSubscription when subscribed', () => {

      const mockSubscription = new Subscription();

      spyOn(mockSubscription, 'unsubscribe').and.callThrough();

      directive.textareaValueSubscription = mockSubscription;
      directive.ngOnDestroy();

      expect(mockSubscription.closed).toBeTruthy();
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe textareaValueSubscription when not subscribed', () => {

      spyOn(Subscription.prototype, 'unsubscribe');

      directive.ngOnDestroy();

      expect(directive.textareaValueSubscription).toBeUndefined();
      expect(Subscription.prototype.unsubscribe).not.toHaveBeenCalled();
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        label: 'handleLabel',
        length: 'handleLength',
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

      const mockTextareaElement = $({ textarea: true, parent: (selector: string) => {} });
      const mockTextareaContainerElement = $({ textareaContainer: true });
      const mockLabelElement = $({ label: true });

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

    it('should call initTextarea after textareaElement has been selected', () => {

      const mockTextareaElement = $({ textarea: true, parent: (selector: string) => {} });

      spyOn(directive, 'initTextarea');

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockTextareaElement
          : {};
      });

      directive.initElements();

      expect(directive.textareaElement).toBe(mockTextareaElement);
      expect(directive.initTextarea).toHaveBeenCalled();
    });
  });

  describe('initTextarea', () => {

    it('should add materialize-textarea css class on textarea element', () => {

      spyOn(renderer, 'setElementClass');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.initTextarea();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockTextareaElement, 'materialize-textarea', true);
    });
  });

  describe('initTextareaSubscription', () => {

    it('should subscribe to ngControl.valueChanges when ngControl is provided', () => {

      spyOn(mockNgControl.valueChanges, 'subscribe');

      directive.initTextareaSubscription();

      expect(mockNgControl.valueChanges.subscribe).toHaveBeenCalled();
    });

    it('should not subscribe to ngControl.valueChanges when ngControl is not provided', () => {

      spyOn(mockNgControl.valueChanges, 'subscribe');

      directive['ngControl'] = null;
      directive.initTextareaSubscription();

      expect(mockNgControl.valueChanges.subscribe).not.toHaveBeenCalled();
    });

    it('should call setLabelActive when ngControl.valueChanges is triggered', () => {

      spyOn(directive, 'setLabelActive');
      spyOn(mockNgControl.valueChanges, 'subscribe').and.callFake(callback => callback());

      directive.initTextareaSubscription();

      expect(directive.setLabelActive).toHaveBeenCalled();
    });
  });

  describe('createLabelElement', () => {

    it('should invoke append method on input-container element with label element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const textareaId = 'textarea-id';
      const mockTextareaElement = { textarea: true };
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', textareaId);

      directive.id = textareaId;
      directive.textareaElement = <any>mockTextareaElement;
      directive.createLabelElement();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaElement, 'after', [mockLabelElement]);
    });

    it('should return the newly created element', () => {

      const textareaId = 'textarea-id';
      const mockLabelElement = document.createElement('label');
      mockLabelElement.setAttribute('for', textareaId);

      const mockJQueryLabelElement = $({ jQueryLabelElement: true });

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

    describe('textarea not wrapped inside mz-textarea-container', () => {

      it('should log an error in the console', () => {

        spyOn(console, 'error');

        const mockTextareaElement = { textarea: true };
        const mockTextareaContainerElement = { textareaContainer: true, length: 0 };

        directive.textareaElement = <any>mockTextareaElement;
        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(console.error).toHaveBeenCalledWith('Textarea must be placed inside a [mz-textarea-container] tag', mockTextareaElement);
      });

      it('should not call HandlePropChanges.executePropHandlers', () => {

        // avoid error to be shown in console while running tests
        spyOn(console, 'error');

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockTextareaContainerElement = { textareaContainer: true, length: 0 };

        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).not.toHaveBeenCalled();
      });
    });

    describe('textarea wrapped inside mz-textarea-container', () => {

      it('should call HandlePropChanges.executePropHandlers', () => {

        spyOn(HandlePropChanges.prototype, 'executePropHandlers');

        const mockTextareaContainerElement = { textareaContainer: true, length: 1 };

        directive.textareaContainerElement = <any>mockTextareaContainerElement;
        directive.handleProperties();

        expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
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

      const mockTextareaElement = { textarea: true, val: () => 'input-value' };
      const mockLabelElement = { label: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.labelElement = <any>[mockLabelElement];
      directive.handleLabel();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    });

    it('should invoke text method to label element when label is provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const label = 'label-x';
      const mockTextareaElement = { textarea: true, val: () => null };
      const mockLabelElement = { label: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.labelElement = <any>mockLabelElement;
      directive.label = label;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [label]);
    });

    it('should invoke text method to label element when label is not provided', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockTextareaElement = { textarea: true, val: () => null };
      const mockLabelElement = { label: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.labelElement = <any>mockLabelElement;
      directive.handleLabel();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockLabelElement, 'text', [undefined]);
    });
  });

  describe('handleLength', () => {

    it('should add data-length attribute on input element when length is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const length = 100;
      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.length = length;
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockTextareaElement, 'data-length', length.toString());
    });

    it('should remove data-length attribute on input element when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(renderer, 'setElementAttribute');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.handleLength();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockTextareaElement, 'data-length', null);
    });

    it('should call setCharacterCount method when length is provided', () => {

      spyOn(directive, 'setCharacterCount');

      const length = 100;
      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.length = length;
      directive.handleLength();

      expect(directive.setCharacterCount).toHaveBeenCalled();
    });

    it('should not call setCharacterCount method when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(directive, 'setCharacterCount');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.handleLength();

      expect(directive.setCharacterCount).not.toHaveBeenCalled();
    });

    it('should call removeCharacterCount method when length is not provided', () => {

      spyOn(directive, 'removeCharacterCount');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.handleLength();

      expect(directive.removeCharacterCount).toHaveBeenCalled();
    });

    it('should not call removeCharacterCount method when length is provided', () => {

      spyOn(directive, 'removeCharacterCount');
      spyOn(directive, 'setCharacterCount');

      const length = 100;
      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.length = length;
      directive.handleLength();

      expect(directive.removeCharacterCount).not.toHaveBeenCalled();
    });
  });

  describe('handlePlaceholder', () => {

    it('should add placeholder attribute on input element when placeholder is provided', () => {

      spyOn(renderer, 'setElementAttribute');

      const placeholder = 'placeholder-x';
      const mockTextareaElement = { textarea: true };
      const mockLabelElement = { label: true };

      directive.placeholder = placeholder;
      directive.textareaElement = <any>[mockTextareaElement];
      directive.labelElement = <any>[mockLabelElement];
      directive.handlePlaceholder();

      expect(renderer.setElementAttribute).toHaveBeenCalledWith(mockTextareaElement, 'placeholder', placeholder);
    });

    it('should remove placeholder attribute on input element when placeholder is undefined/null/empty', () => {

      const spySetElementAttribute = spyOn(renderer, 'setElementAttribute');

      [undefined, null, ''].forEach(value => {

        const mockTextareaElement = { textarea: true };
        const mockLabelElement = { label: true };

        directive.placeholder = value;
        directive.textareaElement = <any>[mockTextareaElement];
        directive.labelElement = <any>[mockLabelElement];
        directive.handlePlaceholder();

        expect(spySetElementAttribute).toHaveBeenCalledWith(mockTextareaElement, 'placeholder', null);

        spySetElementAttribute.calls.reset();
      });
    });

    it('should call setLabelActive', () => {

      spyOn(directive, 'setLabelActive');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.handlePlaceholder();

      expect(directive.setLabelActive).toHaveBeenCalled();
    });
  });

  describe('setCharacterCount', () => {

    it('should invoke characterCounter method on input element', () => {

      spyOn(renderer, 'invokeElementMethod');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.setCharacterCount();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaElement, 'characterCounter');
    });

    it('should force validation on input element', fakeAsync(() => {

      spyOn(renderer, 'invokeElementMethod');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>mockTextareaElement;
      directive.setCharacterCount();

      tick(1);

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaElement, 'trigger', ['input']);
      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTextareaElement, 'trigger', ['blur']);
    }));
  });

  describe('setLabelActive', () => {

    it('should add active css class on label element when placeholder is provided', fakeAsync(() => {

      spyOn(renderer, 'setElementClass');

      const mockTextareaElement = { textarea: true };
      const mockLabelElement = { label: true };

      directive.placeholder = 'placeholder-x';
      directive.textareaElement = <any>[mockTextareaElement];
      directive.labelElement = <any>[mockLabelElement];
      directive.handlePlaceholder();

      tick(1);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    }));

    it('should add active css class on label element when input element has a value', fakeAsync(() => {

      spyOn(renderer, 'setElementClass');

      const mockTextareaElement = { textarea: true, value: 'value-x' };
      const mockLabelElement = { label: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.labelElement = <any>[mockLabelElement];
      directive.handlePlaceholder();

      tick(1);

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockLabelElement, 'active', true);
    }));

    it('should remove active css class on label element when placeholder and input element have no value', fakeAsync(() => {

      const spySetElementClass = spyOn(renderer, 'setElementClass');

      [undefined, null, ''].forEach(value => {

        const mockTextareaElement = { textarea: true, value: value };
        const mockLabelElement = { label: true };

        directive.placeholder = value;
        directive.textareaElement = <any>[mockTextareaElement];
        directive.labelElement = <any>[mockLabelElement];

        directive.handlePlaceholder();

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
      const mockTextareaElement = { textarea: true, siblings: () => null };

      spyOn(mockTextareaElement, 'siblings').and.callFake((selector: string) => {
        return selector === '.character-counter'
          ? mockCharacterCounterElement
          : {};
      });

      directive.textareaElement = <any>mockTextareaElement;
      directive.removeCharacterCount();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockCharacterCounterElement, 'remove');
    });

    it('should call removeValidationClasses method', () => {

      spyOn(directive, 'removeValidationClasses');

      const mockTextareaElement = { textarea: true, siblings: () => null };

      directive.textareaElement = <any>mockTextareaElement;
      directive.removeCharacterCount();

      expect(directive.removeValidationClasses).toHaveBeenCalled();
    });
  });

  describe('removeValidationClasses', () => {

    it('should remove valid and invalid css classes on input element', () => {

      spyOn(renderer, 'setElementClass');

      const mockTextareaElement = { textarea: true };

      directive.textareaElement = <any>[mockTextareaElement];
      directive.removeValidationClasses();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockTextareaElement, 'invalid', false);
      expect(renderer.setElementClass).toHaveBeenCalledWith(mockTextareaElement, 'valid', false);
    });
  });
});
