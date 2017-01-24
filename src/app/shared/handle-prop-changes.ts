import { OnChanges } from '@angular/core';

export class HandlePropChanges implements OnChanges {
  private handlers: Object;

  ngOnChanges(changes: SimpleChange) {
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
