import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';
import { Location, DOCUMENT } from '@angular/common';
import { CorporateFilingsService } from '@api';
import { Company } from '@models';

@Component({
  selector: 'rom-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.scss']
})
export class RecentNewsComponent implements OnChanges {
  isExpanded: boolean;

  @Input() company: Company;

  newsId: string;
  headline: any;
  newsStory: any;
  isLoading: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public aux: AuxiliaryGuard,
    public location: Location,
    private corporateFilingService: CorporateFilingsService
  ) {
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);
    this.route.params.subscribe((params: Params) => {
      if (params.symbol) {
        this.getNews(params.symbol);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.company && changes.company.currentValue) {
      const company = changes.company.currentValue;
      // console.log('company symbol ngOnInit: ' + company.symbol);
      if (!changes.company.previousValue || company.symbol !== changes.company.previousValue.symbol) {
        this.getNews(company.symbol);
      }
    }
  }

  private getNews(symbol: string): void {
    this.isLoading = true;
    this.newsStory = '';
    this.corporateFilingService.getPressReleases(symbol).subscribe(
      data => {
        if (data && data['results'].news) {
          this.headline = data['results'].news[0].newsitem[0].headline;
          this.newsId = data['results'].news[0].newsitem[0].newsid;

          this.corporateFilingService.getNewsStory(this.newsId)
            .subscribe(
              story => {
                this.newsStory = story;
                // console.log("recent news story: " + this.newsStory);
                this.isLoading = false;
              }
            );
        } else {
          this.isLoading = false;
          this.newsStory = '<div class=\'ml- pl-4 pt-5\'>No Recent News</div>';
        }
      }
    );
  }
}
