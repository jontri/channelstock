import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  timeSensitive: any = 'no';
  constructor() { }

  ngOnInit() {
  }

  listenForCertificationType(value) {
    this.timeSensitive = value;
  }

}
