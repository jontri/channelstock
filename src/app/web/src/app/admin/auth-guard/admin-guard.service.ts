import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, UrlSegment} from '@angular/router';
import {LoginService} from '@api';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private loginService: LoginService,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
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

      if (isExpired && this.router.url !== '/') {
        this.getDeepLink(route);
        this.loginService.logout();
        this.router.navigate(['session-expired']);
        return false;
      }

    } else {
      console.log('Missing JWT Token ' + this.router.url);
      if (this.router.url !== '/') {
        this.getDeepLink(route);
        this.router.navigate(['']);
      }
      this.authService.toggleRegister();

      return false;
    }

    if (this.loginService.isAuthenticated) {
      this.router.navigate(['']);
      return true;
    }

    return !this.loginService.isAuthenticated;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    const jwtToken = localStorage.getItem('AUTH_TOKEN');
    const jwtHelper = new JwtHelperService();

    if (jwtToken) {
      const decodedToken = jwtHelper.decodeToken(jwtToken);
      const expirationDate = jwtHelper.getTokenExpirationDate(jwtToken);
      const isExpired = jwtHelper.isTokenExpired(jwtToken);
      console.log('Decoded JWT ' + decodedToken);

      if (decodedToken.aud !== 'ADMIN') {
        this.router.navigate(['unauthorized']);
      }

      if (isExpired && this.router.url !== '/') {
        this.getDeepLink(childRoute);
        this.loginService.logout();
        this.router.navigate(['session-expired']);
        return false;
      }

    } else {
      console.log('Missing JWT Token ' + this.router.url);
      if (this.router.url !== '/') {
        this.getDeepLink(childRoute);
        this.router.navigate(['']);
      }
      this.authService.toggleRegister();

      return false;
    }


    if (!this.loginService.isAuthenticated) {
      this.router.navigate(['']);
      this.authService.toggleRegister();
      return true;
    }

    return this.loginService.isAuthenticated;
  }

  private getDeepLink(routeSnapshot: ActivatedRouteSnapshot): void {
    this.authService.deepLink = this.extractUrl(routeSnapshot);
  }

  private extractUrl(routeSnapshot: ActivatedRouteSnapshot): string {
    if (!routeSnapshot) {
      return '';
    }
    return `${routeSnapshot.url.reduce((acc: string, val: UrlSegment) => `${acc}/${val.path}`, '')}` +
      `${this.extractUrl(routeSnapshot.firstChild)}`;
  }
}
