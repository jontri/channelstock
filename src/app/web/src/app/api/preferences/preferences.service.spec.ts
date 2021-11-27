import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PreferencesService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
