import { Component, OnInit } from '@angular/core';
import {News } from '@models';
import { NewsService } from '@api';

@Component({
  selector: 'rom-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  public news: News[];

  constructor(public newsService: NewsService) {    
    this.getAllNews();              
  }

  ngOnInit() {}

  getAllNews() {
    this.newsService.getAllNews()
    .subscribe(
      news => {
        this.news = news;
      });
  }
}
