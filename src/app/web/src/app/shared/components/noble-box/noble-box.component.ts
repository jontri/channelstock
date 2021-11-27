import { Component, OnInit, Input } from '@angular/core';
import { Link } from '@models';

@Component({
  selector: 'rom-noble-box',
  templateUrl: './noble-box.component.html',
  styleUrls: ['./noble-box.component.scss']
})
export class NobleBoxComponent implements OnInit {
  @Input() imgSrc: string;
  @Input() links: Link[];
  @Input() isDisclosure: string;

  constructor() { }

  showDialog: boolean;

  ngOnInit() {
  }

  // Opens new dialog/window of a browser
  openDialog(url){
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700");
  }
}
