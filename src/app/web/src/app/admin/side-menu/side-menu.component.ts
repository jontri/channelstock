import { Component, OnInit } from '@angular/core';

import { RoadShow } from '@models';
import { RoadShowService, LoginService } from '@api';

@Component({
  selector: 'rom-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {

  constructor( public loginService: LoginService) {  }

  ngOnInit() {
    console.log("IsAdmin: " + this.loginService.isAdmin)
  }

}
