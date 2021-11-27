import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'all-share',
    templateUrl: './allshare.component.html',
    styleUrls: ['./allshare.component.scss']
})

export class ShareComponent {
  shareUrl: string;
  hidden: boolean;

  constructor( private route: Router ) {

  }

  ngOnInit() {
    this.shareUrl = "https://www.channelchek.com/#" + this.route.url;
    console.log("Share URL : " + this.shareUrl);
  }

  ngOnChanges() {
    this.shareUrl = "https://www.channelchek.com/#" + this.route.url;
    console.log("Share URL : " + this.shareUrl);
  }

  mailTo() {
      var yourMessage = "From Channelchek \n\n" + this.shareUrl;
      var subject = "Channechek";
      document.location.href = "mailto:?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);
  }

}
