import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RoadShowLocation } from '@models';

@Injectable({
  providedIn: 'root'
})
export class RoadShowLocationService {

    private SERVICE_URL = '/services/RoadShowLocationService';

    constructor(
      private httpClient: HttpClient
    ) {

    }

  getRoadShowLocation(): Observable<RoadShowLocation[]> {
     return this.httpClient.get<RoadShowLocation[]>(this.SERVICE_URL);
  }

  getRoadShowLocationById(id: string): Observable<RoadShowLocation[]> {
    return this.httpClient.get<RoadShowLocation[]>(this.SERVICE_URL + '/' + id);
  }

  saveRoadShowLocation(RoadshowLocation: RoadShowLocation): Observable<RoadShowLocation> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log(JSON.stringify({RoadshowLocation}));
    return this.httpClient.post<RoadShowLocation>(this.SERVICE_URL, {RoadshowLocation}, httpOptions);
  }

  updateRoadShowLocation(RoadshowLocation: RoadShowLocation): Observable<RoadShowLocation> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log({RoadshowLocation});
    return this.httpClient.put<RoadShowLocation>(this.SERVICE_URL, {RoadshowLocation},  httpOptions);
  }

  deleteRoadShowLocation(id: string) {
    return this.httpClient.delete(this.SERVICE_URL + '/' + id);
  }
}
