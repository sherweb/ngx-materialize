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
  private container: ComponentRef<any>;

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
   * @param {Element} [location=this.getRootViewContainerNode()]
   * @returns {ComponentRef<T>}
   *
   * @memberOf MzInjectionService
   */
  appendComponent<T>(
    componentClass: Type<T>,
    options: any = {},
    location: Element = this.getRootViewContainerNode(),
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
   * Overrides the default root view container.
   *
   * @param {any} container
   *
   * @memberOf MzInjectionService
   */
  setRootViewContainer(container: any): void {
    this.container = container;
  }

  /**
   * Gets the root view container to inject the component to.
   *
   * @template T
   * @returns {ComponentRef<T>}
   *
   * @memberOf MzInjectionService
   */
  private getRootViewContainer<T>(): ComponentRef<T> {
    if (this.container) {
      return this.container;
    }

    const rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents.length) {
      return rootComponents[0];
    }

    throw Error('View Container not found! It needs to be manually set via setRootViewContainer.');
  }

  /**
   * Gets the html element for a component ref.
   *
   * @param {ComponentRef<any>} componentRef
   * @returns {HTMLElement}
   *
   * @memberOf MzInjectionService
   */
  private getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Gets the root component container html element.
   *
   * @returns {HTMLElement}
   *
   * @memberOf MzInjectionService
   */
  private getRootViewContainerNode(): HTMLElement {
    const rootViewContainer = this.getRootViewContainer();
    return this.getComponentRootNode(rootViewContainer);
  }

  /**
   * Projects the inputs onto the component.
   *
   * @param {ComponentRef<any>} component
   * @param {*} options
   * @returns {ComponentRef<any>}
   *
   * @memberOf MzInjectionService
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
