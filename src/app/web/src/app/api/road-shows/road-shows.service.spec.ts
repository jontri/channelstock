import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RoadShowService } from './road-shows.service';

describe('RoadShowService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RoadShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoadShowService]
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoadShowService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoadShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
