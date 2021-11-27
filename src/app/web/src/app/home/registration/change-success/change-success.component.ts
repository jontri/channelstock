import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rom-change-success',
  templateUrl: './change-success.component.html',
  styleUrls: ['./change-success.component.scss']
})
export class ChangeSuccessComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  toHome(event: Event) {
    this.router.navigate(['companies']);
  }
}
