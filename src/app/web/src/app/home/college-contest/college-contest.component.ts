import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-about',
  templateUrl: './college-contest.component.html',
  styleUrls: ['./college-contest.component.scss']
})
export class CollegeContestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDialog(url){

    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");

  }
}
