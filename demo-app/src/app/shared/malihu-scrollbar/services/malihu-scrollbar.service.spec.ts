import { inject, TestBed } from '@angular/core/testing';
import { MalihuScrollbarService } from './malihu-scrollbar.service';

describe('MalihuScrollbarService:unit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MalihuScrollbarService],
    });
  });

  it('should ...', inject([MalihuScrollbarService], (service: MalihuScrollbarService) => {
    expect(service).toBeTruthy();
  }));
});
