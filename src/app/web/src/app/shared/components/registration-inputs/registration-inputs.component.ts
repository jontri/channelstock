import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { blankValidator } from '@shared/validators';
import { Router } from '@angular/router';
import { UserAccount } from '@models';
import { RegistrationService, LoginService, UserManagementService } from '@api';
import { CookieService } from 'ngx-cookie-service';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-registration-inputs',
  templateUrl: './registration-inputs.component.html',
  styleUrls: ['./registration-inputs.component.scss']
})
export class RegistrationInputsComponent implements OnInit {

  @Input() shouldNavigate = true;
  @Input() isMobile = false;
  @Input() isModal = false;

  @Output() romChange: EventEmitter<string> = new EventEmitter<string>();

  registrationForm: FormGroup;
  formLastName: FormControl;
  formFirstName: FormControl;
  frmUsername: FormControl;

  // name: string;
  private username: string;
  private password: string;
  private accntStatus: string;
  private userAccount: UserAccount;
  generatedPassword: string;

  registerObj: any;
  errorOccured = false;
  errorMsg: string;
  message: string;

  loginObj: any;
  fullName: string;
  firstName: string;
  lastName: string;
  public isLoginSuccess: boolean;
  token: string;

  loginFailedMsg: string;

  // showCarousel: Boolean;

  USER_EXISTS_UNVERIFIED_MSG = 'Email address is already registered. <br/> Please check your email to verify your account.';
  USER_ALREADY_VERIFIED_MSG = 'Email address is already registered and verified.<br/> Please use your email address to login.';
  TOKEN_INVALID_MSG = 'Verify URL has expired.  Please register again to get a new verification email.';
  EMAIL_ADDRESS_INVALID_MSG = 'Email address format is not valid!';
  USER_DELETED_MSG = 'Cannot create account.  Email address already exists.';

  showAgreement: Boolean = false;

  isLoading: Boolean = false;
  showDialog: Boolean;

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    private loginService: LoginService,
    private userService: UserManagementService,
    private cookieService: CookieService,
    public responsiveService: ResponsiveService
  ) {
    this.username = sessionStorage.getItem('TMP_USERNAME');
    if (!this.username) {
      if (this.shouldNavigate) {
        this.router.navigate(['/entry']);
      } else {
        this.romChange.emit('entry');
      }
    }
    this.password = sessionStorage.getItem('TMP_PASSWORD');
    this.accntStatus = sessionStorage.getItem('TMP_ACCNT_STATUS');
    if (!this.password || !this.accntStatus) {
      if (this.shouldNavigate) {
        this.router.navigate(['/login']);
      } else {
        this.romChange.emit('login');
      }
    } else {
      sessionStorage.removeItem('TMP_PASSWORD');
    }
  }

  ngOnInit() {
    this.createForm();
    this.checkCookies();
  }

  checkCookies() {
    console.log(this.cookieService.get('hasLoggedIn'));
    // if (this.cookieService.get('hasLoggedIn') !== 'true') {
    //   this.showCarousel = true;
    // } else {
    //   this.showCarousel = false;
    // }
  }

  createForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, blankValidator]),
      lastName: new FormControl('', [Validators.required, blankValidator])
    });
  }

  onCancel() {
    this.logout();
  }

  onRegisterUser() {
    if (this.registrationForm.valid) {
      const firstName = this.registrationForm.value.firstName;
      const lastName = this.registrationForm.value.lastName;
      const fullName = `${firstName} ${lastName}`;
      this.isLoading = true;

      console.log('account check: ' + this.accntStatus);

      if (this.accntStatus === 'USER_AVAILABLE') {
        this.userAccount = new UserAccount('', fullName, this.username, this.password, false, true, true, false);
        this.loginService.loginListener.next('emit');
        this.registrationService.registerUser(this.userAccount).subscribe(result => {
          // console.log(result);
          if (result['result'].message === 'FAILED') {
            this.errorOccured = true;
            this.errorMsg = result['result'].messageDesc;
            // console.log('errorMsg: ' + this.errorMsg);
          } else if (result['result'].message === 'RESEND') {
            this.errorMsg = result['result'].messageDesc;
            // console.log('message: ' + result['result'].message + ' errorMsg: ' + this.errorMsg);
            this.login();
          } else {
            this.login();
          }
        }, err => {
          console.log(err);
        });
      } else if (this.accntStatus === 'USER_EXISTS_UNVERIFIED' || this.accntStatus === 'USER_ALREADY_VERIFIED') {
        this.userService.getUserProfile(this.username).subscribe(resultProfile => {
          const userProfile = resultProfile['userProfile'];
          const id = userProfile.id;
          console.log('USER ID: ' + id);
          this.loginService.loginListener.next('emit');

          this.userService.getUserAccount(this.username).subscribe(data => {
            // set cookie
            this.cookieService.set('hasLoggedIn', 'true');

            data['userAccount'].conditionsAgreed = true;
            data['userAccount'].fullName = fullName;

            sessionStorage.setItem('LOGGED_USER_FULL_NAME', fullName);
            sessionStorage.setItem('LOGGED_USER_FIRST_NAME', firstName);
            sessionStorage.setItem('LOGGED_ID', id.toString());
            sessionStorage.setItem('HAS_LOGGED_IN', 'true');
            sessionStorage.setItem('CONDITIONS_AGREED', 'Y');

            data['userAccount'].firstLogin = false;

            this.isLoading = true;

            this.loginService.login(this.username, this.password).subscribe((resp) => {

              if (this.loginService.isAuthenticated) {
                this.removeTmp();

                this.userService.updateUserAccount(this.username, data['userAccount']).subscribe(() => {
                  this.loginService.conditionsAgreed = true;
                  this.isLoading = false;
                  this.removeTmp();
                  if (this.shouldNavigate) {
                    this.router.navigate([this.responsiveService.isMobile ? 'home' : 'welcome']);
                  } else {
                    this.romChange.emit('done');
                    this.loginService.loginListener.next('emit');
                  }
                });

              } else {
                this.errorOccured = true;
                this.errorMsg = 'Invalid login credentials';
              }
            });


          });

        });
      } else {
        this.logout();
      }
    }
  }

  logout() {
    this.loginService.logout();
    if (this.shouldNavigate) {
      this.router.navigate(['/entry']);
    } else {
      this.romChange.emit('entry');
    }
  }

  private login(): void {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      if (this.loginService.isAuthenticated) {
        this.removeTmp();
        if (this.shouldNavigate) {
          this.router.navigate([this.responsiveService.isMobile ? 'home' : 'welcome']);
        } else {
          this.romChange.emit('done');
          this.loginService.loginListener.next('emit');
        }
      } else {
        this.errorOccured = true;
        this.errorMsg = 'Invalid login credentials';
      }
    });
  }

  private removeTmp(): void {
    sessionStorage.removeItem('TMP_USERNAME');
    sessionStorage.removeItem('TMP_ACCNT_STATUS');
  }
}
