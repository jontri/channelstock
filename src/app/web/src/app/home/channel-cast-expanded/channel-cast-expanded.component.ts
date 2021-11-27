import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChannelCastsService } from "@api";
import { ChannelCasts } from "@models";

@Component({
  selector: "rom-channel-cast-expanded",
  templateUrl: "./channel-cast-expanded.component.html",
  styleUrls: ["./channel-cast-expanded.component.scss"]
})
export class ChannelCastExpandedComponent implements OnInit {
  channelCasts: ChannelCasts[];

  constructor(
    private router: Router,
    private channelCastsService: ChannelCastsService
  ) {}

  ngOnInit() {
    this.getAllChannelCasts();
  }

  getAllChannelCasts() {
    this.channelCastsService.getAllChannelCasts().subscribe(channelCasts => {
      this.channelCasts = channelCasts['ChannelCast'];
      console.log(channelCasts);
    });
  }

  expand(toggle) {
    this.channelCastsService.expandListener.next(toggle);
  }

  doRedirect(castId) {
    this.expand(false);
    this.router.navigate(['channelcast-detail', castId]);
  }
}
