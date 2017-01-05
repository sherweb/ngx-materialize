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

  describe('ngOnInit', () => {

    it('should initilize closeOnClickLister property', () => {

      component.closeOnClickListeners = undefined;

      component.ngOnInit();

      expect(component.closeOnClickListeners).toBeDefined();
      expect(component.closeOnClickListeners.length).toBe(0);
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call init functions', () => {

      spyOn(component, 'initCollapseButton');
      spyOn(component, 'initCollapsibleLinks');
      spyOn(component, 'fixCloseOnClick');

      component.ngAfterViewInit();

      expect(component.initCollapseButton).toHaveBeenCalled();
      expect(component.initCollapsibleLinks).toHaveBeenCalled();
      expect(component.fixCloseOnClick).toHaveBeenCalled();
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

    it('should remove closeOnClick listeners', () => {

      const spyListeners = jasmine.createSpyObj('spyListeners', ['method1', 'method2', 'method3']);

      Object.keys(spyListeners).forEach(listener => {
        component.closeOnClickListeners.push(spyListeners[listener]);
      });

      component.ngOnDestroy();

      Object.keys(spyListeners).forEach(listener => {
        expect(spyListeners[listener]).toHaveBeenCalled();
      });
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

  describe('fixCloseOnClick', () => {

    function createSidenavLink(collapsible?: boolean): void {
      const link = document.createElement('a');
      if (collapsible) {
        link.classList.add('collapsible-header');
      }
      const header = document.createElement('li');
      header.appendChild(link);
      $(fixture.nativeElement).find('.side-nav').append(header);
    }

    describe('non-collapsible link', () => {
      let renderedLink: HTMLElement;
      const mockCollapseButton = { sideNav: (method: string) => {} };
      const mockWindow = { width: () => 0 };

      beforeEach(() => {

        createCollapseButton(collapseButtonId);
        component.collapseButtonId = collapseButtonId;

        createSidenavLink();

        component.fixCloseOnClick();

        renderedLink = $(fixture.nativeElement).find('li a')[0];

        spyOn(mockCollapseButton, 'sideNav');

        spyOn(window, '$').and.callFake((selector: string): any => {
          return selector === `#${collapseButtonId}`
            ? mockCollapseButton
            : mockWindow;
        });
      });

      it('should hide sidenav on click when screen width < 992px', () => {

        spyOn(mockWindow, 'width').and.returnValue(991);

        renderedLink.click();

        expect(mockCollapseButton.sideNav).toHaveBeenCalledWith('hide');
      });

      it('should not hide sidenav on click when screen width >= 992px', () => {

        spyOn(mockWindow, 'width').and.returnValue(992);

        renderedLink.click();

        expect(mockCollapseButton.sideNav).not.toHaveBeenCalled();
      });

      it('should keep track of listeners', () => {

        expect(component.closeOnClickListeners.length).toBe(1);
      });
    });

    describe('collapsible link', () => {

      let renderedLink: HTMLElement;
      const mockCollapseButton = { sideNav: (method: string) => {} };
      const mockWindow = { width: () => 0 };

      beforeEach(() => {

        createCollapseButton(collapseButtonId);
        component.collapseButtonId = collapseButtonId;

        createSidenavLink(true);

        component.fixCloseOnClick();

        renderedLink = $(fixture.nativeElement).find('li a')[0];

        spyOn(mockCollapseButton, 'sideNav');

        spyOn(window, '$').and.callFake((selector: string): any => {
          return selector === `#${collapseButtonId}`
            ? mockCollapseButton
            : mockWindow;
        });
      });

      it('should not hide sidenav when screen width < 992px', () => {

        spyOn(mockWindow, 'width').and.returnValue(991);

        renderedLink.click();

        expect(mockCollapseButton.sideNav).not.toHaveBeenCalled();
      });

      it('should not hide sidenav when screen width >= 992px', () => {

        spyOn(mockWindow, 'width').and.returnValue(992);

        renderedLink.click();

        expect(mockCollapseButton.sideNav).not.toHaveBeenCalled();
      });

      it('should not keep track of listeners', () => {

        expect(component.closeOnClickListeners.length).toBe(0);
      });
    });
  });
});
