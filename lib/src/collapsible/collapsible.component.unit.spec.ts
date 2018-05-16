import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzCollapsibleComponent } from './collapsible.component';

describe('MzCollapsibleComponent:unit', () => {
  let component: MzCollapsibleComponent;
  let fixture: ComponentFixture<MzCollapsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzCollapsibleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should call handleDataCollapsible function', () => {
      spyOn(component, 'handleDataCollapsible');

      component.ngAfterViewInit();

      expect(component.handleDataCollapsible).toHaveBeenCalled();
    });

    it('should call initCollapsible function', () => {
      spyOn(component, 'initCollapsible');

      component.initCollapsible();

      expect(component.initCollapsible).toHaveBeenCalled();
    });
  });

  describe('handleDataCollapsible', () => {

    it('should set data collapsible value when provided', () => {

      component.mode = 'accordion';

      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleDataCollapsible();

      expect(component.renderer.setElementAttribute)
        .toHaveBeenCalledWith(
          component.collapsible.nativeElement,
          'data-collapsible',
          component.mode);
    });

    it('should not set data collapsible value when not provided', () => {

      spyOn(component.renderer, 'setElementAttribute').and.callThrough();

      component.handleDataCollapsible();

      expect(component.renderer.setElementAttribute).not.toHaveBeenCalled();
    });
  });

  describe('initCollapsible', () => {

    it('should initialize collapsible using jquery', async(() => {

      component.onClose = () => {};
      component.onOpen = () => {};

      const mockCollapsibleElement = { collapsible: (options: Materialize.CollapsibleOptions) => { } };

      spyOn(mockCollapsibleElement, 'collapsible');

      spyOn(window, '$').and.callFake((selector: any) => {
        return selector === component.collapsible.nativeElement
        ? mockCollapsibleElement
        : {};
      });

      component.initCollapsible();

      const expectCollapsibleOption = <Materialize.CollapsibleOptions> {
        accordion: false,
        onClose: component.onClose,
        onOpen: component.onOpen,
      };

      expect(mockCollapsibleElement.collapsible).toHaveBeenCalledWith(expectCollapsibleOption);
    }));
  });

  describe('open', () => {

    it('should open collapsible item with specified index', () => {

      const mockCollapsibleElement = { collapsible: (method: string, index: number) => { } };

      spyOn(window, '$').and.callFake((selector: any) => {
        return selector === component.collapsible.nativeElement
          ? mockCollapsibleElement
          : {};
      });

      spyOn(mockCollapsibleElement, 'collapsible');

      component.open(0);

      expect(mockCollapsibleElement.collapsible).toHaveBeenCalledWith('open', 0);
    });
  });

  describe('close', () => {

    it('should close collapsible item with specified index', () => {

      const mockCollapsibleElement = { collapsible: (method: string, index: number) => { } };

      spyOn(window, '$').and.callFake((selector: any) => {
        return selector === component.collapsible.nativeElement
          ? mockCollapsibleElement
          : {};
      });

      spyOn(mockCollapsibleElement, 'collapsible');

      component.close(0);

      expect(mockCollapsibleElement.collapsible).toHaveBeenCalledWith('close', 0);
    });
  });
});
