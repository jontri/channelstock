import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, DoCheck } from '@angular/core';
import { MenuItem, Company } from '@models';
import { CompanyService, WatchListService, CheckChannelsService, LoginService } from '@api';
import {NavigationEnd, Router} from '@angular/router';
import { UtilsService } from '@shared/services';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
declare var $: any;

@Component({
  selector: 'rom-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnChanges, DoCheck {
  @Input() participationLevel: string;
  @ViewChild('marketDataTrigger') marketDataTrigger: ElementRef;

  private prevSortBy: string;

  username: string;
  menuItems: MenuItem[][];
  dropdownMenuComponent: any;
  company: Company;
  sortHash: any;
  numOfPages: number;
  currPageNum: number;
  navEndSub;
  topElement;
  public _size: number;

  constructor(
    public companyService: CompanyService,
    private watchListService: WatchListService,
    private checkChannelsService: CheckChannelsService,
    private router: Router,
    public utilsService: UtilsService,
    public loginService: LoginService
  ) {
    this.menuItems = [];
    this.dropdownMenuComponent = DropdownMenuComponent;
    this.username = sessionStorage.getItem('LOGGED_USER');
    this.sortHash = {
      COMPANYNAME: [true, true],
      SYMBOL: [false, false],
      CURRENTPRICE: [false, false],
      PREVIOUSPRICE: [false, false],
      MARKETCAP: [false, false],
      SHAREVOLUME: [false, false],
      YEARRANGE: [false, false]
    };
    this.prevSortBy = companyService.sortName = 'COMPANYNAME';
    companyService.sortOrder = 'ASC';

    this.numOfPages = Math.ceil(this.companyService.getNumOfCompanies() / this.companyService.companiesPerPage);
    if (this.companyService.companyOffset === 0) {
      this.currPageNum = 1;
    } else {
      this.currPageNum = JSON.parse(localStorage.getItem('currPage'));
    }
    this._size =  this.companyService.companiesPerPage;
  }

  ngOnChanges() {

    console.log('Company list on change ' + this.companyService.companyOffset);

    if (this.companyService.companyOffset === 0) {
      this.currPageNum = 1;
    }
  }

  ngDoCheck() {
    if (this.companyService.companyOffset === 0) {
      this.currPageNum = 1;
    }
  }

  ngOnInit() {
    console.log('On Init of Company List');
    this.companyService.filterEventEmitter.subscribe(this.buildMenuItems.bind(this));
    this.getCompanies();

    this.topElement = document.querySelector('#companyListHeader');

    if (this.topElement) {
      // console.log("Scrolling into sub view");
      this.topElement.scrollIntoView(true);
    }
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe();
  }

  addItemToWatchList(company: Company) {
    console.log('stockName: ' + company.companyName + ', ticker: ' + company.symbol + ' user: ' + this.username);
    company.isAddedToWatchList = true;
    const watchListItem = {
      id: null,
      company,
      username: this.username,
      percentChange: ((company.currentPrice - company.previousPrice) / company.previousPrice * 100 ),
      tickerSymbol: company.symbol
    };

    watchListItem.company.researchReports = null;

    if (!this.watchListService.watchList.find((watcher) => watcher.company.id === company.id)) {
      this.watchListService.addItemToWatchList(watchListItem)
        .subscribe(
          result => {
            console.log('Add Item to My Favorites.', result);
          }
        );
    }
  }

  removeItemFromWatchList(stockSymbol: string) {
    console.log('watch list removal stockName: ' + stockSymbol);
    this.watchListService.removeItemFromWatchList(stockSymbol).subscribe();
  }

  goToCompany(company, type, event: MouseEvent) {
    if (type === 1) {
      this.router.navigate(['company', company.symbol]);
    } else {
      this.company = company;
      this.marketDataTrigger.nativeElement.click();
      event.stopPropagation();
    }
  }

  private buildMenuItems(): void {
    this.menuItems = [];
    this.companyService.companies.forEach((company, index) => {
      this.menuItems[index] = [
        {
          label: 'Add to My Favorites',
          action: () => {
            this.addItemToWatchList(company);
          }
        },
        {
          label: 'Remove from My Favorites',
          action: () => {
            this.removeItemFromWatchList(company.symbol);
          }
        }
      ];

      // company.rating = Number((Math.random() * 4).toFixed(2));
    });
  }

  getCompanyRating(rating: number): string {
     return this.utilsService.getCompanyRating(rating);
  }

  sortCompanies(sortBy: string): void {
    if (this.prevSortBy === sortBy) {
      this.sortHash[sortBy][1] = !this.sortHash[sortBy][1];
    } else {
      this.sortHash[this.prevSortBy][0] = false;
      this.prevSortBy = sortBy;
      this.companyService.sortName = sortBy;
      this.sortHash[sortBy][0] = this.sortHash[sortBy][1] = true;
    }
    this.companyService.sortOrder = this.sortHash[sortBy][1] ? 'ASC' : 'DESC';
    this.companyService.getCompanies().subscribe();
    this.scrollToTop();
  }

  goPrev() {
    if (this.companyService.companyOffset > 0) {
      this.companyService.getCompanies(-1).subscribe(() => this.currPageNum--);
      this.scrollToTop();
    }
  }

  goNext() {
    if ((this.companyService.companyOffset + this.companyService.companiesPerPage) < this.companyService.totalCompanies) {
      this.companyService.getCompanies(1).subscribe(() => this.currPageNum++);
      this.scrollToTop();
    }
  }

  onSubmit(pageNum: number) {
    console.log('onSubmit Company List');
    localStorage.setItem('currPage', pageNum.toString());
    this.companyService.companyOffset = (pageNum - 1) * this.companyService.companiesPerPage;
    this.companyService.getCompanies().subscribe(() => this.currPageNum = pageNum);
  }

  scrollToTop() {

    $('.company-list').animate({
      scrollTop: (0)
    }, 100);

    window.scrollTo(0, 0);

  }

  onChange(perPage: any) {
    this._size =  Number(perPage.target.value);
    this.companyService.setcompaniesPerPage(this._size);
    this.companyService.companyOffset = 0;
    this.companyService.getCompanies().subscribe(() => this.currPageNum = 1);
  }

}
