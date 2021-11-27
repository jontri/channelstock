import { TestBed, inject } from '@angular/core/testing';

import { AggreementsService } from './aggreements.service';

describe('AggreementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggreementsService]
    });
  });

  it('should be created', inject([AggreementsService], (service: AggreementsService) => {
    expect(service).toBeTruthy();
  }));
});
