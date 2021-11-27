import { Component, OnInit } from '@angular/core';
import { RoadShow } from '@models';
import {Router} from "@angular/router";

@Component({
  selector: 'rom-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  isLoading: Boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  toHome() {
    this.router.navigate(['']);
  }

}
