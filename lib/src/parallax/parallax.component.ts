import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer,
  ViewChild } from '@angular/core';

@Component({
  selector: 'mz-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss'],
})
export class MzParallaxComponent implements AfterViewInit {
  @Input() height: number;

  @ViewChild('parallax') parallax: ElementRef;
  @ViewChild('parallaxContainer') parallaxContainer: ElementRef;

  constructor(public renderer: Renderer) { }

  ngAfterViewInit(): void {
    this.renderer.setElementStyle(this.parallaxContainer.nativeElement, 'height', isNaN(this.height) ? '500px' : this.height + 'px');
    this.renderer.invokeElementMethod($(this.parallax.nativeElement), 'parallax');
  }
}
