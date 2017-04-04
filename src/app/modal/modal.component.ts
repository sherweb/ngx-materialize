import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'mz-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class MzModalComponent implements OnInit {
  @Input() bottomSheet: boolean;
  @Input() fixedFooter: boolean;
  @Input() fullscreen: boolean;
  @Input() options: Materialize.ModalOptions;

  @ViewChild('modal') modalElementRef: ElementRef;

  modalElement: JQuery;

  constructor(
    public renderer: Renderer,
  ) { }

  ngOnInit() {
    this.initElements();
    this.initModal();
  }

  initElements() {
    this.modalElement = $(this.modalElementRef.nativeElement);
  }

  initModal() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', [this.options]);
  }

  open() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', ['open']);
  }

  close() {
    this.renderer.invokeElementMethod(this.modalElement, 'modal', ['close']);
  }
}

// Declare the tags to avoid error: '<mz-modal-x>' is not a known element
// https://github.com/angular/angular/issues/11251
// tslint:disable: directive-selector
@Directive({ selector: 'mz-modal-header' }) export class MzModalHeaderDirective { }
@Directive({ selector: 'mz-modal-content' }) export class MzModalContentDirective { }
@Directive({ selector: 'mz-modal-footer' }) export class MzModalFooterDirective { }
