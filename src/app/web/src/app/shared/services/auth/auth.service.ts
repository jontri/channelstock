import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static LOGGED_ID = 'LOGGED_ID';
  public static LOGGED_USER = 'LOGGED_USER';
  public static LOGGED_USER_FULL_NAME = 'LOGGED_USER_FULL_NAME';
  public static LOGGED_USER_FIRST_NAME = 'LOGGED_USER_FIRST_NAME';
  private static readonly DEEP_LINK = 'DEEP_LINK';
  private static readonly AUTH_TOKEN = 'AUTH_TOKEN';

  private user: string;
  private fullname: string;
  private firstname: string;
  private id: number;
  private jwtToken: string;
  private jwtHelper = new JwtHelperService();
  private isRegisterModalOpen = false;

  constructor() {
    this.loggedUser = sessionStorage.getItem(AuthService.LOGGED_USER);
    this.loggedUserFullName = sessionStorage.getItem(AuthService.LOGGED_USER_FULL_NAME);
    this.loggedUserFirstName = sessionStorage.getItem(AuthService.LOGGED_USER_FIRST_NAME);
    this.loggedId = parseInt(sessionStorage.getItem(AuthService.LOGGED_ID));
    this.jwtToken = localStorage.getItem(AuthService.AUTH_TOKEN);
  }

  get loggedUser(): string {
    return this.user;
  }

  set loggedUser(user: string) {
    this.user = user;
  }

  get loggedUserFullName(): string {
    return this.fullname;
  }

  set loggedUserFullName(fullname: string) {
    this.fullname = fullname;
  }

  get loggedUserFirstName(): string {
    return this.firstname;
  }

  get deepLink(): string {
    return sessionStorage.getItem(AuthService.DEEP_LINK);
  }

  set loggedUserFirstName(firstname: string) {
    this.firstname = firstname;
  }

  get loggedId(): number {
    return this.id;
  }

  set loggedId(id: number) {
    this.id = id;
  }

  set deepLink(link: string) {
    if (link) {
      sessionStorage.setItem(AuthService.DEEP_LINK, link);
    } else {
      sessionStorage.removeItem(AuthService.DEEP_LINK);
    }
  }

  get isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.jwtToken);
  }

  get tokenExpirationDate() {
    return this.jwtHelper.isTokenExpired(this.jwtToken);
  }

  get token() {
    return this.jwtToken = localStorage.getItem(AuthService.AUTH_TOKEN);
  }

  get isRegisterOpen(): boolean {
    return this.isRegisterModalOpen;
  }

  set isRegisterOpen(val: boolean) {
    this.isRegisterModalOpen = val;
  }

  public toggleRegister(): void {
    this.isRegisterModalOpen = !this.isRegisterModalOpen;
  }
}
