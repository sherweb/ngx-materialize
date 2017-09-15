import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MzTabComponent } from './tab.component';

describe('MzTabComponent:unit', () => {
  let component: MzTabComponent;
  let fixture: ComponentFixture<MzTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MzTabComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initTab', () => {

    function forceSetTimeoutEnd() {
      tick(1); // force setTimeout execution
    }

    it('should initialize tab using jquery', fakeAsync(() => {

      component.onShow = () => {};
      component.responsiveThreshold = 300;
      component.swipeable = true;

      const mockJQueryTabNativeElement = { tab: true };

      spyOn(component.renderer, 'invokeElementMethod');

      spyOn(window, '$').and.callFake((selector: any) => {
        return selector === component.tabs.nativeElement
          ? mockJQueryTabNativeElement
          : {};
      });

      component.initTabs();

      forceSetTimeoutEnd();

      expect(component.renderer.invokeElementMethod)
        .toHaveBeenCalledWith(
          mockJQueryTabNativeElement,
          'tabs', [{
            onShow: component.onShow,
            responsiveThreshold: 300,
            swipeable: true,
          }],
        );
    }));

    describe('initTab', () => {
      it('should initialize tab using jquery', fakeAsync(() => {

        const mockJQueryTabNativeElement = { tab: true };

        spyOn(component.renderer, 'invokeElementMethod');

        spyOn(window, '$').and.callFake((selector: any) => {
          return selector === component.tabs.nativeElement
            ? mockJQueryTabNativeElement
            : {};
        });

        component.selectTab('tab1');

        expect(component.renderer.invokeElementMethod)
        .toHaveBeenCalledWith(
          mockJQueryTabNativeElement,
          'tabs',
          [
            'select_tab',
            'tab1',
          ],
        );
      }));
    });
  });
});
