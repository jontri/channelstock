import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from '@angular/core';
import { NewsService, NewsDetailsService, CompanyService } from '@api';
import { News, NewsDetails, Company } from '@models';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilsService, ResponsiveService } from '@shared/services';


@Component({
  selector: 'rom-news-channel-detail',
  templateUrl: './news-channel-detail.component.html',
  styleUrls: ['./news-channel-detail.component.scss']
})
export class NewsChannelDetailComponent implements AfterViewInit, OnInit {
  @ViewChild('bullsContent') bullsContent: ElementRef;
  @ViewChild('bearsContent') bearsContent: ElementRef;
  @ViewChild('balancedContent') balancedContent: ElementRef;
  @Input() participationLevel: string;
  @ViewChild('marketDataTrigger') marketDataTrigger: ElementRef;
  @Input() isFeature: boolean;
  @Input() newsId: number;

  username: string;
  company: Company;

  news: News;
  newsDetailsBear: NewsDetails[];
  newsDetailsBull: NewsDetails[];
  newsDetailsBalanced: NewsDetails[];
  collapseHeightBulls: number;
  expandHeightBulls: number;
  collapseHeightBears: number;
  expandHeightBears: number;
  collapseHeightBalanced: number;
  expandHeightBalanced: number;
  isGeneric = true;
  isEquityReport = true;
  relatedCompanies: Company[];
  id: number;

  constructor(
    public newsService: NewsService,
    public newsServiceDetails: NewsDetailsService,
    private route: ActivatedRoute,
    public companyService: CompanyService,
    public utilsService: UtilsService,
    public responsiveService: ResponsiveService
  ) {


    route.params.subscribe((params: Params) => {

      console.log('Params ID-' + params.id);
      this.getNewsById(params.id);
      this.id = params.id;

    });

    this.username = sessionStorage.getItem('LOGGED_USER');

  }

  ngOnInit() {
    if (this.newsId) {
      console.log('News ID-' + this.newsId);
      this.getNewsById(this.newsId);
      this.id = this.newsId;
    }
  }

  getCompanies(tickers): void {
    this.companyService.getCompaniesByTickers(tickers)
      .subscribe(
        data => {
          console.log(data);
          const companyList = data['searchResult']['companies'];

          if (companyList.constructor === Array) {
            this.relatedCompanies = companyList;
          } else {
            this.relatedCompanies = [companyList];
          }
        }
      );
  }

  isResearchReport(news: News): boolean {
    return news.newsItemType === 'Research';
  }

  ngAfterViewInit()  {
    // if(this.bullsContent) {
      setTimeout(() => {
        // get height of  lines
        this.collapseHeightBulls = 25 * 3;
        this.expandHeightBulls = this.bullsContent ? this.bullsContent.nativeElement.clientHeight : 0;

      }, 1000);
    // }

    // if(this.bearsContent) {
      setTimeout(() => {
        // get height of  lines
        this.collapseHeightBears = 25 * 3;
        this.expandHeightBears = this.bearsContent ? this.bearsContent.nativeElement.clientHeight : 0;

      }, 1000);
    // }

    // if(this.balancedContent) {
      setTimeout(() => {
        // get height of  lines
        this.collapseHeightBalanced = 25 * 3;
        this.expandHeightBalanced = this.balancedContent ? this.balancedContent.nativeElement.clientHeight : 0;

      }, 1000);
    // }
  }

  getNewsById(id) {
    (id ? this.newsService.getNewsById(id) : this.newsService.getFeaturedNews()).subscribe(
      news => {
        this.news = news['News'];
        console.log(this.news);
        this.isGeneric = true;
        this.isEquityReport = this.news.isEquityReport;

        if (this.news.relatedCompanies) {
          console.log('Getting related companies: ' + this.news.relatedCompanies);
          this.getCompanies(this.news.relatedCompanies);
        } else {
          this.relatedCompanies = [];
        }

        this.newsDetailsBull = [];
        this.newsDetailsBear = [];
        this.newsDetailsBalanced = [];

        const callback = () => {
          if (Array.isArray(this.news.newsDetails)) {
            this.news.newsDetails.forEach(element => {

              if (element.content) {
                if (element.section == 'bull') {
                  this.newsDetailsBull.push(element);
                } else if (element.section == 'bear') {
                  this.newsDetailsBear.push(element);
                } else if (element.section == 'balanced') {
                  this.newsDetailsBalanced.push(element);
                }
                this.isGeneric = false;
              }

            });
          } else {

            if (this.news.newsDetails.content) {
              if (this.news.newsDetails.section == 'bull') {
                this.newsDetailsBull.push(this.news.newsDetails);
              } else if (this.news.newsDetails.section == 'bear') {
                this.newsDetailsBear.push(this.news.newsDetails);
              } else if (this.news.newsDetails.section == 'balanced') {
                this.newsDetailsBalanced.push(this.news.newsDetails);
              }
              this.isGeneric = false;
            }

          }
        };

        if (!this.news.newsDetails) {
          this.newsServiceDetails.getAllNewsDetailsByNewsId(this.news.id).subscribe((details) => {
            this.news.newsDetails = details['NewsDetails'];
            callback();
          });
        } else {
          callback();
        }
      });
    }
}
