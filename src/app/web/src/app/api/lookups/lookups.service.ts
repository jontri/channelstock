import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lookup } from '@models';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  protected url = '/services/LookupService';

  getAllQuestions(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.url + "/questions");
  }

  getAllCountries(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.url + "/countries");
  }

  getAllUSStates(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.url + "/usstates");
  }

  getAllRoles(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(this.url + "/roles");
  }

  constructor(private http: HttpClient) { }
}
