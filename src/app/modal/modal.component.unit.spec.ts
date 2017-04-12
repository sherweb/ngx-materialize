import { ElementRef, Renderer } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePropChanges } from '../shared/handle-prop-changes';
import { MzModalComponent } from './modal.component';

describe('MzModalComponent:unit', () => {
  let component: MzModalComponent;
  let fixture: ComponentFixture<MzModalComponent>;
  let renderer: Renderer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzModalComponent],
      providers: [Renderer],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    renderer = TestBed.get(Renderer);
    fixture = TestBed.createComponent(MzModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    let callOrder: string[];

    beforeEach(() => {
      callOrder = [];
      spyOn(component, 'initHandlers').and.callFake(() => callOrder.push('initHandlers'));
      spyOn(component, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(component, 'handleProperties').and.callFake(() => callOrder.push('handleProperties'));
    });

    it('should call init methods correctly', () => {

      component.ngOnInit();

      expect(component.initHandlers).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initHandlers');

      expect(component.initElements).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initElements');

      expect(component.handleProperties).toHaveBeenCalled();
      expect(callOrder[2]).toBe('handleProperties');
    });
  });

  describe('ngAfterViewInit', () => {

    it('should init modal', () => {

      spyOn(component, 'initModal');

      component.ngAfterViewInit();

      expect(component.initModal).toHaveBeenCalled();
    });
  });

  describe('initElements', () => {

    it('should get modal element correctly', () => {

      const mockModalElementRef = new ElementRef({ modalElementRef: true });
      const mockModalElement = { modalElement: true };

      spyOn(window, '$').and.callFake((selector: any): any => {
        return selector === mockModalElementRef.nativeElement
          ? mockModalElement
          : {};
      });

      component.modalElementRef = mockModalElementRef;
      component.initElements();

      expect(component.modalElement).toBe(mockModalElement);
    });
  });

  describe('initHandlers', () => {

    it('should initialize handlers correctly', () => {

      const handlers = {
        options: 'handleOptions',
      };

      component.initHandlers();

      expect(Object.keys(component.handlers).length).toBe(Object.keys(handlers).length);

      Object.keys(handlers).forEach(key => {

        const handler = handlers[key];

        spyOn(component, handler);

        component[handler]();

        expect(component[handler]).toHaveBeenCalled();
      });
    });
  });

 describe('initModal', () => {

    it('should initialize modal correctly', () => {

      const mockModalElement = { modalElement: true };
      const modalOptions = { modalOptions: true };

      spyOn(component.renderer, 'invokeElementMethod');

      component.modalElement = <any>mockModalElement;
      component.options = modalOptions;
      component.initModal();

      expect(component.renderer.invokeElementMethod).toHaveBeenCalledWith(mockModalElement, 'modal', [modalOptions]);
    });
  });

  describe('handleProperties', () => {

    it('should call HandlePropChanges.executePropHandlers', () => {

      spyOn(HandlePropChanges.prototype, 'executePropHandlers');

      component.handleProperties();

      expect(HandlePropChanges.prototype.executePropHandlers).toHaveBeenCalled();
    });
  });

  describe('handleOptions', () => {

    it('should emit onClose when no options is not provided', () => {

      spyOn(component.onClose, 'emit');

      component.options = undefined;
      component.handleOptions();

      expect(component.options.complete).not.toBeUndefined();

      component.options.complete();

      expect(component.onClose.emit).toHaveBeenCalled();
    });

    it('should emit onClose when option is provided without complete callback', () => {

      spyOn(component.onClose, 'emit');

      component.options = { opacity: 0.5 };
      component.handleOptions();

      expect(component.options.complete).not.toBeUndefined();

      component.options.complete();

      expect(component.onClose.emit).toHaveBeenCalled();
    });

    it('should modify complete callback to emit onClose when option is provided with complete callback', () => {

      spyOn(console, 'log');
      spyOn(component.onClose, 'emit');

      component.options = { opacity: 0.5, complete: () => console.log('console-x') };
      component.handleOptions();

      expect(component.options.complete).not.toBeUndefined();

      component.options.complete();

      expect(console.log).toHaveBeenCalledWith('console-x');
      expect(component.onClose.emit).toHaveBeenCalled();
    });
  });

  describe('open', () => {

    it('should invoke open method on modal', () => {

      const mockModalElement = { modalElement: true };
      const modalOptions = { modalOptions: true };

      spyOn(component.renderer, 'invokeElementMethod');

      component.modalElement = <any>mockModalElement;
      component.options = modalOptions;
      component.open();

      expect(component.renderer.invokeElementMethod).toHaveBeenCalledWith(mockModalElement, 'modal', ['open']);
    });
  });

  describe('close', () => {

    it('should invoke close method on modal', () => {

      const mockModalElement = { modalElement: true };
      const modalOptions = { modalOptions: true };

      spyOn(component.renderer, 'invokeElementMethod');

      component.modalElement = <any>mockModalElement;
      component.options = modalOptions;
      component.close();

      expect(component.renderer.invokeElementMethod).toHaveBeenCalledWith(mockModalElement, 'modal', ['close']);
    });
  });
});
