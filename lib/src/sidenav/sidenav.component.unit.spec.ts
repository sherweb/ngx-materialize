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
    if (collapseButton && collapseButton.remove) {
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

      const mockCollapseButton = <JQuery>{ sideNav: () => {} };

      spyOn(mockCollapseButton, 'sideNav');

      component['collapseButton'] = mockCollapseButton;

      component.ngOnDestroy();

      expect(mockCollapseButton.sideNav).toHaveBeenCalledWith('destroy');
    });
  });

  describe('initCollapseButton', () => {

    function queryById(id: string): JQuery {
      return $(`#${id}`);
    }

    describe('when no collapseButtonId is provided', () => {

      beforeEach(() => {
        createCollapseButton(collapseButtonId);
      });

      it('should not add data-activates attribute on collapse button', () => {

        component.id = 'sidenav-id';
        component.initCollapseButton();

        expect(queryById(collapseButtonId).data('activates')).toBeUndefined();
      });

      it('should initialize sidenav through empty template', () => {

        const template = document.createElement('template');
        const mockTemplate = {
          sideNav: () => {},
          addClass: () => {},
          attr: () => {},
        };

        spyOn(mockTemplate, 'sideNav');

        spyOn(window, '$').and.callFake((selector: HTMLElement): any => {
          return selector.nodeName === 'TEMPLATE'
            ? mockTemplate
            : null;
        });

        component.initCollapseButton();

        expect(mockTemplate.sideNav).toHaveBeenCalled();
      });
    });

    describe('when collapseButtonId is provided', () => {

      beforeEach(() => {
        createCollapseButton(collapseButtonId);
        component.collapseButtonId = collapseButtonId;
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
          draggable: true,
          edge: 'left',
          menuWidth: 300,
          onClose: jasmine.any(Function),
          onOpen: jasmine.any(Function),
        });
      });

      it('should initialize sidenav through collapse button with provided value', () => {

        spyOn($.fn, 'sideNav');

        component.closeOnClick = true;
        component.draggable = false;
        component.edge = 'right';
        component.width = 240;
        component.onClose = () => console.log('onClose');
        component.onOpen = () => console.log('onOpen');
        component.initCollapseButton();

        expect($.fn.sideNav).toHaveBeenCalledWith({
          closeOnClick: component.closeOnClick,
          draggable: false,
          edge: component.edge,
          menuWidth: component.width,
          onClose: component.onClose,
          onOpen: component.onOpen,
        });
      });
    });
  });

  describe('initCollapsibleLinks', () => {

    it('should initialize collapsible elements', () => {

      const sidenavId = 'sidenav-id';
      const mockCollapsible = { collapsible: () => {} };
      const mockOther = {
        attr: () => {},
        sideNav: () => {},
        addClass: () => {},
      };

      spyOn(mockCollapsible, 'collapsible');

      spyOn(window, '$').and.callFake((selector: string): any => {
        return selector === `#${sidenavId} .collapsible`
          ? mockCollapsible
          : mockOther;
      });

      component.id = sidenavId;
      component.initCollapsibleLinks();

      expect(mockCollapsible.collapsible).toHaveBeenCalled();
    });
  });
});
