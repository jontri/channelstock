import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {
  headline: any = '';
  bulletpoints: any = [''];
  constructor() { }

  ngOnInit() {
  }

  removeBulletpoint(idx) {
    this.bulletpoints.splice(idx, 1);
  }

  addBulletpoint() {
    this.bulletpoints.push('');
  }

  // checkForData() {
  //   if (localStorage.getItem('report')) {
  //     const report: any = localStorage.getItem('report');
  //     if (report.headline) {
  //       this.headline = report.headline;
  //     }
  //     if (report.bulletpoints) {
  //       this.bulletpoints = report.bulletpoints;
  //     }
  //   }
  // }

  save() {
    const data = {
      title: this.headline,
      bulletpoints: this.headline
    };
  }

}
