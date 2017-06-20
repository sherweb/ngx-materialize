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

      const mockSelect = document.createElement('select');
      mockSelect.appendChild(document.createElement('option'));

      const mockInputSelectDropdown = document.createElement('input');
      mockInputSelectDropdown.setAttribute('class', 'select-dropdown');

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
      expect(mockInputSelectDropdownJquery.off).toHaveBeenCalledWith('close');
    }));
  });

  describe('isNativeElementSelect', () => {

    it('should return true when the element is a select', () => {

      const mockSelect = document.createElement('select');

      component.nativeElement = $(mockSelect);

      fixture.detectChanges();

      expect(component.isNativeElementSelect()).toBeTruthy();
    });

    it('should return false when the element is not a select', () => {

      const mockInput = document.createElement('input');

      component.nativeElement = $(mockInput);

      fixture.detectChanges();

      expect(component.isNativeElementSelect()).toBeFalsy();
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
