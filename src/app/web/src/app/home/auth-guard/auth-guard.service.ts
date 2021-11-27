import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { LoginService } from '@api';
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

  canActivate(route: ActivatedRouteSnapshot) {
    // THIS FUNCTION IS NOT BEING CALLED ANYWHERE.
    // THUS IT'S BEEN COMMENTED OUT.
    // if (this.authService.token) {

    //   console.log('Token found - Expiration Date: ' +
    //     this.authService.tokenExpirationDate + ' Is Expired: ' + this.authService.isTokenExpired + " URL: " + this.router.url);

    //   if( (this.router.url.length > 0) && (!this.router.url.includes('/login'))
    //     && (this.router.url !== "/") && (this.router.url !== "/home")){
    //     this.getDeepLink(route);
    //     console.log("Setting deep link: " + this.authService.deepLink + " Target URL: " + this.router.url);
    //   }

    //   if (isExpired && !this.router.url.includes('/login')) {
    //     //this.getDeepLink(route);
    //     this.loginService.logout();
    //     this.router.navigate(['session-expired']);
    //     return false;
    //   }


    // } else {
    //   console.log('Missing JWT Token: ' + this.router.url);
    //   if (!this.router.url.includes('/login')) {
    //     this.getDeepLink(route);
    //     this.router.navigate(['login']);
    //   }
    //   return false;
    // }

    //  if (this.loginService.isAuthenticated) {
    //    this.router.navigate(['home']);
    //  }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    // const entryRegex = /(\/login)|(\/registration)|(\/setup\-password)|(^\/\$)/;

    // if (!this.loginService.isAuthenticated && !entryRegex.test(this.router.url)) {
    //   this.getDeepLink(childRoute);
    //   this.router.navigate(['/']);
    //   return;
    // }

    // if (this.authService.token) {

    //   console.log('Token found - Expiration Date: ' + this.authService.tokenExpirationDate + ' Is Expired: ' +
    //     this.authService.isTokenExpired + ' URL: ' + this.router.url );

    //   if (this.authService.isTokenExpired) {
    //     if (!entryRegex.test(this.router.url)) {
    //       console.log('Setting deep link: ' + this.authService.deepLink + ' Target URL: ' + this.router.url);
    //       this.getDeepLink(childRoute);
    //     }
    //     this.loginService.logout();
    //     this.router.navigate(['/']);
    //     return false;
    //   }

    // } else {
    //   console.log('Missing JWT Token: ' + this.router.url);
    //   if (!entryRegex.test(this.router.url)) {
    //     this.getDeepLink(childRoute);
    //     this.router.navigate(['/']);
    //   }
    //   return false;
    // }

    // return this.loginService.isAuthenticated;
    return true;
  }

  private getDeepLink(routeSnapshot: ActivatedRouteSnapshot): void {
    const extractedUrl = this.extractUrl(routeSnapshot);

    if (extractedUrl && extractedUrl !== '/home' && !this.authService.deepLink) {
      this.authService.deepLink = extractedUrl;
    }
  }

  // !/(\/login)|(\/registration)|(^\/{1}\$)/.test(extractedUrl)

  private extractUrl(routeSnapshot: ActivatedRouteSnapshot): string {
    if (!routeSnapshot) {
      return '';
    }
    return `${routeSnapshot.url.reduce((acc: string, val: UrlSegment) => `${acc}/${val.path}`, '')}` +
      `${this.extractUrl(routeSnapshot.firstChild)}`;
  }
}
