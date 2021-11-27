import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';
import { LoginService } from '@api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  canActivate() {
    const jwtToken = localStorage.getItem('AUTH_TOKEN');
    const jwtHelper = new JwtHelperService();

    if (jwtToken) {
      const decodedToken = jwtHelper.decodeToken(jwtToken);
      const expirationDate = jwtHelper.getTokenExpirationDate(jwtToken);
      const isExpired = jwtHelper.isTokenExpired(jwtToken);

      console.log('JWT Token Found');
      console.log(decodedToken);
      console.log(expirationDate);
      console.log(isExpired);

      if (isExpired) {
        this.router.navigate(['session-expired']);
      }

    } else {
      console.log('Missing JWT Token');
    }

     if (this.loginService.isAuthenticated) {
       this.router.navigate(['']);
       return true;
     }

    return !this.loginService.isAuthenticated;
  }

  canActivateChild() {
    const jwtToken = localStorage.getItem('AUTH_TOKEN');
    const jwtHelper = new JwtHelperService();

    if (jwtToken) {
      const decodedToken = jwtHelper.decodeToken(jwtToken);
      const expirationDate = jwtHelper.getTokenExpirationDate(jwtToken);
      const isExpired = jwtHelper.isTokenExpired(jwtToken);
      console.log('Decoded JWT ' + decodedToken);

      if (isExpired) {
        this.router.navigate(['session-expired']);
      }

    } else {
      console.log('Missing JWT Token');
    }

    if (!this.loginService.isAuthenticated) {
      this.router.navigate(['']);
      this.authService.toggleRegister();
      return true;
    }

    return this.loginService.isAuthenticated;
  }
}
