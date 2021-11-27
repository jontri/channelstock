import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "@api";
import { UserAccount } from "@models";
import { AuthService } from "@shared/services";

@Component({
  selector: "rom-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  isExpanded: boolean;
  userAccount: UserAccount;

  constructor(
    private userService: UserManagementService,
    public authService: AuthService
  ) {
    
   

  }

  ngOnInit() {
    
  }
}
