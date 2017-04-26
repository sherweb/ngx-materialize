import { Component, ElementRef } from '@angular/core';

import { async, TestBed } from '@angular/core/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';
import { MzRemoveComponentHost } from './remove-component-host';

@Component({
  selector: `mz-test-remove-host`,
  template: `
    <div class="list">
      <ul>
        <li class="one">One</li>
        <li class="two">Two</li>
        <li class="three">Three</li>
      </ul>
    </div>
    <div class="empty">Empty</div>
  `,
})
class MzTestRemoveHostComponent extends MzRemoveComponentHost {
  constructor(public elementRef: ElementRef) {
    super(elementRef);
   }
 }

describe('MzRemoveComponentHost:view', () => {

  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzTestRemoveHostComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('ngOnInit', () => {

    it('should move children out of the component and delete the component tag', async(() => {

      buildComponent(
        `<mz-test-remove-host></mz-test-remove-host>`,
      ).then(fixture => {
        fixture.detectChanges();
        nativeElement = fixture.nativeElement;


        expect(nativeElement.querySelector('z-test-remove-host')).toBeNull();
        expect(nativeElement.querySelector('div.list')).toBeTruthy();

        const firstLiElement: HTMLElement = nativeElement.querySelector('div.list ul li.one');
        expect(firstLiElement).toBeTruthy();
        expect(firstLiElement.innerText).toBe('One');

        const secondLiElement: HTMLElement = nativeElement.querySelector('div.list ul li.two');
        expect(secondLiElement).toBeTruthy();
        expect(secondLiElement.innerText).toBe('Two');

        const threeLiElement: HTMLElement = nativeElement.querySelector('div.list ul li.three');
        expect(threeLiElement).toBeTruthy();
        expect(threeLiElement.innerText).toBe('Three');

        const divEmptyElement: HTMLElement = nativeElement.querySelector('div.empty');
        expect(divEmptyElement).toBeTruthy();
        expect(divEmptyElement.innerText).toBe('Empty');
      });
    }));
  });
});
