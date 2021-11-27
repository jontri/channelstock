import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOGIN_SERVICE_URL = '/services/LoginService/auth';
  private PASSWORD_RECOVERY_SERVICE_URL = '/services/UserProfile/user/account/challenge';
  private VERIFY_TOKEN_URL= '/services/UserProfile/register/confirm';

  public authenticated: boolean;
  public conditionsAgreed: boolean;
  public changedPassword: boolean;
  // public showCarousel: boolean;
  public loginListener = new Subject();

  constructor(
    private httpClient: HttpClient
  ) {
    this.authenticated = sessionStorage.getItem('LOGIN') === 'SUCCESS';
    this.conditionsAgreed = sessionStorage.getItem('CONDITIONS_AGREED') === 'Y';
    this.changedPassword = sessionStorage.getItem('CHANGEDPWD') === 'Y';

    this.httpClient.get('https://api.ipify.org?format=json')
      .subscribe(ipaddress => {

        if(ipaddress['ip']){
          localStorage.setItem("IP_ADDRESS", ipaddress['ip']);
          sessionStorage.setItem("IP_ADDRESS", ipaddress['ip']);
        }
      });
  }

  login(username: string, password: string)  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'username': username,
        'password': password
      })
    };

    return this.httpClient.get(this.LOGIN_SERVICE_URL, httpOptions)
      .pipe(
        map(this.processLogin.bind(this, username))
      );
  }

  logout() {
    sessionStorage.removeItem('LOGIN');
    sessionStorage.removeItem('LOGGED_USER');
    sessionStorage.removeItem('LOGGED_USER_FULL_NAME');
    sessionStorage.removeItem('LOGGED_USER_FIRST_NAME');
    sessionStorage.removeItem('LOGGED_ID');
    sessionStorage.removeItem('CONDITIONS_AGREED');
    sessionStorage.removeItem('CHANGEDPWD');
    sessionStorage.removeItem('HAS_LOGGED_IN');
    sessionStorage.removeItem('ROLES');
    // sessionStorage.clear();

    localStorage.removeItem('LOGGED_USER');
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.clear();

    this.authenticated = false;
    this.conditionsAgreed = false;
  }

  verifyToken(username: string, token: string)  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'username': username,
        'token': token
      })
    };

    console.log("Calling verify token");

    return this.httpClient.get(this.VERIFY_TOKEN_URL, httpOptions)
      .pipe(
        map(this.processLogin.bind(this, username))
      );
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  get isConditionsAgreed(): boolean {
    return this.conditionsAgreed;
  }

  get hasChangedPwd(): boolean {
    return this.changedPassword;
  }

  get isShowCarousel(): boolean {
    return false;
    // return this.showCarousel;
  }

  get isAdmin(): boolean {
    return localStorage.getItem("ROLES") == "ADMIN";
  }

  recoverAccount(username: string, password = '') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'username': username,
        'password': password
      })
    };

    return this.httpClient.get(this.PASSWORD_RECOVERY_SERVICE_URL, httpOptions)
    .pipe(
      map((data) => {
        const accountObj = data['result'];
        return data;
      })
    );

  }

  private processLogin(username: string, data): any {
    const loginObj = data['LoginResponse'];

    // console.log(loginObj);

    // console.log(loginObj.roles);

    if (loginObj.message === 'SUCCESS') {

      this.authenticated = true;

      this.conditionsAgreed = loginObj.conditionsAgreed === 'Y';
      this.changedPassword = loginObj.changedPassword === 'Y';

      sessionStorage.setItem('ROLES', loginObj.roles);
      sessionStorage.setItem('LOGIN', loginObj.message);
      sessionStorage.setItem('LOGGED_USER', username);
      sessionStorage.setItem('LOGGED_ID', loginObj.userId);
      sessionStorage.setItem('CONDITIONS_AGREED', loginObj.conditionsAgreed);
      sessionStorage.setItem('CHANGEDPWD', loginObj.changedPassword);

      localStorage.setItem('LOGGED_USER', username);
      localStorage.setItem('AUTH_TOKEN', loginObj.token);
      localStorage.setItem('ROLES', loginObj.roles);

    }
    return data;
  }
}
