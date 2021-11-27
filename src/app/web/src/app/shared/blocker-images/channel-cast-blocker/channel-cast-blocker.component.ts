import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rom-channel-cast-blocker',
  templateUrl: './channel-cast-blocker.component.html',
  styleUrls: ['./channel-cast-blocker.component.scss']
})
export class ChannelCastBlockerComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openDialog(url){

    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");

  }

}
