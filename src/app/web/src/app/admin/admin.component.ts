import { Component, OnInit } from '@angular/core';
import { LoginService } from '@api';

@Component({
  selector: 'rom-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private loginSuccess: boolean;
  constructor(
    private loginService: LoginService,
  ) {
    this.loginSuccess = this.loginService.isAuthenticated;
  }

  ngOnInit() {
  }

  get isLoginSuccess(): boolean {
    return this.loginSuccess;
  }
}
