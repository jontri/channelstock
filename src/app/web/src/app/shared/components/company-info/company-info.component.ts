import * as $ from 'jquery';
import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Company, ResearchReport } from '@models';
import {
  RoadShowService, ChannelCastsService, ResearchReportService, AggreementsService, CompanyService, WatchListService, LoginService
} from '@api';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { AgreementPopupComponent } from '../agreement-popup/agreement-popup.component';
import { AuthService, UtilsService } from '@shared/services';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'rom-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('companyProfile') profileElem: ElementRef;
  @Input() company: Company;

  upcomingRoadShows: any = [];
  upcomingChannelCasts: any = [];
  researchReports: ResearchReport[];
  latestReport: ResearchReport;
  agreementPopupComponent: any;
  agreementPopupData: any;
  showAgreement = false;
  collapseHeight: number;
  expandHeight: number;
  loggedId: number;
  card;
  navEndSub;
  sub;
  username: any;
  tickerSymbol: string;
  showDialog: boolean;

  constructor(
    private roadShowService: RoadShowService,
    private channelCastsService: ChannelCastsService,
    private researchReportService: ResearchReportService,
    private router: Router,
    private aggreementsService: AggreementsService,
    private authService: AuthService,
    public utilsService: UtilsService,
    public companyService: CompanyService,
    public loginService: LoginService,
    private watchListService: WatchListService,
    private route: ActivatedRoute,

  ) {
    this.agreementPopupComponent = AgreementPopupComponent;
    this.agreementPopupData = {
      agree: () => this.toggleAgreement(false, 'AGREE'),
      disagree: () => this.toggleAgreement(false, 'DISAGREE')
    };
    this.username = sessionStorage.getItem('LOGGED_USER');
    this.loggedId = authService.loggedId;
    this.loginListener();
  }

  loginListener() {
    this.loginService.loginListener.subscribe(
      emitter => {
        this.ngOnInit();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.company.currentValue) {

      const company = changes.company.currentValue;

      // @todo - eventually we won't need this so remove code that are dependent on upcoming channel cast and roadshow
      if (company.companyInfoId) {
        this.getUpcomingRoadShows(company.companyInfoId);
        this.getUpcomingChannelCasts(company.companyInfoId);
      }

      if (company.id) {
        this.getLatestResearchReportForCompanyId(company.id);
        this.getAllReportsForCompanyId(company.id);
      }

      // run on next tick when text rendered
      setTimeout(() => {
        // get height of 8 lines
        this.collapseHeight = Number($(this.profileElem.nativeElement).css('line-height').replace('px', '')) * 8;
        this.expandHeight = this.profileElem.nativeElement.clientHeight;
      });

      // if (company.sector) {
      //   this.getRelatedCompanies(company.sector);
      // }

    }
  }

  getRelatedCompanies(sector: string): void {
    this.companyService.companiesBySector(sector);
    this.companyService.getCompanies().subscribe();
  }

  getLatestResearchReportForCompanyId(companyId: number) {
    this.researchReportService.getLatestReportForCompanyId(companyId)
      .subscribe(
        report => {
          this.latestReport = report['ResearchReport'];
        }
      );
  }

  getAllReportsForCompanyId(companyId: number) {
    this.researchReportService.getAllReportsForCompanyId(companyId)
      .subscribe(
        reports => {
          this.researchReports = reports['ResearchReport'];
        }
      );
  }

  // @todo deprecate this code - upcoming roadshows should be retrieved as part of the company
  getUpcomingRoadShows(companyId): void {
    this.upcomingRoadShows = [];
  }

  // @todo deprecate this code  - channel cast count is retrieved as part of company
  getUpcomingChannelCasts(companyInfoId): void {
    this.upcomingChannelCasts = [];
  }

  toggleAgreement(toggle, value) {
    this.showAgreement = toggle;
    if (value == 'AGREE') {

      this.aggreementsService.researchReportAggreement(this.latestReport.id, this.loggedId).subscribe(
        data => {
          this.router.navigate(['company', this.company.symbol, 'research-report', this.latestReport.id]);
        }
      );
    }
  }

  getCompanyRating(rating: number): string {
    return this.utilsService.getCompanyRating(rating);
  }

  openDialog(url) {

    window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700');

  }

  ngOnInit() {

    this.navEndSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // console.log("Scrolling into company view");
        const element = document.querySelector('#companyInfo');

        if (element) {
          // console.log("Scrolling into sub view");
          element.scrollIntoView(true);
        }
         window.scrollTo(0, 0);
      });

    this.sub = this.route.params.subscribe(params => {
      this.tickerSymbol = params['ticker'];

      this.getCompanyByTickerSymbol(this.tickerSymbol);
    });
  }

  ngAfterViewInit() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.navEndSub.unsubscribe();
    this.sub.unsubscribe();
  }

  getCompanyByTickerSymbol(ticker: string): void {
    this.companyService.getCompanyByTickerSymbol(ticker)
      .subscribe(
        company => {
          // console.log(company);
          this.company = company['company'];
          this.watchListService.getWatchList().subscribe(
            watchlist => {
              this.company.isAddedToWatchList = false;
              watchlist.forEach(element => {
                if (element.company.symbol === this.company.symbol) {
                  this.company.isAddedToWatchList = true;
                }
              });
              console.log('company name: ' + this.company.companyName + " Fav: " + this.company.isAddedToWatchList);

            }
          );
        },
        error => {
          // console.log('getCompanyByTickerSymbol ERROR: ' + error);
        }
      );
  }

  addItemToWatchList() {
    if (!this.loginService.isAuthenticated) {
      this.authService.toggleRegister();
      return;
    }

    const company = this.company;
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

  private gotoReport(): void {
    this.router.navigate(['company', this.company.symbol, 'research-report', this.latestReport.id]);
  }
}
