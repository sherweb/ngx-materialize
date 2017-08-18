import { ElementRef, Renderer } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { MzDatepickerDirective } from './datepicker.directive';

describe('MzDatepickerDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });
  const mockNgModel = <NgModel>{
    control: new FormControl(),
    valueChanges: { subscribe: () => null },
  };

  let directive: MzDatepickerDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzDatepickerDirective(mockNgModel, mockElementRef, renderer);
  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe inputValueSubscription when subscribed', () => {

      const mockSubscription = new Subscription();

      spyOn(mockSubscription, 'unsubscribe');

      directive.inputValueSubscription = mockSubscription;
      directive.ngOnDestroy();

      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not unsubscribe inputValueSubscription when not subscribed', () => {

      spyOn(Subscription.prototype, 'unsubscribe');

      directive.ngOnDestroy();

      expect(Subscription.prototype.unsubscribe).not.toHaveBeenCalled();
    });
  });
});
