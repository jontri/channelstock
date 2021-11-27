import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@api';

@Component({
  selector: 'rom-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  username: string;
  password: string;
  accountObj: any;
  accountFailedMsg: string;
  accountSuccessMsg: string;
  generatedPassword: string;
  visible = false;
  disabled = false;

  accountForm = new FormGroup ({
   emailAddress: new FormControl()
  });

  createForm() {
    this.accountForm = this.fb.group({
      emailAddress : ['', Validators.required ],
    });
  }

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  onReset(event: Event) {
    this.disabled = true;
    this.generateRandomString(8);
    this.loginService.recoverAccount(this.username, this.generatedPassword)
    .subscribe(
      result => {
        this.accountObj = result['result'];
        // console.log(this.accountObj.message);
        // console.log(this.accountObj.messageDesc);

        if (this.accountObj.message === 'SUCCESS') {
          // console.log('SUCCESS');
          //this.accountSuccessMsg = this.accountObj.messageDesc;
          this.accountSuccessMsg= 'An email has been sent to you with instructions on how to reset your password.';
          this.accountFailedMsg = '';
          this.visible = true;
        } else {
          // console.log('FAILED');
          this.disabled = false;
          this.accountSuccessMsg = '';
          this.accountFailedMsg = this.accountObj.messageDesc;
        }
    },
    err => {
        // console.log(err);
        this.disabled = false;
        this.accountSuccessMsg = '';
        this.accountFailedMsg = 'Cannot reset password : ' + err;
    }
    );
  }

  backToHomePage() {
    this.router.navigate(['login']);
  }

  generateRandomString(len) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let initialPassword = '';
    for (let i = 0; i < len; i++) {
      initialPassword += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.generatedPassword = initialPassword;
  }
}
