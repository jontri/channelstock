import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { UtilsService, ResponsiveService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class MobileGuardService implements CanActivateChild {

  constructor(
    private utilsService: UtilsService,
    public responsiveService: ResponsiveService
  ) { }

  canActivateChild(routeSnapshot: ActivatedRouteSnapshot) {
    if (this.responsiveService.isMobile) {
      const lastChild = this.utilsService.getLastRouteChild(routeSnapshot);
      return lastChild.data.mobile && lastChild.data.mobile.isEnabled;
    }
    return true;
  }
}
