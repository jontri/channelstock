import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from '@api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe( catchError(err => {

          console.log("Error interceptor: " + request.url);

          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.loginService.logout();
            console.log(err);
            location.reload(true);
          } else if(err.status === 404) {
            console.log("Error Interceptor: 404" );
            console.log(err);
          } else if(err.status === 500) {
            console.log("Error Interceptor: 500" );
            console.log(err);
          }

          if(err.status !== 200 && err.status !== 204){
            const error = err.error.message || err.statusText;
            return throwError(error);
          }

        }))
    }
}
