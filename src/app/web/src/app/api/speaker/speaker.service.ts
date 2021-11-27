import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Speaker, RoadShow } from '@models';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  private SERVICE_URL = '/services/RoadShowService';

  constructor(private httpClient: HttpClient) {

  }

  getSpeakerDetails(id: string): Observable<RoadShow> {
    return this.httpClient.get<RoadShow>(this.SERVICE_URL + "/" + id);
  }
}
