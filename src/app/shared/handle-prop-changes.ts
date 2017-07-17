import { OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

export abstract class Handlers {
   [propertyName: string]: Function;
}

export class HandlePropChanges implements OnChanges {
  handlers: Handlers;

  ngOnChanges(changes: SimpleChanges) {
    if (this.handlers) {
      this.executePropHandlers(changes);
    }
  }

  executePropHandlers(props: Handlers | SimpleChanges = this.handlers) {
    Object.keys(props).forEach(prop => {
      if (this.handlers[prop]) {
        const previousValue = (props[prop] as SimpleChange).previousValue;
        this.handlers[prop](previousValue);
      }
    });
  }
}
