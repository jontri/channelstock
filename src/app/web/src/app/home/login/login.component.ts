import {Component, ElementRef, ViewChild} from '@angular/core';
import {RegistrationService} from '@api';
import {Router, ActivatedRoute, UrlSegment} from '@angular/router';
import {UserAccount} from '@models';
import {ResponsiveService} from '@shared/services';

declare var $: any;

@Component({
  selector: 'rom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('userExistUnverifiedTrigger') userExistUnverifiedTrigger: ElementRef;
  @ViewChild('userExistVerifiedTrigger') userExistVerifiedTrigger: ElementRef;
  @ViewChild('tokenInvalidTrigger') tokenInvalidTrigger: ElementRef;
  @ViewChild('errorMsgTrigger') errorMsgTrigger: ElementRef;

  userAccount: UserAccount;

  isLoading: Boolean = false;
  headerDescription: string;

  errorOccured = false;
  errorMsg: string;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    public responsiveService: ResponsiveService
  ) {
    route.url.subscribe(this.extractHeaderDescription.bind(this));
  }

  resendVerification() {
    this.isLoading = true;
    this.registrationService.registerUser(this.userAccount)
      .subscribe(
        result => {
          // console.log(result);
          if (result['result'].message === 'FAILED') {
              this.errorOccured = true;
              this.errorMsg = result['result'].messageDesc;
              // console.log('errorMsg: ' + this.errorMsg);
          } else if (result['result'].message === 'RESEND') {
              this.errorMsg = result['result'].messageDesc;
              // console.log('message: ' + result['result'].message + ' errorMsg: ' + this.errorMsg);
              this.router.navigate(['thank-you']);
          } else {
            this.router.navigate(['thank-you']);
          }
        },
        err => {
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  private extractHeaderDescription(url: UrlSegment): void {
    this.headerDescription = 'The Universe is emerging.';
    if (url[0]) {
      switch (url[0].path) {
        case 'session-expired': {
          this.headerDescription = 'Session Expired';
          break;
        }
      }
    }
  }
}
