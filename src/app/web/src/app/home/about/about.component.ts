import { Component, OnInit } from '@angular/core';
import { Link } from '@models';

@Component({
  selector: 'rom-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  links: Link[];

  constructor() { 
    this.links = [
      {label: 'watch it here', path: 'https://noblelinx.com/channelchek_intro.htm', isDisclosure: 'N'}
    ];
  }

  ngOnInit() {
  }

}
