import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CheckChannelsService } from './check-channels.service';

describe('CheckChannelsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CheckChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckChannelsService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CheckChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
