import { Component, OnInit } from '@angular/core';
import { NobleIndex } from '@models';

@Component({
  selector: 'rom-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  public nobleList: NobleIndex[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
