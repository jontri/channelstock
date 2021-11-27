import { Component, OnInit } from '@angular/core';
import { NewsService } from '@api';
import { News } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'rom-news-expanded',
  templateUrl: './news-expanded.component.html',
  styleUrls: ['./news-expanded.component.scss']
})
export class NewsExpandedComponent implements OnInit {

  news: News[];

  constructor(
    public newsService: NewsService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews()
    .subscribe(
      news => {
        this.news = news['News'];
      });
  }

  expand(toggle) {
    this.newsService.expandListener.next(toggle);
  }

  doRedirect(newsId) {
    this.expand(false);
    this.router.navigate(['news-channel', newsId]);
  }
}
