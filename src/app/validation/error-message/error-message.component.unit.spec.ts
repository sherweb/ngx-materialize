import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import {
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MzErrorMessageComponent } from './error-message.component';

describe('MzErrorMessageComponent:unit', () => {
  let component: MzErrorMessageComponent;
  let fixture: ComponentFixture<MzErrorMessageComponent>;
  const formControl: FormControl = new FormControl(Validators.required);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [MzErrorMessageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzErrorMessageComponent);
    component = fixture.componentInstance;
    component.control = formControl;
    component.control.setValue('value');
    component.control.setErrors({ 'required': '' });
    component.errorMessageResource = {
      required: 'error-message',
    };
    fixture.detectChanges();
  });

  describe('ngOnDestroy', () => {
    it('should destroy the component', fakeAsync(() => {

      spyOn(component.controlStatusChangesSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.controlStatusChangesSubscription.unsubscribe).toHaveBeenCalled();
    }));
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(component, 'buildErrorMessage').and.callFake(() => callOrder.push('buildErrorMessage'));
    });

    it('should call buildErrorMessage', () => {
      component.ngOnInit();

      expect(component.buildErrorMessage).toHaveBeenCalled();
      expect(callOrder[0]).toBe('buildErrorMessage');
    });
  });

  describe('buildErrorMessage', () => {
    it('should add errorMessageResource associate to FormControl errors to errorMessage ', () => {

      component.buildErrorMessage();

      expect(component.errorMessage.trim()).toBe('error-message');
    });
  });

  describe('control', () => {
    it('should call buidErrorMessage when statusChanges', () => {

      spyOn(component, 'buildErrorMessage');

      component.control.setValue('');
      fixture.detectChanges();

      expect(component.buildErrorMessage).toHaveBeenCalled();
    });
  });
});
