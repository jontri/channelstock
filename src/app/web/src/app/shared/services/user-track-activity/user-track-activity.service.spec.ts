import { TestBed, inject } from '@angular/core/testing';

import { UserTrackActivityService } from './user-track-activity.service';

describe('UserTrackActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTrackActivityService]
    });
  });

  it('should be created', inject([UserTrackActivityService], (service: UserTrackActivityService) => {
    expect(service).toBeTruthy();
  }));
});
