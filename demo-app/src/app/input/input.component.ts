import { AfterViewInit, Component, OnInit, Renderer } from '@angular/core';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routes.animation';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class InputComponent implements AfterViewInit, OnInit {

  autocomplete: { data: { [key: string]: string } };

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.setAutocomplete();
  }

  ngAfterViewInit() {
    this.forceValidate();
  }

  forceValidate() {
    // need setTimeout otherwise loading directly on the page doesn't trigger the validation
    setTimeout(() => {
      this.renderer.invokeElementMethod($('#valid-input, #invalid-input'), 'trigger', ['blur']);
    });
  }

  setAutocomplete() {
    this.autocomplete = {
      data: {
        Apple: null,
        Microsoft: null,
        Google: 'assets/google_g_logo.png',
      },
    };
  }
}
