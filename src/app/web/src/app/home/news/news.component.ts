import {Component, OnInit, AfterViewInit, HostListener, Input} from '@angular/core';
import { News, Company } from '@models';
import { NewsService, CompanyService } from '@api';
import { ActivatedRoute, Data, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';

import {OrderPipe} from 'ngx-order-pipe';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit, AfterViewInit {

  public news: News[];
  public newsFeatures: News[];
  featuredNews: News;
  companies: Company[];
  companyTickers: any[];
  isExpanded: boolean;
  order = 'date';
  reverse = false;
  sortedCollection: any[];

  @Input() hideExpandClose: boolean;
  @Input() isHome: boolean;


  constructor(
    public newsService: NewsService,
    private route: ActivatedRoute,
    public location: Location,
    public aux: AuxiliaryGuard,
    private orderPipe: OrderPipe,
    private companyService: CompanyService,
    public responsiveService: ResponsiveService
  ) {
    this.route.data.subscribe((data: Data) => {
      this.isExpanded = data.isExpanded;
      this.getAllNews(data.newsItemType);
      this.getFeaturedNews();
    });
    this.route.url.subscribe((url: UrlSegment[]) => {
      // if (url[0].path === 'home') {
        this.getFeaturedNews();
      // }
    });
  }

  get isAdmin(): boolean {
    return localStorage.getItem('ROLES') == 'ADMIN';
  }

  ngOnInit() {}

  ngAfterViewInit() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }

  getAllNews(type: string): void {
    if (this.isAdmin) {
      const api = type ? this.newsService.getPublishedNewsByType(type) : this.newsService.getPublishedNews();
      api.subscribe(
        news => {
          // console.log(news);
          this.news = news['News'];

          // sort by latest published date
          this.news.sort((a: any, b: any) => {
            return new Date(b.date) > new Date(a.date) ? 1 : -1;
          });
          this.sortedCollection = this.orderPipe.transform(this.news, 'date');
          // console.log('sortedCollection', this.sortedCollection);

        });
    } else {
      const api = type ? this.newsService.getPublishedNewsByType(type) : this.newsService.getPublishedCurrentNews();
      api.subscribe(
        news => {
          // console.log(news);
          this.news = news['News'];

          // sort by latest published date
          this.news.sort((a: any, b: any) => {
            return new Date(b.date) > new Date(a.date) ? 1 : -1;
          });
          this.sortedCollection = this.orderPipe.transform(this.news, 'date');
          // console.log('sortedCollection', this.sortedCollection);

        });
    }


  }

  getFeaturedNews(): void {
    this.newsService.getFeaturedNews().subscribe((data) => {
      this.featuredNews = data['News'];
    });
  }

  expand(toggle) {
    this.newsService.expandListener.next(toggle);
  }

  isResearchReport(news: News) : boolean{
    return news.newsItemType === 'Research';
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
    if (this.order === 'date') {
      if (this.reverse) {
      this.news.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else {
        this.news.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    } else {
      this.sortedCollection = this.orderPipe.transform(this.news, this.order, this.reverse);
      // console.log('sortedCollection reordered', this.sortedCollection);
      this.news = this.sortedCollection;
    }
  }
}
