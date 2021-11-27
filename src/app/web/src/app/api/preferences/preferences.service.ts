import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserProfile } from '@models';


@Injectable({
    providedIn: 'root'
})
  
export class PreferencesService {

    protected url = '/services/UserProfile';

    constructor(private http: HttpClient) {}
    
    getUserProfile(emailAddress: String): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.url + '/user/' + emailAddress);
    }
    
    updatePreferences(userProfile: UserProfile): Observable<UserProfile> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        
        };
        console.log(userProfile);
        return this.http.put<UserProfile>(this.url + '/user/preferences/' + userProfile.id, JSON.stringify({userProfile}), httpOptions);
    }
    
}
  