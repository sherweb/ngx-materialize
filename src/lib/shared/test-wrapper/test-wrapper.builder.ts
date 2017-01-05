import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MzTestWrapperComponent } from './test-wrapper.component';

export function buildComponent<T>(
  template: string,
  bindings: { [key: string]: any } = {}): Promise<ComponentFixture<T>> {

  TestBed.overrideComponent(MzTestWrapperComponent, { set: { template, inputs: Object.keys(bindings) } });

  return TestBed.compileComponents().then(() => {
    // Note: we can also use TestComponent.prototype[binding] instead of
    // Object.assign; however, using Object.assign more closely matches
    // Angular, wherein the inputs are not available on construction.
    const fixture = <ComponentFixture<T>>TestBed.createComponent(MzTestWrapperComponent);
    Object.assign(fixture.componentInstance, bindings);

    return fixture;
  });
}
