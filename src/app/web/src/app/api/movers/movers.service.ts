import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Mover } from '@models';

@Injectable({
  providedIn: 'root'
})
export class MoversService {
  private static URL = '/services/MoverService';
  expandListener = new Subject();

  constructor(private http: HttpClient) { }

  getMovers(): Observable<Mover> {
    return this.http.get<Mover>(MoversService.URL);
  }
}
