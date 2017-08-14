import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer,
} from '@angular/core';

import { HandlePropChanges } from '../../shared/handle-prop-changes';

@Component({
  selector: 'mz-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent extends HandlePropChanges implements OnInit {
  @Input() active: boolean;
  @Input() disabled: boolean;
  @Input() label;
  @Input() target: string;
  @Input('tabs') tabs: ElementRef;

  liElement: HTMLElement;

  get link(): string {
    return this.label.replace(/\s+/g, '-').toLowerCase();
  }

  constructor(private renderer: Renderer) {
    super();
  }

  ngOnInit() {
    this.initElements();
  }

  createTabItemLabel(): HTMLElement {
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');

    liElement.classList.add('col', 'tab');

    linkElement.setAttribute('href', this.link);

   liElement.appendChild(linkElement);

   this.tabs.nativeElement.appendChild(liElement);

   return liElement;
  }

  handleActive() {
    this.renderer.setElementClass(this.liElement.querySelector('a'), 'active', this.active);
  }

  handleDisabled() {
    this.renderer.setElementClass(this.liElement, 'disabled', this.disabled);
  }

  handleLabel() {
    this.renderer.invokeElementMethod(this.liElement.querySelector('a'), 'text' [this.label]);
  }

  handleProperties() {
    super.executePropHandlers();
  }

  initElements() {
    this.liElement = this.createTabItemLabel();
  }

  initHandlers() {
    this.handlers = {
      active: () => this.handleActive(),
      disabled: () => this.handleDisabled(),
      label: () => this.handleLabel(),
    };
  }
}
