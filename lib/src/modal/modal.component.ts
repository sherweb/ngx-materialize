import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer,
  ViewChild,
} from '@angular/core';

import { HandlePropChanges } from '../shared/index';

@Component({
  selector: 'mz-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class MzModalComponent extends HandlePropChanges implements OnInit, AfterViewInit {
  @Input() bottomSheet: boolean;
  @Input() fixedFooter: boolean;
  @Input() fullscreen: boolean;
  @Input() options: Materialize.ModalOptions;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modal') modalElementRef: ElementRef;

  modalElement: JQuery;

  constructor(public renderer: Renderer) {
    super();
  }

  ngOnInit() {
    this.initHandlers();
    this.initElements();
    this.handleProperties();
  }

  ngAfterViewInit() {
    this.initModal();
  }

  initElements() {
    this.modalElement = $(this.modalElementRef.nativeElement);
  }

  initHandlers() {
    this.handlers = {
       options: () => this.handleOptions(),
    };
  }

  initModal() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', [this.options]);
  }

  handleProperties() {
    super.executePropHandlers();
  }

  handleOptions() {
    // extend complete function to emit close event on callback return
    const originalCompleteFn = this.options && this.options.complete || (() => {});
    this.options = Object.assign({}, this.options, {
      complete: () => {
        originalCompleteFn();
        this.close.emit();
      },
    });
  }

  openModal() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', ['open']);
  }

  closeModal() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', ['close']);
  }
}

// Declare the tags to avoid error: '<mz-modal-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-modal-header' }) export class MzModalHeaderDirective { }
@Directive({ selector: 'mz-modal-content' }) export class MzModalContentDirective { }
@Directive({ selector: 'mz-modal-footer' }) export class MzModalFooterDirective { }
