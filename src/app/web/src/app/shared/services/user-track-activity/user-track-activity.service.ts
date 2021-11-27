import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoginService } from '@api';

@Injectable({
  providedIn: 'root'
})
export class UserTrackActivityService {

  // 10 minutes.
  // private static DELAY = 3600000;
  private static readonly DELAY = 86400000000;
  private static readonly KEY = 'activity_tracker';
  private static readonly ACTIVITY_TRACKED = 'activity_tracked';

  private timeoutRef: number;
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    // Start tracking.
    // this.start();
    // Listen for other tabs activity.
    // window.addEventListener('storage', this.informedFromTab.bind(this));
  }

  // Starts detecting route change as indication of user activity.
  // callback is custom function defined outside.
  public start(): void {
    this.stop();
    this.track();
    this.routeSubscription = this.router.events.pipe(
      filter((event: Event) => {
        return event instanceof NavigationStart;
      })
    ).subscribe(() => {
      this.track();
      // Inform other tabs.
      window.localStorage.setItem(UserTrackActivityService.KEY, UserTrackActivityService.ACTIVITY_TRACKED);
      window.localStorage.removeItem(UserTrackActivityService.KEY);
    });
  }

  public stop(): void {
    clearTimeout(this.timeoutRef);
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // callback is called when timeout reaches delay.
  private track(): void {
    clearTimeout(this.timeoutRef);
    setTimeout(() => {
      this.stop();
      // Session expired, log out the user.
      this.loginService.logout();
      this.router.navigate(['login']);
    }, UserTrackActivityService.DELAY);
  }

  private informedFromTab(storage: StorageEvent): void {
    if (storage.key === UserTrackActivityService.KEY && storage.newValue === UserTrackActivityService.ACTIVITY_TRACKED) {
      this.track();
    }
  }
}
