import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {WatchList, MenuItem, Company} from '@models';
import { WatchListService, LoginService } from '@api';
import { DropdownMenuComponent } from '@shared/components';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilsService } from '@shared/services';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'rom-expanded-watch-list',
  templateUrl: './expanded-watch-list.component.html',
  styleUrls: ['./expanded-watch-list.component.scss']
})

export class ExpandedWatchListComponent implements OnInit {
  @Input() participationLevel: string;
  @ViewChild('marketDataTrigger') marketDataTrigger: ElementRef;

  public list: WatchList[] = [];
  menuItems: MenuItem[][];
  dropdownMenuComponent: any;
  isLoading: Boolean;
  order = 'companyName';
  reverse = false;
  sortedCollection: any[];
  company: Company;

  constructor(
    public loginService: LoginService,
    public utilsService: UtilsService,
    private watchListService: WatchListService,
    private router: Router,
    private location: Location,
    private orderPipe: OrderPipe
  ) {
    this.menuItems = [];
    this.dropdownMenuComponent = DropdownMenuComponent;
    this.loginListener();
  }

  ngOnInit() {
    this.isLoading = true;
    this.watchListService.getWatchList()
      .subscribe(
        watchList => {
          console.log('watchList', watchList);
          this.list = watchList;
          this.sortedCollection = this.orderPipe.transform(this.list, 'company.currentPrice');
          console.log('sortedCollection', this.sortedCollection);
          setTimeout(() => {
            this.buildMenuItems();
            this.subscribeWatchListEvents();
          }, 100);
        }
      );
  }

  loginListener() {
    this.loginService.loginListener.subscribe(
      emitter => {
        this.ngOnInit();
      }
    );
  }

  removeItem(stockSymbol: string) {
    console.log('watch list removal stockName: ' + stockSymbol);
    this.watchListService.removeItemFromWatchList(stockSymbol).subscribe();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
      console.log("reverse order " + value + " " + this.reverse);
    }

    this.order = value;

    this.sortedCollection = this.orderPipe.transform(this.list, this.order, this.reverse);
    console.log('sortedCollection reordered', this.sortedCollection);
    this.list = this.sortedCollection;
    this.buildMenuItems();
    this.subscribeWatchListEvents();
  }

  private buildMenuItems(): void {
    this.list.forEach((watcher, index) => {
      this.menuItems[index] = this.generateMenuItem(watcher);
    });

    this.isLoading = false;
  }

  private subscribeWatchListEvents(): void {
    this.watchListService.addEventEmitter.subscribe((watcher: WatchList) => {
      this.menuItems.push(this.generateMenuItem(watcher));
    });

    this.watchListService.removeEventEmitter.subscribe((index: number) => {
      this.menuItems.splice(index, 1);
    });
  }

  private generateMenuItem(watcher: WatchList): MenuItem[] {
    return [
      {
        label: 'Remove from My Favorites',
        action: () => {
          this.removeItem(watcher.company.symbol);
        }
      }
    ];
  }

  expand(toggle) {
    this.watchListService.expandListener.next(toggle);
    this.location.back();
  }

  goToCompany(symbol: string) {
    this.router.navigate(['company', symbol]);
  }

  goToMarketData(company, type) {
    console.log(company);
    event.stopPropagation();
    if (type === 1) {
      this.router.navigate(['company', company.symbol]);
    } else {
      this.company = company;
      this.marketDataTrigger.nativeElement.click();
    }
  }

  getCompanyRating(rating: number):string {
    if( rating == 1) {
      return ("Underperform");
    } else if (rating == 2) {
      return ("Market Perform");
    } else if (rating == 3) {
      return ("Outperform");
    } else {
      return ("No Rating");
    }
  }
}
