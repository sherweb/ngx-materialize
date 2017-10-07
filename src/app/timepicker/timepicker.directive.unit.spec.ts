import { Subscription } from 'rxjs/Subscription';

import { MzTimepickerDirective } from './timepicker.directive';

describe('MzTimepickerDirective:unit', () => {
  let directive: MzTimepickerDirective;

  beforeEach(() => {
    directive = new MzTimepickerDirective(null, null, null);
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
