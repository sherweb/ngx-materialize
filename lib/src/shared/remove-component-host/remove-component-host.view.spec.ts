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

  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MzTestRemoveHostComponent,
        MzTestWrapperComponent,
      ],
    });
  }));

  describe('ngOnInit', () => {

    it('should move children out of the component and keep the component tag', async(() => {

      buildComponent<MzTestRemoveHostComponent>(
        `<mz-test-remove-host></mz-test-remove-host>`,
      ).then(fixture => {
        fixture.detectChanges();
        nativeElement = fixture.nativeElement;

        const divListElement = nativeElement.querySelector('div.list') as HTMLElement;
        const divEmptyElement = nativeElement.querySelector('div.empty') as HTMLElement;
        const mzTestRemoveHost = nativeElement.querySelector('mz-test-remove-host') as HTMLElement;

        // children has been moved out and component tag kept
        expect(nativeElement.childElementCount).toBe(3);
        expect(divListElement).toBeTruthy();
        expect(divEmptyElement).toBeTruthy();
        expect(mzTestRemoveHost).toBeTruthy();

        // component tag is empty
        expect(mzTestRemoveHost.childElementCount).toBe(0);

        // children content has been moved correctly
        const firstLiElement = divListElement.querySelector('ul li.one') as HTMLElement;
        expect(firstLiElement).toBeTruthy();
        expect(firstLiElement.innerText).toBe('One');

        const secondLiElement = divListElement.querySelector('ul li.two') as HTMLElement;
        expect(secondLiElement).toBeTruthy();
        expect(secondLiElement.innerText).toBe('Two');

        const thirdLiElement = divListElement.querySelector('ul li.three') as HTMLElement;
        expect(thirdLiElement).toBeTruthy();
        expect(thirdLiElement.innerText).toBe('Three');

        expect(divEmptyElement).toBeTruthy();
        expect(divEmptyElement.childElementCount).toBe(0);
        expect(divEmptyElement.innerText).toBe('Empty');
      });
    }));
  });

  describe('ngOnDestroy', () => {

    it('should remove moved out element', async(() => {

      buildComponent<{ visible: boolean }>(
        `<mz-test-remove-host *ngIf="visible"></mz-test-remove-host>`,
        { visible: true },
      ).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const mzTestRemoveHost = () => nativeElement.querySelector('mz-test-remove-host') as HTMLElement;

        expect(mzTestRemoveHost()).toBeTruthy();
        expect(nativeElement.childElementCount).toBe(3);

        fixture.componentInstance.visible = false;
        fixture.detectChanges();

        expect(mzTestRemoveHost()).toBeFalsy();
        expect(nativeElement.childElementCount).toBe(0);
      });
    }));
  });
});
