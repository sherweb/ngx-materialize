import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavComponent } from './sidenav.component';

describe('MzSidenavComponent:unit', () => {
  let component: MzSidenavComponent;
  let fixture: ComponentFixture<MzSidenavComponent>;

  const collapseButtonId = 'btn-collapse-id';

  function createCollapseButton(id: string): void {
    // create fake collapse button in DOM
    const collapseButton = document.createElement('a');
    collapseButton.setAttribute('id', id);
    document.body.appendChild(collapseButton);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const collapseButton = $(`#${collapseButtonId}`);
    if (collapseButton.remove) {
      collapseButton.remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {

    it('should call init functions', () => {

      spyOn(component, 'initCollapseButton');
      spyOn(component, 'initCollapsibleLinks');

      component.ngAfterViewInit();

      expect(component.initCollapseButton).toHaveBeenCalled();
      expect(component.initCollapsibleLinks).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {

    beforeEach(() => {
      createCollapseButton(collapseButtonId);
      component.collapseButtonId = collapseButtonId;
    });

    it('should destroy sidenav', () => {

      const mockCollapseButton = { sideNav: () => {} };

      spyOn(mockCollapseButton, 'sideNav');

      spyOn(window, '$').and.callFake((selector: string): any => {
        return selector === `#${collapseButtonId}`
          ? mockCollapseButton
          : {};
      });

      component.ngOnDestroy();

      expect(mockCollapseButton.sideNav).toHaveBeenCalledWith('destroy');
    });
  });

  describe('initCollapseButton', () => {

    function queryById(id: string): JQuery {
      return $(`#${collapseButtonId}`);
    }

    describe('when no collapseButtonId is provided', () => {

      beforeEach(() => {
        createCollapseButton(collapseButtonId);
      });

      it('should not add show-on-large css class on collapsable button when fixed', () => {

        component.fixed = true;
        component.initCollapseButton();

        expect(queryById(collapseButtonId)[0].classList).not.toContain('show-on-large');
      });

      it('should not add data-activates attribute on collapse button', () => {

        component.id = 'sidenav-id';
        component.initCollapseButton();

        expect(queryById(collapseButtonId).data('activates')).toBeUndefined();
      });

      it('should not initialize sidenav through collapse button', () => {

        spyOn($.fn, 'sideNav');

        component.initCollapseButton();

        expect($.fn.sideNav).not.toHaveBeenCalled();
      });
    });

    describe('when collapseButtonId is provided', () => {

      beforeEach(() => {
        createCollapseButton(collapseButtonId);
        component.collapseButtonId = collapseButtonId;
      });

      it('should not add show-on-large css class on collapsable button when fixed', () => {

        component.fixed = true;
        component.initCollapseButton();

        expect(queryById(collapseButtonId)[0].classList).not.toContain('show-on-large');
      });

      it('should add show-on-large css class on collapsable button when not fixed', () => {

        component.initCollapseButton();

        expect(component.fixed).toBeFalsy();
        expect(queryById(collapseButtonId)[0].classList).toContain('show-on-large');
      });

      it('should add data-activates attribute on collapse button', () => {

        const sidenavId = 'sidenav-id';

        component.id = sidenavId;
        component.initCollapseButton();

        expect(queryById(collapseButtonId).data('activates')).toBe(sidenavId);
      });

      it('should initialize sidenav through collapse button with default value', () => {

        spyOn($.fn, 'sideNav');

        component.initCollapseButton();

        expect($.fn.sideNav).toHaveBeenCalledWith({
          closeOnClick: false,
          edge: 'left',
          menuWidth: 300,
        });
      });

      it('should initialize sidenav through collapse button with provided value', () => {

        spyOn($.fn, 'sideNav');

        component.closeOnClick = true;
        component.edge = 'right';
        component.width = 240;
        component.initCollapseButton();

        expect($.fn.sideNav).toHaveBeenCalledWith({
          closeOnClick: component.closeOnClick,
          edge: component.edge,
          menuWidth: component.width,
        });
      });
    });
  });

  describe('initCollapsibleLinks', () => {

    it('should initialize collapsible elements', () => {

      const mockCollapsible = { collapsible: () => {} };
      const mockOther = {
        attr: () => {},
        sideNav: () => {},
        addClass: () => {},
      };

      spyOn(mockCollapsible, 'collapsible');

      spyOn(window, '$').and.callFake((selector: string): any => {
        return selector === '.collapsible'
          ? mockCollapsible
          : mockOther;
      });

      component.initCollapsibleLinks();

      expect(mockCollapsible.collapsible).toHaveBeenCalled();
    });
  });
});
