import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'rom-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  source: string;

  constructor(
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe((params: Params) => {
      this.source = params.source;
    });
  }

  ngOnInit() {
  }

}
