import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchReportExtComponent } from './research-report-ext.component';

describe('ResearchReportExtComponent', () => {
  let component: ResearchReportExtComponent;
  let fixture: ComponentFixture<ResearchReportExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchReportExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchReportExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
