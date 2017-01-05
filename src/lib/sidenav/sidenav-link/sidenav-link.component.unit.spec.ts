import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavLinkComponent } from './sidenav-link.component';

describe('MzSidenavLinkComponent:unit', () => {
  let component: MzSidenavLinkComponent;
  let fixture: ComponentFixture<MzSidenavLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavLinkComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
