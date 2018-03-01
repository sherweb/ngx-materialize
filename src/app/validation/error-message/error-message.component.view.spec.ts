import { async, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorMessageResource, MzErrorMessageComponent } from './';
import { buildComponent, MzTestWrapperComponent } from './../../shared/test-wrapper';

describe('MzErrorMessageComponent:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [
        MzTestWrapperComponent,
        MzErrorMessageComponent,
      ],
    });
  }));

  describe('error-message', () => {

    const errorMessageResource: ErrorMessageResource = {
      required: 'error-message',
    };
    let formControl: FormControl;
    let nativeElement: any;

    function errorMessage(): HTMLElement {
      return nativeElement.querySelector('.invalid');
    }

    beforeEach(() => {
      formControl = new FormControl();
    });

    it('should display an error-messsage when form control is touched and invalid', async(()  => {

      formControl.markAsTouched();
      formControl.setErrors({ 'required': '' });

      buildComponent<MzErrorMessageComponent>(`
        <mz-error-message [control]="formControl" [errorMessageResource]="errorMessageResource"></mz-error-message>`, {
        formControl,
        errorMessageResource,
        },
      ).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(errorMessage()).toBeTruthy();
        expect(errorMessage().textContent.trim()).toEqual('error-message');
      });
    }));

    it('should display an error-messsage when form control is dirty and invalid', async(()  => {

      formControl.markAsDirty();
      formControl.setErrors({ 'required': '' });

      buildComponent<MzErrorMessageComponent>(`
        <mz-error-message [control]="formControl" [errorMessageResource]="errorMessageResource"></mz-error-message>`, {
        formControl,
        errorMessageResource,
      }).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(errorMessage()).toBeTruthy();
        expect(errorMessage().textContent.trim()).toEqual('error-message');
      });
    }));

    it('should not display an error-messsage', async(() => {

      formControl.markAsPristine();
      formControl.markAsUntouched();

      buildComponent<MzErrorMessageComponent>(`
        <mz-error-message [control]="formControl" [errorMessageResource]="errorMessageResource"></mz-error-message>`, {
        formControl,
        errorMessageResource,
      }).then((fixture) => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(errorMessage()).toBeFalsy();
      });
    }));
  });
});
