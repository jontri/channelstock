import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {LoginService, UserManagementService} from '@api';
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";
import {Observable, of} from 'rxjs';
import {AuthService} from "@shared/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
      private userManagementService: UserManagementService,
      private router: Router,
      private authService: AuthService,
      private loginService: LoginService

    ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log("JWT Intercept: " + request.url);

        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = localStorage.getItem('AUTH_TOKEN');
        let username = localStorage.getItem('LOGGED_USER');

        //console.log("Auth Token: " + token + " --> " + request);
        //console.log(request);

        if (token && request.url.startsWith("/services")
                  && !request.url.startsWith("/services/UserAuditService")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // console.log( request.headers );
		    // console.log( "IP Address : " + sessionStorage.getItem("IP_ADDRESS"));

        if(!request.url.startsWith("/services/UserAuditService")){
          this.userManagementService.auditEvent(username, sessionStorage.getItem("IP_ADDRESS"),  request.url,  this.router.url).subscribe();
          // console.log( "Audit Event in Interceptor complete : " + sessionStorage.getItem("IP_ADDRESS") );
        }

      /**
       * continues request execution
       */
      return next.handle(request).pipe(catchError((error, caught) => {
        //intercept the response error and display it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
    }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {

      //navigate /delete cookies or whatever
      console.log('Handled error in JWT ' + err.status);

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

      console.log("Deep link before session expired on service: " + this.authService.deepLink +  " Target URL: " + this.router.url);
      // this.router.navigate(['session-expired']);

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);

    }
    throw err;
  }
}
