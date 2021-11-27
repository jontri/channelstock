import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
// import { SliderComponent } from '@angular/core';
// import { WelcomeSliderService } from '@shared/services';
import { ResponsiveService, GoogleAnalyticsService } from '@shared/services';
// import { Gtag } from 'angular-gtag';

@Component({
  selector: 'rom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showWelcome = true;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    public responsiveService: ResponsiveService,
    private gaService: GoogleAnalyticsService
  ) {
  }

  @ViewChild('openModal') openModal: ElementRef;

  ngOnInit() {
    console.log(`Is Mobile ---> ${this.responsiveService.isMobile}`);

    this.router.events.subscribe((event: any) => {
      // console.log("Route : " + router.url);

      if (event instanceof NavigationEnd) {
        // console.log('Route Navigation End', this.router.url);

        if (this.router.url === '/login' || this.router.url === '/registration' || this.router.url === '/forgot-password' ||
          this.router.url === '/session-expired') {
          this.showWelcome = false;
          sessionStorage.setItem('HAS_LOGGED_IN', 'true');
          localStorage.setItem('HAS_LOGGED_IN', 'true');
        }

        // console.log("Show Welcome: " + this.showWelcome);

        if (this.cookieService.get('hasLoggedIn') !== 'true' && this.showWelcome && sessionStorage.getItem('HAS_LOGGED_IN') !== 'true' &&
          localStorage.getItem('HAS_LOGGED_IN') !== 'true') {
          // this.openModal.nativeElement.click();
          // this.sliderService.welcome("lg");
          sessionStorage.setItem('HAS_LOGGED_IN', 'true');
          localStorage.setItem('HAS_LOGGED_IN', 'true');
          this.cookieService.set('hasLoggedIn', 'tue');
        } else {
          // console.log("Don't show welcome");
          // this.activeModal.dismiss();
        }

        this.gaService.track(this.router.url);
      }
    });
  }
}
