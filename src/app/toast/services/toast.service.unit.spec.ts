import { inject, TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService:unit', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
  });

  beforeEach(() => {
    toastService = TestBed.get(ToastService);
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
