import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserAccount} from '@models';
import {RegistrationService} from '@api';

import {animate, style, transition, trigger} from '@angular/animations';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-registration',
  templateUrl: './registration.component-new.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class RegistrationComponent {
  @ViewChild('userExistUnverifiedTrigger') userExistUnverifiedTrigger: ElementRef;
  @ViewChild('userExistVerifiedTrigger') userExistVerifiedTrigger: ElementRef;
  @ViewChild('tokenInvalidTrigger') tokenInvalidTrigger: ElementRef;
  @ViewChild('errorMsgTrigger') errorMsgTrigger: ElementRef;
  @ViewChild('SubmitButton') submitButton: ElementRef;

  private userAccount: UserAccount;

  errorOccured = false;
  errorMsg: string;

  isLoading: Boolean = false;

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    public responsiveService: ResponsiveService
  ) { }

  redirectToResetPassword() {
    this.router.navigate(['login']);
  }

  resendVerification() {
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
          console.log(err);
        }
      );
  }
}
