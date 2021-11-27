import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnInit {
  body: any = '';
  constructor() { }

  ngOnInit() {
  }

  save() {
  }

}
