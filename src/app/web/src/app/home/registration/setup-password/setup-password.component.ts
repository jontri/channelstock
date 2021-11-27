import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount, UserProfile } from '@models';
import { UserManagementService, LoginService } from '@api';
import { AuthService } from '@shared/services';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'rom-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.scss']
})
export class SetupPasswordComponent implements OnInit {
  submitObserver: Observer<void>;
  name: string;
  username: string;
  userAccount: UserAccount;
  code: string;
  token: string;
  loginObj: any;
  userProfile: UserProfile;
  fullName: string;
  firstName: string;
  submitObservable: Observable<void>;

  isLoading: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserManagementService,
    private loginService: LoginService,
    public authService: AuthService
  ) {
    this.route.params.subscribe(
      params => {
        // console.log(params)
        this.name = params['name'];
        this.username = params['username'];
        this.code = params['password'];
        this.token = params['token'];
        console.log('SetupPassword(): name: ' + this.name + ' username: ' + this.username + ' token: ' + this.token );
      }
    );
    this.submitObservable = Observable.create((observer: Observer<void>) => {
      this.submitObserver = observer;
    });
  }

  ngOnInit() {
    console.log('setup-password onInit: ' + this.token  + '  ' + this.username);
    if (!this.loginService.authenticated) {
      if (this.token != null && this.token != 'undefined' && this.token.length > 0) {

        console.log('Before verifying token');
        this.loginService.verifyToken(this.username, this.token)
          .subscribe(
            result => {
              console.log(result);
              this.loginObj = result['LoginResponse'];

              if (this.loginObj.message === 'SUCCESS') {
                console.log('Token verified for ' + this.username);

                this.userService.getUserProfile(this.username)
                  .subscribe(
                    result => {
                      this.userProfile = result['userProfile'];
                      this.fullName = this.userProfile.firstName + ' ' + this.userProfile.lastName;
                      this.firstName = this.userProfile.firstName ;

                      this.authService.loggedUser = this.username;
                      this.authService.loggedUserFullName = this.fullName;
                      this.authService.loggedUserFirstName = this.firstName;
                      this.name = this.firstName;
                    }
                  );

              } else {
                this.router.navigate(['verify-token/invalid_token']);
              }
            }, err => {
              this.router.navigate(['verify-token/invalid_token']);
            }
          );

        // this.userService.getUserAccount(this.username)
        //   .subscribe(
        //     data => {
        //         console.log('Comparing token: ' + this.token == data['userAccount'].token + '  ' + this.token +   '  '  + data['userAccount'].token );
        //         if(this.token != data['userAccount'].token){
        //           this.router.navigate(['verify-token/invalid_token']);
        //         }
        //     }
        //   );

      } else {
        console.log('Empty token: redirecting to login'  );

        this.loginService.logout();
        this.router.navigate(['login']);
      }
    }

  }

  onSetupPassword(password: string) {
    if (password) {
      console.log('onSetupPassword!');
      this.isLoading = true;

      this.userAccount = new UserAccount('', this.name, this.username, password, false, true, false, false);

      this.userService.updateUserAccount(this.username, this.userAccount).subscribe(updateResult => {
        this.loginService.login(this.username, password).subscribe(result => {
          console.log(result);
          if (result['LoginResponse'].message === 'SUCCESS') {
            this.loginService.authenticated = true;
            this.loginService.changedPassword = true;
            sessionStorage.setItem('CHANGEDPWD', 'Y');
            this.authService.loggedUser = this.username;
            this.authService.loggedUserFullName = this.name;
            this.authService.loggedUserFirstName = this.firstName;

            sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.name);
            sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);

            this.userService.getUserAccount(this.username).subscribe(data => {
              if (!data['userAccount'].conditionsAgreed) {
                this.router.navigate(['terms-conditions']);
              } else {
                // this.router.navigate(['companies']);
                this.router.navigate(['home']);
              }
            });
          } else {
            console.log('Failed to login after registration');
          }
        });
      });
    }
  }
}
