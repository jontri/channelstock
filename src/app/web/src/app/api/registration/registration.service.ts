import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAccount } from '@models';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private USER_REGISTRATION_SERVICE_URL = '/services/UserProfile/user/registration';
  userAccount: UserAccount;

  constructor(private httpClient: HttpClient) {

  }


  registerUser(userAccount: UserAccount) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const json = JSON.stringify({ userAccount });
    //console.log('RegistrationService.registerUser: ' + json);
    return this.httpClient.put(this.USER_REGISTRATION_SERVICE_URL, json, httpOptions);
  }

  checkAccount(username: string){
    return this.httpClient.get(this.USER_REGISTRATION_SERVICE_URL + "/checkaccount/" + username);
  }
}
