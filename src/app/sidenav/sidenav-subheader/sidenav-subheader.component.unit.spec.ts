import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MzSidenavSubheaderComponent } from './sidenav-subheader.component';

describe('MzSidenavSubheaderComponent:unit', () => {
  let component: MzSidenavSubheaderComponent;
  let fixture: ComponentFixture<MzSidenavSubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MzSidenavSubheaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MzSidenavSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
