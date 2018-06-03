import { ElementRef, Renderer } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { mockRenderer } from '../shared/test-wrapper/mocks';
import { MzTooltipDirective } from './tooltip.directive';

describe('MzTooltipDirective:unit', () => {

  const mockElementRef = new ElementRef({ elementRef: true });

  let directive: MzTooltipDirective;
  let renderer: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Renderer, useValue: mockRenderer },
      ],
    });
  });

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    directive = new MzTooltipDirective(mockElementRef, renderer);
  });

  describe('ngOnInit', () => {

    it('should call initElements method', () => {

      spyOn(directive, 'initElements');

      directive.ngOnInit();

      expect(directive.initElements).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call initTooltip method', () => {

      spyOn(directive, 'initTooltip');

      directive.ngAfterViewInit();

      expect(directive.initTooltip).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {

    it('should not call initTooltip method when targetElement is not initialized', () => {

      spyOn(directive, 'initTooltip');

      directive.targetElement = null;
      directive.ngOnChanges(null);

      expect(directive.initTooltip).not.toHaveBeenCalled();
    });

    it('should call initTooltip method when targetElement is initialized', () => {

      spyOn(directive, 'initTooltip');

      directive.targetElement = <any>{ targetElement: true };
      directive.ngOnChanges(null);

      expect(directive.initTooltip).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {

    it('should remove tooltip on element', () => {

      const mockTargetElement = { targetElement: true };

      spyOn(renderer, 'invokeElementMethod');

      directive.targetElement = <any>{ targetElement: true };
      directive.ngOnDestroy();

      expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTargetElement, 'tooltip', ['remove']);
    });
  });

  describe('initElements', () => {

    it('should initialize targetElement correctly', () => {

      const mockTargetElement = $({ targetElement: true });

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockElementRef.nativeElement
          ? mockTargetElement
          : {};
      });

      directive.initElements();

      expect(directive.targetElement).toBe(mockTargetElement);
    });
  });

  describe('initTooltip', () => {

    it('should initialize tooltip on targetElement correctly', () => {

      const useCases: Materialize.TooltipOptions[] = [
        // should set default values
        { delay: null, html: null, position: null, tooltip: null },
        // should pass values
        { delay: 500, html: true, position: 'top', tooltip: 'tooltip-x' },
        { delay: 1000, html: false, position: 'left', tooltip: 'tooltip-y' },
      ];

      const expected: Materialize.TooltipOptions[] = [
        { delay: 350, html: false, position: 'bottom', tooltip: null },
        { delay: 500, html: true, position: 'top', tooltip: 'tooltip-x' },
        { delay: 1000, html: false, position: 'left', tooltip: 'tooltip-y' },
      ];

      const mockTargetElement = { targetElement: true };
      const spyRenderer = spyOn(renderer, 'invokeElementMethod');

      useCases.forEach((useCase, index) => {

        spyRenderer.calls.reset();

        directive.delay = useCase.delay;
        directive.html = useCase.html;
        directive.position = useCase.position;
        directive.tooltip = useCase.tooltip;

        directive.targetElement = <any>{ targetElement: true };
        directive.initTooltip();

        expect(renderer.invokeElementMethod).toHaveBeenCalledWith(mockTargetElement, 'tooltip', [expected[index]]);
      });
    });
  });
});
