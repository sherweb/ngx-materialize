import { Component, OnInit, Renderer } from '@angular/core';
import { MzModalService } from 'ngx-materialize';

import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import { IPropertyRow } from '../shared/properties-table/properties-table.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class ModalComponent implements OnInit {

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      alert('Ready');
      console.log(modal, trigger);
    },
    complete: () => alert('Closed'), // Callback for Modal close
  };

  properties: IPropertyRow[] = [
    { name: 'bottomSheet',
      mandatory: false,
      type: 'boolean',
      description: 'Show modal on bottom of the screen',
      defaultValue: 'false',
    },
    { name: 'fixedFooter',
      mandatory: false,
      type: 'boolean',
      description: 'Footer always visible when content is scrollable',
      defaultValue: 'false',
    },
    { name: 'fullscreen',
      mandatory: false,
      type: 'boolean',
      description: 'Show modal in fullscreen state',
      defaultValue: 'false',
    },
    { name: 'options',
      mandatory: false,
      type: 'Materialize.ModalOptions',
      description: 'Customize behavior of a modal',
    },
  ];

  constructor(
    private modalService: MzModalService,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
    // initialize scrollspy
    const scrollSpy = $('.scrollspy');
    this.renderer.invokeElementMethod(scrollSpy, 'scrollSpy');
  }

  openServiceModal() {
    this.modalService.open(ModalExampleComponent);
  }
}
