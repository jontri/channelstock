import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchReportComponent } from './add-research-report.component';

describe('AddResearchReportComponent', () => {
  let component: AddResearchReportComponent;
  let fixture: ComponentFixture<AddResearchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResearchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
