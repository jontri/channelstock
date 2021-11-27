import { TestBed, inject } from '@angular/core/testing';

import { ChannelCastsService } from './channel-casts.service';

describe('ChannelCastsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelCastsService]
    });
  });

  it('should be created', inject([ChannelCastsService], (service: ChannelCastsService) => {
    expect(service).toBeTruthy();
  }));
});
