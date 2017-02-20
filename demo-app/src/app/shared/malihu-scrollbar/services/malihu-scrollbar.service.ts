import { Injectable } from '@angular/core';

type ScrollElement = string | JQuery | HTMLElement;

@Injectable()
export class MalihuScrollbarService {

  constructor() { }

  initScrollbar(element: ScrollElement, options: MCustomScrollbar.CustomScrollbarOptions) {
    this.getElement(element).mCustomScrollbar(options);
  }

  scrollTo(element: ScrollElement, parameter: any, options: MCustomScrollbar.ScrollToParameterOptions) {
    this.getElement(element).mCustomScrollbar('scrollTo', parameter, options);
  }

  update(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('update');
  }

  stop(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('stop');
  }

  disable(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('disable');
  }

  destroy(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('destroy');
  }

  private getElement(element: ScrollElement): JQuery {
    if (typeof element === 'string' || element instanceof String) {
      return $(element);
    }
    if ((typeof element === 'object' || element instanceof Object) && element instanceof HTMLElement) {
      return $(element);
    }
    if (element instanceof jQuery || 'jquery' in Object(element)) {
      return element;
    }
    throw Error(`Unsupported element type in MalihuScrollbarService: ${element}`);
  }
}
