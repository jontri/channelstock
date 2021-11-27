import { Injectable, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '@api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private navbarElemEvent: ReplaySubject<ElementRef>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private loginService: LoginService
  ) {
    this.navbarElemEvent = new ReplaySubject<ElementRef>();
  }

  changePercent(newNum: number, oldNum: number): number {
    return (newNum - oldNum) / oldNum;
  }

  // Goes through the routes and returns the very last activated child route.
  getLastActivatedChild(route: ActivatedRoute): ActivatedRoute {
    if (route.children.length) {
      return this.getLastActivatedChild(route.children[route.children.length - 1]);
    } else {
      return route;
    }
  }

  pxToVw(pixels: number): number {
    return 100 * pixels / this.document.documentElement.clientWidth;
  }

  get navbar(): ReplaySubject<ElementRef> {
    return this.navbarElemEvent;
  }

  getCompanyRating(rating: number): string {
    if (!this.loginService.isAuthenticated) {
      return 'Refer to Research Report';
    }

    if ( rating == 1) {
      return ('Underperform');
    } else if (rating == 2) {
      return ('Market Perform');
    } else if (rating == 3) {
      return ('Outperform');
    } else {
      return ('No Rating');
    }
  }

  getLastRouteChild(activatedRoute: ActivatedRoute|ActivatedRouteSnapshot) {
    if (!activatedRoute.children.length) {
      return activatedRoute;
    }

    return this.getLastRouteChild(activatedRoute.children[activatedRoute.children.length - 1]);
  }
}
