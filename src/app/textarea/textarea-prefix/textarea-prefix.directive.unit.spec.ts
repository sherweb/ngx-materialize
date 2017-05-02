import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MzTextareaPrefixDirective } from './textarea-prefix.directive';

describe('MzTextareaPrefixDirective:unit', () => {

  const mockElementRef = new ElementRef({ fake: true });

  let directive: MzTextareaPrefixDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzTextareaPrefixDirective(mockElementRef, renderer);
  });

  describe('ngOnInit', () => {

    it('should add prefix css class on element', () => {

      spyOn(renderer, 'setElementClass');

      directive.ngOnInit();

      expect(renderer.setElementClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'prefix', true);
    });
  });
});
