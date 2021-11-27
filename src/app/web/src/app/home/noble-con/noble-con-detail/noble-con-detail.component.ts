import { Component, OnInit } from '@angular/core';
import { Link } from '@models';

@Component({
  selector: 'rom-noble-con-detail',
  templateUrl: './noble-con-detail.component.html',
  styleUrls: ['./noble-con-detail.component.scss']
})
export class NobleConDetailComponent implements OnInit {
  links: Link[];

  constructor() {
    this.links = [
      { label: 'WATCH WEBCASTS FROM NOBLECONXV held January 28-29, 2019 at W Fort Lauderdale Beach', path: 'http://noble.mediasite.com/mediasite/Catalog/catalogs/noblecon-2019', isDisclosure: 'N' }
    ];
  }

  ngOnInit() {
  }

}
