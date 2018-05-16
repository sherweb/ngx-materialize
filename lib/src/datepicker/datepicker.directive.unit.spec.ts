import { Subscription } from 'rxjs';

import { MzDatepickerDirective } from './datepicker.directive';

describe('MzDatepickerDirective:unit', () => {
  let directive: MzDatepickerDirective;

  beforeEach(() => {
    directive = new MzDatepickerDirective(null, null, null, null);
  });

  describe('ngOnDestroy', () => {

    it('should unsubscribe inputValueSubscription when subscribed', () => {

      directive.inputValueSubscription = new Subscription();
      directive.ngOnDestroy();

      expect(directive.inputValueSubscription.closed).toBeTruthy();
    });

    it('should not unsubscribe inputValueSubscription when not subscribed', () => {

      spyOn(Subscription.prototype, 'unsubscribe');

      directive.ngOnDestroy();

      expect(Subscription.prototype.unsubscribe).not.toHaveBeenCalled();
    });
  });
});
