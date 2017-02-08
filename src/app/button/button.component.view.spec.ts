// import { async, TestBed } from '@angular/core/testing';

// import { MzIconComponent } from '../icon/icon.component';
// import { buildComponent, MzTestWrapperComponent } from '../shared/test-wrapper';
// import { MzButtonComponent } from './button.component';

// describe('MzButtonComponent:view', () => {

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         MzButtonComponent,
//         MzIconComponent,
//         MzTestWrapperComponent,
//       ],
//     });
//   }));

//   describe('button', () => {

//     let nativeElement: any;

//     function button(): HTMLElement {
//       return nativeElement.querySelector('button');
//     }

//     it('should have default value', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button()).toBeTruthy();
//         expect(button().classList.length).toBe(3);
//         expect(button().classList).toContain('btn');
//         expect(button().classList).toContain('waves-light');
//         expect(button().classList).toContain('waves-effect');

//         expect(nativeElement.querySelector('button[type=submit]')).toBeFalsy();
//       });
//     }));

//     it('should have text value', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button> button </mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().innerText.trim()).toBe('button');
//       });
//     }));

//     it('should have buttonClass', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [buttonClass]="'some-button-class'"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('some-button-class');
//       });
//     }));

//     it('should have textClass', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [textClass]="'some-text-class'"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('some-text-class');
//       });
//     }));

//     it('should have autofocus attribute', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [autofocus]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(nativeElement.querySelector('button[autofocus]')).toBeTruthy();
//       });
//     }));

//     it('should have submit type', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [submit]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(nativeElement.querySelector('button[type=submit]')).toBeTruthy();
//       });
//     }));

//     it('should have flat class', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [flat]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('btn-flat');
//       });
//     }));

//     it('should have floating class', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [float]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('btn-floating');
//       });
//     }));

//     it('should have large class', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [large]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('btn-large');
//       });
//     }));

//     it('should have disabled class', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button [disabled]="true"></mz-button>`).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         expect(button().classList).toContain('disabled');
//       });
//     }));

//     it('should be clickable', async(() => {

//       buildComponent<MzButtonComponent>(`<mz-button (onClick)="onClick($event)"></mz-button>`, {
//         onClick: (event) => { event.currentTarget.innerText = 'clicked'; },
//       }).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         const component = fixture.componentInstance;

//         spyOn(component, 'onClick').and.callThrough();

//         fixture.detectChanges();

//         expect(button().innerText.trim()).toBe('');

//         button().click();

//         expect(component.onClick).toHaveBeenCalledWith(jasmine.any(Event));
//         expect(button().innerText.trim()).toBe('clicked');
//       });
//     }));

//     it('should have transcluded icon and text', async(() => {
//       buildComponent<MzButtonComponent>(`
//         <mz-button>
//           <i mz-icon-mdi [icon]="'cloud'"></i>
//           button
//         </mz-button>
//       `).then((fixture) => {

//         nativeElement = fixture.nativeElement;
//         fixture.detectChanges();

//         const icon = button().querySelector('i');

//         expect(icon).toBeTruthy();
//         expect(icon.innerText.trim()).toBe('cloud');

//         expect(button().innerText.trim()).toBe('cloud button');
//       });
//     }));
//   });
// });
