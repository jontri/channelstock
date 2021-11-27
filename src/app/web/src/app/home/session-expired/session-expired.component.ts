import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "@shared/services";
import {CookieService} from "ngx-cookie-service";
import {LoginService, UserManagementService} from "@api";
import {UserTrackActivityService} from "@shared/services/user-track-activity/user-track-activity.service";
import {UserProfile} from "@models";

@Component({
  selector: 'rom-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  isLoading: Boolean = false;
  username: string;
  password: string;
  loginObj: any;
  loginFailedMsg: string;
  userProfile: UserProfile;
  fullName: string;
  firstName: string;
  public isLoginSuccess: boolean;
  id: number;
  conditionsAgreed: boolean;
  token: string;
  // showCarousel: Boolean;
  constructor(
    private loginService: LoginService,
    private userService: UserManagementService,
    private router: Router,
    public authService: AuthService,
    private cookieService: CookieService,
    private trackActivityService: UserTrackActivityService
  ) {
  }

  ngOnInit() {
    this.checkCookies();
  }

  checkCookies() {
    //console.log(this.cookieService.get('hasLoggedIn'));
    // if (this.cookieService.get('hasLoggedIn') !== 'true') {
    //   this.showCarousel = false;
    // } else {
    //   this.showCarousel = false;
    // }
  }

  ngAfterViewInit() {
    if (this.input) {
      this.input.nativeElement.focus();
    }
  }

  onLogin(event: Event) {
    this.isLoading = true;
    this.loginService.login(this.username, this.password)
      .subscribe(
        result => {
          this.loginObj = result['LoginResponse'];

          if (this.loginObj.message === 'SUCCESS') {
            this.doLoginNavigate(this.username);
            // Start tracking user activity.
            // this.trackActivityService.start(() => {
            //   // Session expired, log out the user.
            //   this.loginService.logout();
            //   this.router.navigate(['login']);
            // });
          } else {
            this.isLoading = false;
            this.loginFailedMsg = 'Invalid login credentials';
          }
        }, err => {
          this.isLoading = false;
          console.log(err);
          this.loginFailedMsg = 'Invalid login credentials';
        }
      );
  }

  getUserAccount(username: string) {
    return new Promise(
      (resolve, reject) => {
        this.userService.getUserAccount(username)
          .subscribe(
            result => {
              resolve(result);
            },
            error => {
              reject(error);
            }
          );
      }
    );
  }

  doLoginNavigate(username: string) {
    this.userService.getUserProfile(username)
      .subscribe(
        result => {
          // console.log('result', result);
          this.userProfile = result['userProfile'];
          this.fullName = this.userProfile.firstName + ' ' + this.userProfile.lastName;
          this.firstName = this.userProfile.firstName ;
          this.id = this.userProfile.id;
          this.loginService.loginListener.next('emit');
          this.getUserAccount(username).then( data => {
            // set cookie
            this.cookieService.set('hasLoggedIn', 'true');

            this.token = data['userAccount'].token;
            this.authService.loggedUser = username;
            this.authService.loggedUserFullName = this.fullName;
            this.authService.loggedUserFirstName = this.firstName;
            this.authService.loggedId = this.id;

            sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.fullName);
            sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);
            sessionStorage.setItem('LOGGED_ID', this.id.toString());
            sessionStorage.setItem('HAS_LOGGED_IN', "true");

            this.isLoading = false;
            if (data['userAccount'].disabled) {
              if (this.loginService.authenticated && (this.token == null || this.token === 'undefined')) {
                this.router.navigate(['setup-password', this.username]);
              } else {
                this.router.navigate(['setup-password', this.username, data['userAccount'].token]);
              }
            } else {
              if (data['userAccount'].conditionsAgreed){
                if (data['userAccount'].firstLogin) {
                  data['userAccount'].firstLogin = false;
                  this.userService.updateUserAccount(username, data['userAccount']).subscribe();
                  this.router.navigate(['welcome']);
                } else {
                  // this.router.navigate(['companies']);
                  if (this.authService.deepLink) {
                    this.router.navigateByUrl(this.authService.deepLink);
                    this.authService.deepLink = '';
                  } else {
                    this.router.navigate(['home']);
                  }
                }
                // window.location.reload();
              } else {
                this.router.navigate(['terms-conditions']);
              }
            }
          });
        }
      );
  }

  toLogin() {
    // // this.showCarousel = !this.showCarousel;
    // this.router.navigate(['/login']);
  }

}
