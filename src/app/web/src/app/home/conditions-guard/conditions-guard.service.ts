import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '@api';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class ConditionsGuardService implements CanActivate, CanActivateChild, CanDeactivate<ConditionsGuardService> {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    //console.log("conditions-guard constructor()");
    //console.log(this.router.url);
  }

  hasEntered = false;

  canActivate(){
    // //console.log("conditions-guard canActivate " + this.loginService.isAuthenticated + " - " + this.loginService.isConditionsAgreed);
    // if(!this.loginService.isAuthenticated || !this.loginService.isConditionsAgreed){
    //     if(this.router.url === '/'){
    //         this.loginService.logout();
    //         this.router.navigate(['login']);
    //     }
    //     if(this.router.url != '/login'){
    //         return false;
    //     }
    // }

    // return true || this.loginService.isAuthenticated || this.loginService.isConditionsAgreed
    return true;
  }

  canActivateChild() {
    // const entryRegex = /(\/login)|(\/registration)|(^\/\$)/;
    //  //console.log("conditions-guard canActivateChild " + this.loginService.isAuthenticated + " - " + this.loginService.isConditionsAgreed);
     
    //  if (!this.loginService.isAuthenticated || !this.loginService.isConditionsAgreed) {
    //       if (this.loginService.hasChangedPwd) {
    //          if (this.router.url != '/login' && !this.router.url.includes('/setup-password')) {
    //              this.router.navigate(['terms-conditions']);
    //          }
    //       } else {
    //         if (this.router.url === '/') {
    //             this.loginService.logout();
    //             this.router.navigate(['login']);
    //         }
    //         if (!entryRegex.test(this.router.url)) {
    //             return false;
    //         }
    //      }
    //  }

    //  if(this.loginService.isConditionsAgreed){
    //     this.hasEntered = true;
    //  }
    // return true || this.loginService.isAuthenticated || this.loginService.isConditionsAgreed;
    return true;
  }

  canDeactivate(
    component: ConditionsGuardService,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    //console.log("conditions-guard canDeactivate");
    // this.hasEntered = false;
    return true;
  }

}
