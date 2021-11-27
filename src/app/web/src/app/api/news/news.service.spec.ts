import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(NewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
