import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzParallaxComponent } from './parallax.component';


describe('MzParallaxComponent:unit', () => {
  let component: MzParallaxComponent;
  let fixture: ComponentFixture<MzParallaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzParallaxComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should set parallax container default height value when not provided', () => {

      spyOn(component.renderer, 'setElementStyle').and.callThrough();

      component.ngAfterViewInit();

      expect(component.renderer.setElementStyle)
        .toHaveBeenCalledWith(
          component.parallaxContainer.nativeElement,
          'height',
          '500px');
    });

    it('should set parallax container height value when provided', () => {

      spyOn(component.renderer, 'setElementStyle').and.callThrough();

      component.height = 300;
      component.ngAfterViewInit();

      expect(component.renderer.setElementStyle)
        .toHaveBeenCalledWith(
          component.parallaxContainer.nativeElement,
          'height',
          component.height + 'px');
    });

    it('shoul initialize parallax using jquery', () => {

      const parallaxSpy = spyOn($.fn, 'parallax');

      component.ngAfterViewInit();

      expect(parallaxSpy).toHaveBeenCalledTimes(1);
      expect(parallaxSpy.calls.mostRecent().object.context).toBe(component.parallax.nativeElement);
    });
  });
});
