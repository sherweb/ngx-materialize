import { Injectable } from '@angular/core';

@Injectable()
export class MzToastService {

  show(message: string, displayLength: number, className?: string, completeCallback?: Function) {
    Materialize.toast(message, displayLength, className, completeCallback);
  }
}
