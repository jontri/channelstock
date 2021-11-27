import { TestBed, inject } from '@angular/core/testing';

import { WelcomeSliderService } from './welcome-slider.service';

describe('WelcomeSliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WelcomeSliderService]
    });
  });

  it('should be created', inject([WelcomeSliderService], (service: WelcomeSliderService) => {
    expect(service).toBeTruthy();
  }));
});
