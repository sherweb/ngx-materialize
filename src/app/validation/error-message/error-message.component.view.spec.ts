import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { buildComponent, MzTestWrapperComponent } from './../../shared/test-wrapper';
import { MzErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent:view', () => {

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

    let nativeElement: any;

    function errorMessage(): HTMLElement {
      return nativeElement.querySelector('.invalid');
    }

    it('should display an error-messsage', async(()  => {

      const message = 'error-message';

      buildComponent<MzErrorMessageComponent>(`
        <mz-error-message [errorMessage]="message"></mz-error-message>`, {
        message,
      }).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(errorMessage()).toBeTruthy();
        expect(errorMessage().textContent).toEqual('error-message');
      });
    }));

    it('should not display an error-messsage', async(() => {

      const message = '';

      buildComponent<MzErrorMessageComponent>(`
        <mz-error-message [errorMessage]="message"></mz-error-message>`, {
        message,
      }).then((fixture) => {

        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        expect(errorMessage()).toBeFalsy();
      });
    }));
  });
});
