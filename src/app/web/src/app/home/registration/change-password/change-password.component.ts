import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount, UserProfile } from '@models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService, LoginService } from '@api';
import { AuthService, ResponsiveService } from '@shared/services';
import { blankValidator, passwordValidator } from '@shared/validators';

@Component({
  selector: 'rom-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  name: string;
  username: string;
  userAccount: UserAccount;
  code: string;
  token: string;
  loginObj: any;
  userProfile: UserProfile;
  fullName: string;
  firstName: string;

  changePwdForm: FormGroup;
  frmPassword: FormControl;

  isLoading: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserManagementService,
    private loginService: LoginService,
    public authService: AuthService,
    public responsiveService: ResponsiveService
  ) {

    this.route.params.subscribe(
      params => {
        this.name = params['name'];
        this.username = params['username'];
        this.code = params['password'];
        this.token = params['token'];
        console.log('ChangePassword(): name: ' + this.name + ' username: ' + this.username + ' token: ' + this.token );
      }
    );
  }

  ngOnInit() {

    console.log('change-password onInit: ' + this.token  + '  ' + this.username);
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
                      this.name = this.fullName;
                    }
                  );

              } else {
                console.log('Invalid Token: redirecting 1');
                this.router.navigate(['invalid-token']);
              }
            }, err => {
              console.log('Invalid Token: redirecting 2');

              this.router.navigate(['invalid-token']);
            }
          );

      } else {
        console.log('Empty token: redirecting to login'  );

        this.loginService.logout();
        this.router.navigate(['login']);
      }
    }

    this.createForm();

  }

  createForm() {
    this.changePwdForm = new FormGroup({
      frmPassword: new FormControl('', [Validators.required, blankValidator, passwordValidator])
    }, {updateOn: 'submit'});
  }

  onChangePassword(event: Event) {
    if (this.changePwdForm.valid) {
      const password = this.changePwdForm.value.frmPassword;

      console.log('onChangePassword!');
      this.isLoading = true;

      this.userAccount = new UserAccount('', this.name, this.username, password, false, true, true, false);
      this.userService.updateUserAccount(this.username, this.userAccount).subscribe(
        data => {
          this.loginService.login(this.username, password).subscribe(
            result => {
              if (result['LoginResponse'].message === 'SUCCESS') {
                this.loginService.authenticated = true;
                this.loginService.changedPassword = true;
                sessionStorage.setItem('CHANGEDPWD', 'Y');
                this.authService.loggedUser = this.username;
                this.authService.loggedUserFullName = this.name;
                this.authService.loggedUserFirstName = this.firstName;

                sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.name);
                sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);

                this.loginService.conditionsAgreed = true;
                // this.loginService.authenticated = true;
                sessionStorage.setItem('CONDITIONS_AGREED', 'Y');

                this.router.navigate(['home']);
              }
            }
          );
        }
      );
    }
  }
}
