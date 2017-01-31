import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzBadgeComponent } from './badge.component';

describe('MzBadgeComponent:unit', () => {
  let component: MzBadgeComponent;
  let fixture: ComponentFixture<MzBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzBadgeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call handleCaption function', () => {
      spyOn(component, 'handleCaption');

      component.ngOnInit();

      expect(component.handleCaption).toHaveBeenCalled();
    });
  });

  describe('handleCaption', () => {
    it('should set caption value when provided', () => {
      component.caption = 'My Caption';

      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleCaption();

      expect(component.renderer.setElementAttribute)
        .toHaveBeenCalledWith(
          component.badge.nativeElement,
          'data-badge-caption',
          component.caption);
    });

    it('should not set caption value when not provided', () => {
      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleCaption();

      expect(component.renderer.setElementAttribute).not.toHaveBeenCalled();
    });
  });
});
