import { MzTimepickerDirective } from './timepicker.directive';

describe('MzTimepickerDirective:unit', () => {
  let directive: MzTimepickerDirective;

  function createInputElement(): JQuery<HTMLInputElement> {
    return $(document.createElement('input')) as JQuery<HTMLInputElement>;
  }

  function createClockpickerElement() {
    const clockpickerElement = document.createElement('div');
    clockpickerElement.classList.add('clockpicker');
    document.body.appendChild(clockpickerElement);
  }

  beforeEach(() => {
    directive = new MzTimepickerDirective(null, null, null, null, null);
    directive.inputElement = createInputElement();
  });

  describe('ngOnDestroy', () => {

    it('should remove even handlers on input element', () => {
      spyOn(directive.inputElement, 'off');

      directive.ngOnDestroy();

      expect(directive.inputElement.off).toHaveBeenCalled();
    });

    it('should remove clockpicker elements added to body by default', () => {
      createClockpickerElement();

      expect(document.querySelector('.clockpicker')).toBeTruthy();

      directive.ngOnDestroy();

      expect(document.querySelector('.clockpicker')).toBeFalsy();
    });
  });
});
