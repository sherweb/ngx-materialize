import { TestBed } from '@angular/core/testing';

import { MzToastService } from './toast.service';

describe('MzToastService:unit', () => {
  let toastService: MzToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MzToastService],
    });
  });

  beforeEach(() => {
    toastService = TestBed.get(MzToastService);
  });

  describe('show', () => {

    it('should call Materialize.toast correctly', () => {

      const message = 'message-x';
      const displayLength = 9999;
      const className = 'class-name-x';
      const completeCallback = () => alert('complete-callback-x');

      spyOn(Materialize, 'toast');

      toastService.show(message, displayLength, className, completeCallback);

      expect(Materialize.toast).toHaveBeenCalledWith(message, displayLength, className, completeCallback);
    });
  });
});
