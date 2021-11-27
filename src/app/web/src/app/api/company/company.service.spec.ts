import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
