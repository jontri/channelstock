import { Injectable  } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProfile, UserAccount, UserAudit } from '@models';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  protected url = '/services/UserProfile';
  protected audit_url = '/services/UserAuditService';

  constructor(private http: HttpClient) { }

  adminGetUserProfiles(): Observable<UserProfile[]> {
    // console.log("Inside adminGetUserProfiles");
    return this.http.get<UserProfile[]>(this.url + "/users/registered");
  }

  adminGetUserProfile(emailAddress:string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url + '/user/' + emailAddress);
  }

  adminAddUser(userProfile) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const json = JSON.stringify({ userProfile });
    // console.log('user-management.adminAddUser: ' + json);
    return this.http.put(this.url + '/user/account' , json, httpOptions);

  }

  adminEditUser(userProfile: UserProfile) {

    return this.http.put<UserProfile>(this.url + '/user/' + userProfile.userId , JSON.stringify({userProfile}), httpOptions);
  }

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.url);
  }

  getUserProfile(emailAddress: String): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url + '/user/' + emailAddress);
  }

  getUserAccount(emailAddress: String): Observable<UserAccount> {
    return this.http.get<UserAccount>(this.url + '/user/' + emailAddress + '/account');
  }

  updateUserProfile(userProfile: UserProfile) {
    return this.http.put<UserProfile>(this.url + '/user/' + userProfile.userId , JSON.stringify({userProfile}), httpOptions);
  }

  updateUserAccount(emailAddress: string, userAccount: UserAccount) {
    const jsonObj = JSON.stringify({userAccount});

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'username': emailAddress
      })
    };

    return this.http.post<UserAccount>(this.url + '/user/password', jsonObj, httpOptions);
  }

  deleteUserProfile(emailAddress: string) {
    return this.http.delete(this.url + '/user/' + emailAddress);
  }

  getAnalystUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.url + '/users/analyst' );
  }

  getAnalystUserProfileById(id: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.url + '/user/analyst/' + id );
  }

  getAssociateAnalystUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.url + '/users/associateanalyst' );
  }

  auditEvent(userName: string, ipAddress: string, serviceUrl: string, sourcePath: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const jsonObj = JSON.stringify( {userAudit:{userName: userName, ipAddress: ipAddress, url: serviceUrl, sourcePath: sourcePath}} );
    // console.log("Calling Audit Service");
    return this.http.post<UserAudit>(this.audit_url, jsonObj, httpOptions);
  }

  isUserEnhanced(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/user/enhanced/${userId}`);
  }
}
