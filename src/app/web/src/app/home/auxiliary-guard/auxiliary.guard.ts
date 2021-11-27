import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuxiliaryComponent } from '../auxiliary/auxiliary.component';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryGuard implements CanActivateChild, CanDeactivate<AuxiliaryComponent> {
  hasEntered = false;

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    this.hasEntered = true;
    return true;
  }

  canDeactivate(
    component: AuxiliaryComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    this.hasEntered = false;
    return true;
  }
}
