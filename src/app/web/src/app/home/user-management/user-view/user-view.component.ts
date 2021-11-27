import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '@api';
//import { UserProfile } from '@models';

@Component({
  selector: 'rom-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  userProfile: any;

  constructor(private userManagementService: UserManagementService, private router: Router) { 

    if(!this.userProfile){
      this.userProfile={};
    }
  }

  ngOnInit() {
    let loggedUser = sessionStorage.getItem('LOGGED_USER');
    this.getUserProfile(loggedUser);
  }

  getUserProfile(emailAddress: String): void  {
    this.userManagementService.getUserProfile(emailAddress)
    .subscribe(userProfile => {
                                this.userProfile = userProfile['userProfile'];
                              });       
  }

  gotoEditProfile() {
    this.router.navigate(['admin/profile-edit']);
  }
}
