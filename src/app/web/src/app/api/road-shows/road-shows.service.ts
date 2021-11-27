import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RoadShow } from '@models';
//import { RoadShows } from './mock-roadShow';
import { Upcoming_RoadShows } from './mock-upcoming-roadShow';

@Injectable({
  providedIn: 'root'
})
export class RoadShowService {

    private SERVICE_URL = '/services/RoadShowService';

    // data containers
    upcomingRoadShows = new Subject();
    upcomingChannelCasts = new Subject();
    selectedRoadShow = new Subject();
    expandListener = new Subject();

    constructor(
      private httpClient: HttpClient
    ) {

    }

  getRoadShows(): Observable<RoadShow[]> {
    return this.httpClient.get<RoadShow[]>(this.SERVICE_URL).pipe(
       map((data) => {
         return data;
       })
    );
    // return of(RoadShows);
  }

  getRoadShowsByCompany(company_id: string): Observable<RoadShow[]> {
     return this.httpClient.get<RoadShow[]>(this.SERVICE_URL + '/issuer' + '/' + company_id);
  }

  getUpcomingRoadShowsByCompany(company_id: string): Observable<RoadShow[]> {
    return this.httpClient.get<RoadShow[]>(this.SERVICE_URL + '/upcoming/company' + '/' + company_id);
 }

  getRoadShowById(id: string): Observable<RoadShow[]> {
    return this.httpClient.get<RoadShow[]>(this.SERVICE_URL + '/' + id);
  }

  getRoadShow(id: string): Observable<RoadShow> {
    return this.httpClient.get<RoadShow>(this.SERVICE_URL + '/' + id);
  }

  reserveUserForRoadshow(roadshowId: string, username: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post(this.SERVICE_URL + '/reserve/' + roadshowId + '/' + username , null,  httpOptions);
  }

  cancelUserForRoadshow(roadshowId: string, username: string) {
    return this.httpClient.delete(this.SERVICE_URL + '/reserve/cancel/' + roadshowId + '/' + username);
  }

  saveRoadShow(Roadshow: RoadShow): Observable<RoadShow> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const jsonObj = JSON.stringify({Roadshow});
    // console.log({Roadshow});
    return this.httpClient.post<RoadShow>(this.SERVICE_URL, {Roadshow}, httpOptions);
  }

  updateRoadShow(Roadshow: RoadShow): Observable<RoadShow> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const json = JSON.stringify({Roadshow});
    // console.log(json);
    return this.httpClient.put<RoadShow>(this.SERVICE_URL, json, httpOptions);
  }

  deleteRoadshow(id: string) {
    return this.httpClient.delete(this.SERVICE_URL + '/' + id);
  }
}
