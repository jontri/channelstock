import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SpeakerService } from './speaker.service';

describe('RoadShowService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: SpeakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeakerService]
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpeakerService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SpeakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
