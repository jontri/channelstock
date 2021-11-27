import { TestBed, inject } from '@angular/core/testing';

import { ResearchReportService } from './research-report.service';

describe('ResearchReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResearchReportService]
    });
  });

  it('should be created', inject([ResearchReportService], (service: ResearchReportService) => {
    expect(service).toBeTruthy();
  }));
});
