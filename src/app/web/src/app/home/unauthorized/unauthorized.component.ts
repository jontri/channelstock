import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rom-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toHome() {
    this.router.navigate(['']);
  }

}
