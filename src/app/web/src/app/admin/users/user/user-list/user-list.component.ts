import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '@api';
import { ConfirmationDialogService } from '@shared/services';

@Component({
  selector: 'rom-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any = [];
  isLoading: Boolean = false;
  accountObj: any;
  accountFailedMsg : any;

  constructor(
    private router: Router,
    private userManagementService: UserManagementService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    console.log("Loading users");
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    console.log("Inside get users");
    this.isLoading = true;
    this.userManagementService.adminGetUserProfiles().subscribe(
    res => {
      this.isLoading = false;
      this.users = res['userProfile'];
    });
  }

  toEditUser(emailAddress:string) {
    this.router.navigate(['admin/users/list/'+emailAddress]);
  }

  toDeleteUser(emailAddress:string) {
    console.log('deleting user : ' + emailAddress );
    //const confirmation = confirm('Are you sure you want to delete ' + emailAddress +'? ');

    //if (confirmation) {

      this.userManagementService.deleteUserProfile(emailAddress).subscribe(
        data => {
          this.accountObj = data['result'];
          if(data['result'].message == "SUCCESS"){
            //this.router.navigate(['admin/users/list']);
            this.getUsers();
          } else {
            this.accountFailedMsg = this.accountObj.messageDesc;
          } 
        }, (error) => {
          console.log(error.message);
          this.accountFailedMsg = error.message;
        }
      );
    //}
  }

  toAddUser() {
    this.router.navigate(['admin/users/add']);
  }

  public openConfirmationDialog(emailAddress:string) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + emailAddress + ' ? ')
    .then((confirmed) => {
      if( confirmed === true){
        console.log('deleting user : ' + emailAddress);
        this.toDeleteUser(emailAddress)
      } else{
        console.log('cancel delete user :'+ emailAddress);
      }    
    })
    .catch(() => console.log('User canceled the delete'));
  }

}
