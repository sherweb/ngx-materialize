import { CommonModule } from '@angular/common';
import {
  ElementRef,
  NgModule,
  Renderer,
  Renderer2,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  NgControl,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

    TestBed.configureTestingModule({
      imports: [
        ValidationTestModule,
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl },
        Renderer,
        Renderer2,
      ],
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
      spyOn(component, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(component, 'subscribeStatusChanges').and.callFake(() => callOrder.push('subscribeStatusChanges'));
      spyOn(component, 'executePropHandlers').and.callFake(() => callOrder.push('executePropHandlers'));
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

    it('should call initHandlers ', () => {

      component.ngAfterViewInit();

      expect(component.initHandlers).toHaveBeenCalled();
      expect(callOrder[2]).toBe('initHandlers');
    });

    it('should call subscribeStatusChanges ', () => {

      component.ngAfterViewInit();

      expect(component.subscribeStatusChanges).toHaveBeenCalled();
      expect(callOrder[3]).toBe('subscribeStatusChanges');
    });

    it('should call executePropHandlers ', () => {

      component.ngAfterViewInit();

      expect(component.executePropHandlers).toHaveBeenCalled();
      expect(callOrder[4]).toBe('executePropHandlers');
    });
  });

  describe('ngOnDestroy', () => {

    it('should destroy the component', fakeAsync(() => {

      const mockSelect = document.createElement('select');
      mockSelect.appendChild(document.createElement('option'));

      const mockInputSelectDropdown = document.createElement('input');
      mockInputSelectDropdown.setAttribute('class', 'select-dropdown');

      const mockDiv = document.createElement('div');
      mockDiv.appendChild(mockInputSelectDropdown);
      mockDiv.appendChild(mockSelect);

      const mockInputSelectDropdownJquery = $(mockInputSelectDropdown);

      const mockParentElement = {
        children: () => {
          return mockInputSelectDropdownJquery;
        },
      };

      component.nativeElement = $(mockSelect);

      component.initErrorMessageComponent();
      tick();

      spyOn(component.statusChangesSubscription, 'unsubscribe');
      spyOn(component.errorMessageComponent, 'destroy');
      spyOn(component.nativeElement, 'parent').and.returnValue(mockParentElement);
      spyOn(mockInputSelectDropdownJquery, 'off');

      component.ngOnDestroy();

      expect(component.statusChangesSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.errorMessageComponent.destroy).toHaveBeenCalled();
      expect(mockInputSelectDropdownJquery.off).toHaveBeenCalledWith('blur');
    }));
  });

  describe('getElement', () => {
    it('should return native element', () => {

      const mockInput = document.createElement('input');

      component.nativeElement = $(mockInput);

      spyOn(component, 'isNativeSelectElement').and.returnValue(false);

      const actualElement = component.getElement();

      expect(actualElement).toBe(component.nativeElement);
    })

    it('should return input select dropdown element when element ref is a select', fakeAsync(() => {

      const mockSelect = document.createElement('select');
      mockSelect.appendChild(document.createElement('option'));

      const mockInputSelectDropdown = document.createElement('input');
      mockInputSelectDropdown.setAttribute('class', 'select-dropdown');

      const mockDiv = document.createElement('div');
      mockDiv.appendChild(mockInputSelectDropdown);
      mockDiv.appendChild(mockSelect);

      const mockInputSelectDropdownJquery = $(mockInputSelectDropdown);

      const mockParentElement = {
        children: () => {
          return mockInputSelectDropdownJquery;
        },
      };

      component.nativeElement = $(mockSelect);

      // component.initErrorMessageComponent();
      // tick();

      spyOn(component, 'isNativeSelectElement').and.returnValue(true);
      spyOn(component.nativeElement, 'parent').and.returnValue(mockParentElement);

      // const actualElement = component.getElement();

      // expect(actualElement).toBe(mockInputSelectDropdownJquery);
    }));
  });

  describe('handleFormControlDisabled', () => {

    it('should disable form control when disable is true', () => {

      const mockInput = document.createElement('input');

      component.formControlDisabled = true;
      component.nativeElement = $(mockInput);

      component.handleFormControlDisabled();

      expect(component.ngControl.control.disabled).toBeTruthy()
    });

    it('should not disable form control when disable is false', () => {

      const mockInput = document.createElement('input');

      component.formControlDisabled = false;
      component.nativeElement = $(mockInput);

      component.handleFormControlDisabled();

      expect(component.ngControl.control.enabled).toBeTruthy()
    });
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

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
  ],
  exports: [MzValidationComponent],
  declarations: [
    MzErrorMessageComponent,
    MzValidationComponent,
  ],
  entryComponents: [MzErrorMessageComponent],
})
class ValidationTestModule { }
