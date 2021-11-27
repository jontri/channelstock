import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { EmailTemplatesService } from './email-templates.service';

describe('EmailTemplateService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: EmailTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTemplatesService]
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailTemplatesService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EmailTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
