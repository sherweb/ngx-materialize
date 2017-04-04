import { ElementRef, Renderer } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
      spyOn(component, 'initElements').and.callFake(() => callOrder.push('initElements'));
      spyOn(component, 'initModal').and.callFake(() => callOrder.push('initModal'));
    });

    it('should call init methods correctly', () => {

      component.ngOnInit();

      expect(component.initElements).toHaveBeenCalled();
      expect(callOrder[0]).toBe('initElements');

      expect(component.initModal).toHaveBeenCalled();
      expect(callOrder[1]).toBe('initModal');
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
