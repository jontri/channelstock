import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Company } from '@models';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { CompanyService, WatchListService } from '@api';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'rom-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  private sub: any;
  tickerSymbol: string;
  public company: Company;
  username: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private watchListService: WatchListService
  ) {
    this.username = sessionStorage.getItem('LOGGED_USER');
  }



  getCompanyByTickerSymbol(ticker: string): void {
    this.companyService.getCompanyByTickerSymbol(ticker)
      .subscribe(
        company => {
          // console.log(company);
          this.company = company['company'];
          // console.log('company name: ' + this.company.companyName);
          this.watchListService.getWatchList().subscribe(
            watchlist => {
              this.company.isAddedToWatchList = false;
              watchlist.forEach(element => {
                if (element.company.symbol === this.company.symbol) {
                  this.company.isAddedToWatchList = true;
                }
              });
            }
          );
        },
        error => {
          // console.log('getCompanyByTickerSymbol ERROR: ' + error);
        }
      );
  }

  addItemToWatchList() {
    const company = this.company;
    // console.log('stockName: ' + company.companyName + ', ticker: ' + company.symbol);
    company.isAddedToWatchList = true;
    const watchListItem = {
      id: null,
      company,
      username: this.username,
      percentChange: ((company.currentPrice - company.previousPrice) / company.previousPrice * 100 ),
      tickerSymbol: company.symbol
    };

    watchListItem.company.researchReports = null;

    if (!this.watchListService.watchList.find((watcher) => watcher.company === company)) {
      this.watchListService.addItemToWatchList(watchListItem)
        .subscribe(
          result => {
            this.company.isAddedToWatchList = true;
          }
        );
    }
  }

  removeItemFromWatchList() {
    const stockSymbol = this.company.symbol;
    this.watchListService.removeItemFromWatchList(stockSymbol).subscribe();
    this.company.isAddedToWatchList = false;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tickerSymbol = params['ticker'];

      this.getCompanyByTickerSymbol(this.tickerSymbol);
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.navEndSub.unsubscribe();
  }


}
