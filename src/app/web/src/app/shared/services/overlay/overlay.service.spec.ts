import { TestBed, inject } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';

import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule
      ],
      providers: [
        OverlayService
      ]
    });
  });

  it('should be created', inject([OverlayService], (service: OverlayService) => {
    expect(service).toBeTruthy();
  }));
});
