import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

@Injectable()
export class MzInjectionService {
  private container: Element;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  /**
   * Appends a component to an adjacent location.
   *
   * @template T
   * @param {Type<T>} componentClass
   * @param {*} [options={}]
   * @param {Element} [location=this.getContainerElement()]
   * @returns {ComponentRef<T>}
   * @memberof MzInjectionService
   */
  appendComponent<T>(
    componentClass: Type<T>,
    options: any = {},
    location: Element = this.getContainerElement(),
  ): ComponentRef<T> {
    // instantiate component to load
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = componentFactory.create(this.injector);

    // project the options passed to the component instance
    this.projectComponentInputs(componentRef, options);

    // attach view for dirty checking
    this.applicationRef.attachView(componentRef.hostView);

    // detach view when component is destroyed
    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    // append component to location in the DOM where we want it to be rendered
    const componentRootNode = this.getComponentRootNode(componentRef);
    location.appendChild(componentRootNode);

    return componentRef;
  }

  /**
   * Overrides the default container element.
   *
   * @param {Element} container
   * @memberof MzInjectionService
   */
  setRootViewContainer(container: Element): void {
    this.container = container;
  }

  /**
   * Gets the html element for a component ref.
   *
   * @private
   * @param {ComponentRef<any>} componentRef
   * @returns {Element}
   * @memberof MzInjectionService
   */
  private getComponentRootNode(componentRef: ComponentRef<any>): Element {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as Element;
  }

  /**
   * Gets the container element.
   *
   * @private
   * @returns {Element}
   * @memberof MzInjectionService
   */
  private getContainerElement(): Element {
    return this.container || document.body;
  }

  /**
   * Projects the inputs onto the component.
   *
   * @private
   * @template T
   * @param {ComponentRef<T>} component
   * @param {*} options
   * @returns {ComponentRef<T>}
   * @memberof MzInjectionService
   */
  private projectComponentInputs<T>(component: ComponentRef<T>, options: any): ComponentRef<T> {
    if (options) {
      const props = Object.getOwnPropertyNames(options);
      for (const prop of props) {
        component.instance[prop] = options[prop];
      }
    }
    return component;
  }
}
