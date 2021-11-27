import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MoversService } from './movers.service';

describe('MoversService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: MoversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoversService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MoversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
