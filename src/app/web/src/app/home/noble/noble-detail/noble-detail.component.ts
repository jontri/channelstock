import { Component, OnInit } from '@angular/core';
import { Link } from '@models';

@Component({
  selector: 'rom-noble-detail',
  templateUrl: './noble-detail.component.html',
  styleUrls: ['./noble-detail.component.scss']
})
export class NobleDetailComponent implements OnInit {
  links: Link[];
  marketlinks: Link[];

 constructor() {
  this.links = [
    {label: 'Noble Website', path: 'https://noblecapitalmarkets.com/', isDisclosure: 'N'},
    {label: 'Noble Research Analysts', path: 'https://noblecapitalmarkets.com/research#research-team/', isDisclosure: 'N'},
    {label: 'FINRA', path: 'https://www.finra.org/', isDisclosure: 'N'},
    {label: 'SIPC', path: 'https://www.sipc.org/', isDisclosure: 'N'},
    {label: 'MSRB', path: 'https://www.msrb.org/', isDisclosure: 'N'},
    {label: 'FINRA Brokercheck', path: 'https://brokercheck.finra.org', isDisclosure: 'N'},
    {label: 'Privacy', path: 'https://noblecapitalmarkets.com/privacy-policy', isDisclosure: 'N'},
    {label: 'Business Disruption', path: 'https://noblecapitalmarkets.com/business-disruption', isDisclosure: 'N'},
    {label: 'Margin', path: 'https://noblecapitalmarkets.com/margin', isDisclosure: 'N'},
    {label: 'Execution Stats', path: 'https://noblecapitalmarkets.com/execution-statistics', isDisclosure: 'N'},
    {label: 'Extended Hours', path: 'https://noblecapitalmarkets.com/extended-hours', isDisclosure: 'N'}
  ];
}
  ngOnInit() {

  }
}
