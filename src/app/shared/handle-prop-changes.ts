import { OnChanges, SimpleChanges } from '@angular/core';

export class HandlePropChanges implements OnChanges {
  handlers: Object;

  ngOnChanges(changes: SimpleChanges) {
    if (this.handlers) {
      this.executePropHandlers(changes);
    }
  }

  executePropHandlers(props = this.handlers) {
    Object.keys(props).forEach((prop) => {
      if (this.handlers[prop]) {
        this.handlers[prop]();
      }
    });
  }
}
