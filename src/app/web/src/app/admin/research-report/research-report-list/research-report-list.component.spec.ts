import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchReportListComponent } from './research-report-list.component';

describe('ResearchReportListComponent', () => {
  let component: ResearchReportListComponent;
  let fixture: ComponentFixture<ResearchReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
