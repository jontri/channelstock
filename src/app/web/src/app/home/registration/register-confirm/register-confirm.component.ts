import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LoginService, UserManagementService } from '@api';
import { Router } from '@angular/router';
import { UserProfile } from '@models';
import { reject } from 'q';
import { AuthService } from 'app/shared/services/index';

@Component({
  selector: 'rom-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit, AfterViewInit {
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

  constructor(
    private loginService: LoginService,
    private userService: UserManagementService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  onLogin(event: Event) {
    this.isLoading = true;
    this.loginService.login(this.username, this.password)
      .subscribe(
        result => {
          this.loginObj = result['LoginResponse'];

          if (this.loginObj.message === 'SUCCESS') {
            this.doLoginNavigate(this.username);
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
            // console.log('data', data);
            // console.log('First Time Login: ' + data['userAccount'].firstLogin);
            this.token = data['userAccount'].token;
            this.authService.loggedUser = username;
            this.authService.loggedUserFullName = this.fullName;
            this.authService.loggedUserFirstName = this.firstName;
            this.authService.loggedId = this.id;

            sessionStorage.setItem('LOGGED_USER_FULL_NAME', this.fullName);
            sessionStorage.setItem('LOGGED_USER_FIRST_NAME', this.firstName);
            sessionStorage.setItem('LOGGED_ID', this.id.toString());

            this.isLoading = false;
            if (data['userAccount'].disabled) {
              if(this.loginService.authenticated && (this.token == null || this.token === 'undefined')){
                this.router.navigate(['setup-password', this.fullName, this.username]);
              }
              else{
                this.router.navigate(['setup-password', this.fullName, this.username, data['userAccount'].token]);
              }
            } else {
              if (data['userAccount'].conditionsAgreed){
                if (data['userAccount'].firstLogin) {
                  data['userAccount'].firstLogin = false;
                  this.userService.updateUserAccount(username, data['userAccount']).subscribe();
                  this.router.navigate(['welcome']);
                } else {
                  this.router.navigate(['companies']);
                }
                window.location.reload();
              }
              else{
                this.router.navigate(['terms-conditions']);
              }
            }
          });
        }
      );
  }
}
