import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.scss']
})
export class OfferingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDialog(url){

    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");

  }

}
