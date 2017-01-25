import { OnChanges, SimpleChanges } from '@angular/core';

export class HandlePropChanges implements OnChanges {
  protected handlers: Object;

  ngOnChanges(changes: SimpleChanges) {
    if (this.handlers) {
      this.handleProperties(changes);
    }
  }

  handleProperties(props = this.handlers) {
    Object.keys(props).forEach((prop) => {
      if (this.handlers[prop]) {
        this.handlers[prop]();
      }
    });
  }
}
