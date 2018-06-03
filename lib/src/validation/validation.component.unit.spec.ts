import { CommonModule } from '@angular/common';
import { ElementRef, Renderer } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzErrorMessageComponent, MzValidationComponent } from './';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

export class MockNgControl {
  control = new FormControl();
}

describe('MzValidationComponent:unit', () => {
  let component: MzValidationComponent;
  let fixture: ComponentFixture<MzValidationComponent>;

  beforeEach(async(() => {

    const test = TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
      ],
      declarations: [
        MzErrorMessageComponent,
        MzValidationComponent,
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl },
        { provide: Renderer, useValue: mockRenderer },
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MzErrorMessageComponent],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(component, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(component, 'initErrorMessageComponent').and.callFake(() => callOrder.push('initErrorMessageComponent'));
      spyOn(component, 'subscribeStatusChanges').and.callFake(() => callOrder.push('subscribeStatusChanges'));
    });

    it('should call initElement ', () => {

      component.ngAfterViewInit();

      expect(component.initElements).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initElements');
    });

    it('should call initErrorMessageComponent ', () => {

      component.ngAfterViewInit();

      expect(component.initErrorMessageComponent).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initErrorMessageComponent');
    });

    it('should call subscribeStatusChanges ', () => {

      component.ngAfterViewInit();

      expect(component.subscribeStatusChanges).toHaveBeenCalled();
      expect(callOrder[2]).toBe('subscribeStatusChanges');
    });
  });

  describe('ngOnDestroy', () => {

    it('should destroy the component', fakeAsync(() => {

      component.initErrorMessageComponent();
      tick();

      spyOn(component.statusChangesSubscription, 'unsubscribe');
      spyOn(component.errorMessageComponent, 'destroy');

      component.ngOnDestroy();

      expect(component.statusChangesSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.errorMessageComponent.destroy).toHaveBeenCalled();
    }));
  });

  describe('formControlDisabled', () => {

    it('should disable form control when disable is true', () => {

      const mockInput = document.createElement('input');

      component.formControlDisabled = true;
      component.nativeElement = $(mockInput);

      expect(component.formControlDisabled).toBeTruthy();
      expect(component.ngControl.control.disabled).toBeTruthy();
    });

    it('should not disable form control when disable is false', () => {

      const mockInput = document.createElement('input');

      component.formControlDisabled = false;
      component.nativeElement = $(mockInput);

      expect(component.formControlDisabled).toBeFalsy();
      expect(component.ngControl.control.enabled).toBeTruthy();
    });
  });

  describe('elementToAddValidation', () => {

    it('should return native element', () => {

      const mockInput = document.createElement('input');

      component.nativeElement = $(mockInput);

      spyOn(component, 'isNativeSelectElement').and.returnValue(false);

      expect(component.elementToAddValidation).toBe(component.nativeElement);
    });

    it('should return input select dropdown element when element ref is a select', fakeAsync(() => {

      const mockSelect = document.createElement('select');
      mockSelect.appendChild(document.createElement('option'));

      const mockInputSelectDropdown = document.createElement('input');
      mockInputSelectDropdown.setAttribute('class', 'select-dropdown');

      const mockDiv = document.createElement('div');
      mockDiv.appendChild(mockInputSelectDropdown);
      mockDiv.appendChild(mockSelect);

      const mockInputSelectDropdownJquery = $(mockInputSelectDropdown);

      component.nativeElement = $(mockSelect);

      component.initErrorMessageComponent();
      tick();

      spyOn(component, 'isNativeSelectElement').and.returnValue(true);
      spyOn(component.nativeElement, 'siblings').and.returnValue(mockInputSelectDropdownJquery);

      expect(component.elementToAddValidation).toBe(mockInputSelectDropdownJquery);
    }));
  });

  describe('isNativeSelectElement', () => {

    it('should return true when the element is a select', () => {

      const mockSelect = document.createElement('select');

      component.nativeElement = $(mockSelect);

      fixture.detectChanges();

      expect(component.isNativeSelectElement).toBeTruthy();
    });

    it('should return false when the element is not a select', () => {

      const mockInput = document.createElement('input');

      component.nativeElement = $(mockInput);

      fixture.detectChanges();

      expect(component.isNativeSelectElement).toBeFalsy();
    });
  });
});
