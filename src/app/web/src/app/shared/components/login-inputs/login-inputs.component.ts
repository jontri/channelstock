import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService, UserManagementService, RegistrationService } from '@api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/services';
import { UserAccount } from '@models';
import { blankValidator, passwordValidator } from '@shared/validators';
import { CookieService } from 'ngx-cookie-service';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'rom-login-inputs',
  templateUrl: './login-inputs.component.html',
  styleUrls: ['./login-inputs.component.scss']
})
export class LoginInputsComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  @ViewChild('changePasswordTrigger') changePasswordTrigger: ElementRef;
  @ViewChild('resetPasswordTrigger') resetPasswordTrigger: ElementRef;

  @Input() shouldNavigate = true;
  @Input() isMobile = false;
  @Input() isModal = false;

  @Output() romChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() romClose: EventEmitter<string> = new EventEmitter<string>();

  notRegistered: boolean;
  userAccount: UserAccount;

  submitObserver: Observer<void>;
  isLoading: Boolean = false;
  loginObj: any;
  loginFailedMsg: string;
  fullName: string;
  firstName: string;
  passwordLabel: string;
  inputsHeader: string;
  public isLoginSuccess: boolean;
  conditionsAgreed: boolean;
  token: string;
  // showCarousel: Boolean;
  submitObservable: Observable<void>;
  headerDescription: string;

  loginForm: FormGroup;

  public email: string;
  USER_EXISTS_UNVERIFIED_MSG = 'Email address is already registered. <br/> Please check your email to verify your account.';
  USER_ALREADY_VERIFIED_MSG = 'Email address is already registered and verified.<br/> Please use your email address to login.';
  TOKEN_INVALID_MSG = 'Verify URL has expired.  Please register again to get a new verification email.';
  EMAIL_ADDRESS_INVALID_MSG = 'Email address format is not valid.';
  EMAIL_ADDRESS_BLANK_MSG = 'Email address is required.';
  USER_DELETED_MSG = 'Cannot create account.  Email address already exists.';

  constructor(
    private loginService: LoginService,
    private userService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private cookieService: CookieService,
    private registrationService: RegistrationService
  ) {
    this.submitObservable = Observable.create((observer: Observer<void>) => {
      this.submitObserver = observer;
    });

    route.params.subscribe(this.extractParams.bind(this));
  }

  ngOnInit() {
    this.checkCookies();
  }

  checkCookies() {

  }

  ngAfterViewInit() {
    if (this.input) {
      this.input.nativeElement.focus();
    }
  }

  onLoginUser() {
    this.loginFailedMsg = '';
    this.isLoading = true;

    const username = this.loginForm.controls.frmUsername.value;
    const password = this.loginForm.value.frmPassword;
    if (this.loginForm.valid || username.toLowerCase() === 'admin') {
      this.isLoading = true;

      this.loginService.login(username, password).subscribe(result => {
        this.loginObj = result['LoginResponse'];

        if (this.loginObj.message === 'SUCCESS') {
          this.doLoginNavigate(username);
        } else {

          if (this.notRegistered) {
            sessionStorage.setItem('TMP_PASSWORD', password);
            if (this.shouldNavigate) {
              this.router.navigate(['registration']);
            } else {
              this.romChange.emit('registration');
            }
          } else {
            this.loginFailedMsg = 'Invalid login credentials';
          }

          this.isLoading = false;

        }
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
    }
  }

  doLoginNavigate(username: string) {
    this.isLoading = true;
    this.userService.getUserProfile(username).subscribe(result => {
      const username = this.loginForm.controls.frmUsername.value;
      const password = this.loginForm.value.frmPassword;
      // console.log('result', result);
      const userProfile = result['userProfile'];
      this.fullName = `${userProfile.firstName} ${userProfile.lastName}`;
      this.firstName = userProfile.firstName;
      const id = userProfile.id;
      this.loginService.loginListener.next('emit');

      this.userService.getUserAccount(username).subscribe(data => {
        this.userAccount = data['userAccount'];
        // set cookie
        this.cookieService.set('hasLoggedIn', 'true');

        this.authService.loggedUser = username;
        this.authService.loggedUserFullName = this.fullName;
        this.authService.loggedUserFirstName = this.firstName;
        this.authService.loggedId = id;

        sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.fullName);
        sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);
        sessionStorage.setItem('LOGGED_ID', id.toString());
        sessionStorage.setItem('HAS_LOGGED_IN', 'true');

        this.isLoading = false;

        console.log('TempAuth : ' + this.userAccount.tempAuth);

        if (!this.userAccount.conditionsAgreed) {
          sessionStorage.setItem('TMP_PASSWORD', password);

          this.loginService.logout();

          if (this.shouldNavigate) {
            this.router.navigate(['registration']);
          } else {
            this.romChange.emit('registration');
          }
        } else if (this.userAccount.tempAuth) {
          this.changePasswordTrigger.nativeElement.click();
        } else {

          if (this.shouldNavigate) {
            this.tryDeepLink(() => {
              this.router.navigate(['home']);
            });
          } else {
            this.userService.isUserEnhanced(userProfile.id).subscribe((isPreferenceFilled: boolean) => {
              console.log('Is user enhanced: ', isPreferenceFilled);
              console.log("Done emit");
              this.romChange.emit('done');
              this.loginService.loginListener.next('emit');
            });
          }
        }
      });
    });
  }

  toLogin() {
    // this.showCarousel = !this.showCarousel;
  }

  onPasswordChanged(password) {
    console.log('On change password login');
    this.isLoading = true;

    if (password) {
      const username = this.loginForm.controls.frmUsername.value;
      this.userAccount.password = password;
      this.userService.updateUserAccount(username, this.userAccount).subscribe(data => {
        this.loginService.login(username, password).subscribe(result => {
          if (result['LoginResponse'].message === 'SUCCESS') {
            this.authService.loggedUser = username;
            this.authService.loggedUserFullName = this.fullName;
            this.authService.loggedUserFirstName = this.firstName;

            sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.fullName);
            sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);

            this.isLoading = false;

            setTimeout(this.changePasswordTrigger.nativeElement.click(), 2000);
            setTimeout(() => {
              if (this.shouldNavigate) {
                this.router.navigate(['companies']);
              } else {
                this.romChange.emit('done');
                this.loginService.loginListener.next('emit');
              }
            }, 3000);

            // Will take care of routing to deep link or home.
            this.skipChangePass();
          }
          this.isLoading = false;
        });
      });
    }
  }

  skipChangePass() {
    this.isLoading = true;
    if (this.shouldNavigate) {
      this.tryDeepLink(() => {
        this.router.navigate(['home']);
      });
    } else {
      this.romChange.emit('done');
      this.loginService.loginListener.next('emit');
    }
  }

  resetPassword() {
    this.isLoading = true;
    this.loginService.recoverAccount(this.userAccount.userName).subscribe(data => {

      setTimeout(this.resetPasswordTrigger.nativeElement.click(), 1000);
      setTimeout(() => {
        if (this.shouldNavigate) {
          console.log("Here1");
          this.router.navigate(['/entry']);
        } else {
          console.log("Here2");

          // this.romChange.emit('done');
          this.loginService.loginListener.next('emit');
          this.romClose.emit('done');
        }
      }, 2000);

      this.isLoading = false;
    });
  }



  // check here if tempAuth is true
  //  - if it's true - prepopulate the username and prepopulate the password with 'channel2018'
  //  - if it's false - prepopulate username but leave the password blank
  private processUserAccount(data): void {
    this.userAccount = data['userAccount'];
    const tempAuth = this.userAccount.tempAuth;
    console.log('Temp Auth: ' + tempAuth);

    if (tempAuth == true) {
      this.setDefaultPass();
    } else {
      this.loginForm.controls.frmPassword.setValue('');
    }
    this.registrationService.checkAccount(this.loginForm.controls.frmUsername.value).subscribe(
      this.processCheckAccount.bind(this)
    );
  }

  private processCheckAccount(data): void {
    sessionStorage.setItem('TMP_ACCNT_STATUS', data['result'].message);
    this.notRegistered = data['result'].message === 'USER_AVAILABLE';

    if (this.notRegistered) {
      this.passwordLabel = 'Create Password';
      this.inputsHeader = 'New User';
      this.loginForm.controls.frmPassword.setValidators([Validators.required, blankValidator, passwordValidator]);
    } else if (!this.userAccount.tempAuth) {
      this.passwordLabel = 'Password';
      this.inputsHeader = 'Log In';
    }
  }

  private extractParams(params: Params) {
    if (params.username) {
      // Store username from params to session storage.
      sessionStorage.setItem('TMP_USERNAME', params.username);
      // Navigate to entry page.
      if (this.shouldNavigate) {
        this.router.navigate(['/entry']);
      } else {
        this.romChange.emit('entry');
      }
      return;
    }
    const username = sessionStorage.getItem('TMP_USERNAME');
    if (!username) {
      if (this.shouldNavigate) {
        this.router.navigate(['/entry']);
      } else {
        this.romChange.emit('entry');
      }
    }
    this.loginForm = new FormGroup({
      frmUsername: new FormControl({value: username || '', disabled: true}),
      frmPassword: new FormControl('', [Validators.required, blankValidator])
    }, {updateOn: 'submit'});

    console.log('Login(): username: ' + username );

    this.userService.getUserAccount(username).subscribe(this.processUserAccount.bind(this));
  }

  private setDefaultPass(): void {
    this.loginForm.controls.frmPassword.setValue('channel2018');
    this.passwordLabel = 'Access Code';
  }

  private tryDeepLink(routeFn: Function): void {
    this.removeTmp();
    if (this.authService.deepLink) {
      this.router.navigateByUrl(this.authService.deepLink);
      this.authService.deepLink = '';
    } else {
      routeFn();
    }
  }

  private removeTmp(): void {
    sessionStorage.removeItem('TMP_USERNAME');
    sessionStorage.removeItem('TMP_ACCNT_STATUS');
  }
}
