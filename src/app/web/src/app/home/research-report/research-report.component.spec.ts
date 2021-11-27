import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchReportComponent } from './research-report.component';

describe('ResearchReportComponent', () => {
  let component: ResearchReportComponent;
  let fixture: ComponentFixture<ResearchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
