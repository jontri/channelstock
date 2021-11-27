import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService, UserManagementService, LoginService } from '@api';
import { AuthService } from '@shared/services';
import { UserAccount } from '@models';

@Component({
  selector: 'rom-termsconditions',
  templateUrl: './termsconditions.component.html',
  styleUrls: ['./termsconditions.component.scss']
})
export class TermsconditionsComponent implements OnInit {
  @ViewChild('disagreeTermsConditionsTrigger') disagreeTermsConditionsTrigger: ElementRef;

  username: string;
  userAccount: UserAccount;
  errorOccured: boolean;
  showDialog: boolean;

  close(){

  }

  constructor(
    private router: Router,
    private userService: UserManagementService,
    private loginService: LoginService,
    public authService: AuthService
    ) { }

  ngOnInit() {
  }

  toggleAgreement(value: Boolean) {
    if (value) {
      this.username = this.authService.loggedUser;
      this.userService.getUserAccount(this.username)
          .subscribe(
            data => {
              console.log("conditions: " + data['userAccount'].conditionsAgreed);
               if(!data['userAccount'].conditionsAgreed){
                  if (data['userAccount'].firstLogin) {
                    data['userAccount'].firstLogin = false;
                    data['userAccount'].conditionsAgreed = true;
                    this.loginService.conditionsAgreed = true;
                    sessionStorage.setItem('CONDITIONS_AGREED', "Y");
                    this.userService.updateUserAccount(this.username, data['userAccount']).subscribe();
                    this.router.navigate(['welcome']);
                  }
                  else{
                    data['userAccount'].conditionsAgreed = true;
                    this.loginService.conditionsAgreed = true;
                    sessionStorage.setItem('CONDITIONS_AGREED', "Y");
                    this.userService.updateUserAccount(this.username, data['userAccount']).subscribe();
                    this.router.navigate(['companies']);
                  }
               }
               else{
                  this.router.navigate(['companies']);
               }
            }
          );
    } else {
      this.disagreeTermsConditionsTrigger.nativeElement.click();
    }
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

}
