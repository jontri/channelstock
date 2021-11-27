import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from '@models';
import { RegistrationService } from '@api';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'rom-admroadshow',
  templateUrl: './admroadshow.component.html',
  styleUrls: ['./admroadshow.component.scss']
})
export class AdminRoadshowComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {

  }
}
