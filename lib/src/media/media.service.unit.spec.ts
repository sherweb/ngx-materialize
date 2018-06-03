import { async, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { MzMediaService } from './media.service';

describe('MzMediaService:unit', () => {
  let mediaService: MzMediaService;

  function mockWindowSize(height: number, width: number) {
    // need to cast to any otherwise cannot assign values
    // to window as they are readonly in definitely typed file
    Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
    Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MzMediaService],
    });
  });

  beforeEach(() => {
    mediaService = TestBed.get(MzMediaService);
  });

  describe('media', () => {

    it('should return observable media on window resize', async(() => {

      const useCases = [
        { alias: 's', windowHeight: 0, windowWidth: 0 },
        { alias: 's', windowHeight: 400, windowWidth: 600 },
        { alias: 'm', windowHeight: 400, windowWidth: 601 },
        { alias: 'm', windowHeight: 680, windowWidth: 992 },
        { alias: 'l', windowHeight: 680, windowWidth: 993 },
        { alias: 'l', windowHeight: 960, windowWidth: 1200 },
        { alias: 'xl', windowHeight: 960, windowWidth: 1201 },
        { alias: 'xl', windowHeight: 1080, windowWidth: 1920 },
        { alias: 'xl', windowHeight: 99999, windowWidth: 99999 },
      ];

      // need subscribition for observable.fromEvent to be triggered
      mediaService.media.subscribe();

      useCases.forEach(useCase => {
        mockWindowSize(useCase.windowHeight, useCase.windowWidth);

        dispatchEvent(new CustomEvent('resize'));

        mediaService.media.pipe(first()).subscribe(media => {
          expect(media.alias).toBe(useCase.alias);
          expect(media.windowHeight).toBe(useCase.windowHeight);
          expect(media.windowWidth).toBe(useCase.windowWidth);
        });
      });
    }));
  });

  describe('isActive', () => {

    it('should return observable boolean on window resize', async(() => {

      const useCases = [
        // small
        { alias: 'lt-s', windowWidth: 0, isActive: false },
        { alias: 's', windowWidth: 0, isActive: true },
        { alias: 's', windowWidth: 600, isActive: true },
        { alias: 's', windowWidth: 601, isActive: false },
        { alias: 'gt-s', windowWidth: 600, isActive: false },
        { alias: 'gt-s', windowWidth: 601, isActive: true },
        { alias: 'gt-s', windowWidth: 9999, isActive: true },
        // medium
        { alias: 'lt-m', windowWidth: 0, isActive: true },
        { alias: 'lt-m', windowWidth: 600, isActive: true },
        { alias: 'lt-m', windowWidth: 601, isActive: false },
        { alias: 'm', windowWidth: 600, isActive: false },
        { alias: 'm', windowWidth: 601, isActive: true },
        { alias: 'm', windowWidth: 992, isActive: true },
        { alias: 'm', windowWidth: 993, isActive: false },
        { alias: 'gt-m', windowWidth: 992, isActive: false },
        { alias: 'gt-m', windowWidth: 993, isActive: true },
        { alias: 'gt-m', windowWidth: 9999, isActive: true },
        // large
        { alias: 'lt-l', windowWidth: 0, isActive: true },
        { alias: 'lt-l', windowWidth: 992, isActive: true },
        { alias: 'lt-l', windowWidth: 993, isActive: false },
        { alias: 'l', windowWidth: 992, isActive: false },
        { alias: 'l', windowWidth: 993, isActive: true },
        { alias: 'l', windowWidth: 1200, isActive: true },
        { alias: 'l', windowWidth: 1201, isActive: false },
        { alias: 'gt-l', windowWidth: 1200, isActive: false },
        { alias: 'gt-l', windowWidth: 1201, isActive: true },
        { alias: 'gt-l', windowWidth: 9999, isActive: true },
        // xlarge
        { alias: 'lt-xl', windowWidth: 0, isActive: true },
        { alias: 'lt-xl', windowWidth: 1200, isActive: true },
        { alias: 'lt-xl', windowWidth: 1201, isActive: false },
        { alias: 'xl', windowWidth: 1200, isActive: false },
        { alias: 'xl', windowWidth: 1201, isActive: true },
        { alias: 'xl', windowWidth: Number.MAX_VALUE, isActive: true },
        { alias: 'gt-xl', windowWidth: Number.MAX_VALUE, isActive: false },
      ];

      useCases.forEach(useCase => {
        mockWindowSize(0, useCase.windowWidth);

        mediaService.isActive(useCase.alias).pipe(first()).subscribe(isActive => {
          expect(isActive).toBe(useCase.isActive);
        });
      });
    }));

    it('should log error when media is invalid', () => {

      const useCases = [
        undefined,
        null,
        '',
        'x',
        'lt',
        'lt-',
        'lt-x',
        '-s',
        's-',
        '-lt-s',
        'lt-s-',
        'lt-s-x',
      ];

      useCases.forEach(breakpoint => {
        mediaService.isActive(breakpoint).pipe(first()).subscribe(
          isActive => {
            // safetynet as this should never be called in this tests
            expect(true).toBeFalsy();
          },
          error => {
            expect(error.message).toBe(`MzMediaService.isActive parameter is invalid: '${breakpoint}' is not a recognized breakpoint.`);
          });
      });
    });
  });
});
