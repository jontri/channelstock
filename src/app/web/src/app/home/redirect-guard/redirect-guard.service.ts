import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/session-expired') {
      this.router.navigate(['/']);
      this.authService.toggleRegister();
    } else {
      return true;
    }
  }
}
