import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { buildComponent, MzTestWrapperComponent } from '../../shared/test-wrapper';

import { MzInjectionModule } from '../../shared/injection/injection.module';
import { MzInjectionService } from '../../shared/injection/injection.service';
import { MzBaseModal } from '../modal-base';
import { MzModalComponent } from '../modal.component';
import { MzModalService } from './modal.service';

@Component({
  selector: 'mz-test-modal',
  template: `<mz-modal></mz-modal>`,
})
class MzTestModalComponent extends MzBaseModal { }

describe('MzModalService:view', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MzInjectionModule],
      declarations: [
        MzModalComponent,
        MzTestModalComponent,
        MzTestWrapperComponent,
      ],
      providers: [
        MzModalService,
      ],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MzTestModalComponent],
      },
    });
  }));

  describe('open', () => {
    let nativeElement: any;

    function modal(): HTMLElement {
      return nativeElement.querySelector('mz-test-modal');
    }

    it('should inject component in the DOM', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);
        const modalService: MzModalService = TestBed.get(MzModalService);
        const options = { modal: true };

        spyOn(injectionService, 'appendComponent').and.callThrough();

        // expect not be in the DOM
        expect(modal()).toBeNull();

        injectionService.setRootViewContainer(nativeElement);
        modalService.open(MzTestModalComponent, options);

        expect(injectionService.appendComponent).toHaveBeenCalledWith(MzTestModalComponent, options);

        // expect to be in the DOM
        expect(modal()).toBeDefined();
      });
    }));

    it('should remove component from the DOM when close output is emitted', async(() => {

      buildComponent(``).then(fixture => {
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();

        const injectionService: MzInjectionService = TestBed.get(MzInjectionService);
        const modalService: MzModalService = TestBed.get(MzModalService);

        injectionService.setRootViewContainer(nativeElement);

        const componentRef = modalService.open(MzTestModalComponent);

        spyOn(componentRef, 'destroy').and.callThrough();

        // expect to be in the DOM
        expect(modal()).toBeDefined();

        componentRef.instance.modalComponent.close.emit();

        expect(componentRef.destroy).toHaveBeenCalled();

        // expect not be in the DOM
        expect(modal()).toBeNull();
      });
    }));
  });
});
