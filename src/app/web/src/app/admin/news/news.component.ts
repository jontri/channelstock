import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('News Component Init');
  }

}
