import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rom-meet-the-management-blocker',
  templateUrl: './meet-the-management-blocker.component.html',
  styleUrls: ['./meet-the-management-blocker.component.scss']
})
export class MeetTheManagementBlockerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openDialog(url){

    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");

  }

}
