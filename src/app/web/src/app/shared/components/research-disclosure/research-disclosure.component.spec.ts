import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDisclosureComponent } from './research-disclosure.component';

describe('ResearchDisclosureComponent', () => {
  let component: ResearchDisclosureComponent;
  let fixture: ComponentFixture<ResearchDisclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchDisclosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
