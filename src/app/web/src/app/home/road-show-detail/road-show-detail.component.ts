import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Company, RoadShow, ResearchReport, MenuItem, RoadShowLocation } from '@models';
import { CompanyService, RoadShowService, WatchListService, NewsService, ResearchReportService, ChannelCastsService, RoadShowLocationService, AggreementsService, LoginService } from '@api';
import { AuthService, UtilsService } from '@shared/services';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { AgreementPopupComponent, DropdownComponent } from '@shared/components';
declare var google: any;
declare var $: any;
@Component({
  selector: 'rom-road-show-detail',
  templateUrl: './road-show-detail.component.html',
  styleUrls: ['./road-show-detail.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class RoadShowDetailComponent implements OnInit, OnDestroy {
  @ViewChild('reservationTrigger') reservationTrigger: ElementRef;
  @ViewChild('addressTrigger') addressTrigger: ElementRef;
  @ViewChild('pdfModal') pdfModal: ElementRef;
  @ViewChild('pdfBody') pdfBody;

  private sub: any;
  id: number;
  roadShow: RoadShow;
  company: Company;
  companyTmp: Company;
  upcomingChannelCasts: any = [];
  upcomingRoadShows: any = [];
  showAgreement: Boolean = false;
  username: string;
  researchReports: ResearchReport[];
  latestReport: ResearchReport;
  agreementPopupComponent: any;
  agreementPopupData: any;
  roadshowLocation: RoadShowLocation;
  locationImageUrl: string;
  isImgReady:boolean;
  isShow: boolean;

  menuItems: MenuItem[];
  dropdownMenuComponent: any;
  showPdf: Boolean = false;

  // temporary vars
  lat: Number = 51.678418;
  lng: Number = 7.809007;

  loggedId: number;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private roadShowService: RoadShowService,
    private newsService: NewsService,
    private watchListService: WatchListService,
    private router: Router,
    private researchReportService: ResearchReportService,
    private channelCastsService: ChannelCastsService,
    private roadshowLocationService: RoadShowLocationService,
    private aggreementsService: AggreementsService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private loginService: LoginService
  ) {
    this.menuItems = [];
    this.dropdownMenuComponent = DropdownComponent;

    this.username = sessionStorage.getItem('LOGGED_USER');
    this.agreementPopupComponent = AgreementPopupComponent;
    this.agreementPopupData = {
      agree: () => this.toggleAgreement(false, 'AGREE'),
      disagree: () => this.toggleAgreement(false, 'DISAGREE')
    };

    this.loggedId = authService.loggedId;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.getRoadShow(this.id);
      this.isLoggedIn = this.loginService.isAuthenticated;
   });
  }

  togglePdf() {
    this.showPdf = !this.showPdf;
  }

  getRoadShow(id): void {
    this.roadShowService.getRoadShow(id)
      .subscribe(
          roadShow => {
            this.roadShow = roadShow['Roadshow'];
            //this.roadShow.menuLink = 'assets/docs/AvinoNobleCon14.pdf';
            console.log(this.roadShow);

            // this.getCoordinates();
            this.getUpcomingRoadShows(this.roadShow.issuerId);
            this.getUpcomingChannelCasts(this.roadShow.issuerId);
            this.getCompany(this.roadShow.issuerId);
            this.getRoadshowLocation(this.roadShow.locationId);
            this.getCoordinates();
          }
      );
  }

  getUpcomingRoadShows(companyId): void {
    this.roadShowService.getRoadShowsByCompany(companyId)
      .subscribe(
          res => {
              this.upcomingRoadShows = res['Roadshow'];
          }
      );
  }

  getUpcomingChannelCasts(companyId): void {
    this.channelCastsService.getChannelCastByCompany(companyId)
      .subscribe(
          res => {
              this.upcomingChannelCasts = res['ChannelCast'];
              //console.log('ChannelCasts: ' + this.upcomingChannelCasts);
          }
      );
  }

  getCompany(companyId): void {
    this.companyService.getCompanyById(companyId)
      .subscribe(
          company => {
              this.company = company['company'];
              console.log(this.menuItems);
              this.watchListService.getWatchList().subscribe(
                watchlist => {
                  watchlist.forEach(element => {
                    if (element.company.companyName === this.company.companyName) {
                      this.company.isAddedToWatchList = true;
                    }
                  });
                }
              );
              console.log(this.company);

              this.getLatestResearchReportForCompanyId(this.company.id);
              this.getAllReportsForCompanyId(this.company.id);
          }
      );
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

  getRoadshowLocation(id){
    this.roadshowLocationService.getRoadShowLocationById(id)
      .subscribe(
        result => {
          this.roadshowLocation = result['RoadshowLocation'];
          this.locationImageUrl = result['RoadshowLocation'].locationImageUrl;
        }
      );
  }

  addItemToWatchList() {
    const company = this.company;
    console.log('stockName: ' + company.companyName + ', ticker: ' + company.symbol);
    company.isAddedToWatchList = true;

    const watchListItem = {
      id: null,
      company: company,
      username: this.username,
      percentChange: ((company.currentPrice - company.previousPrice) / company.previousPrice * 100 )
    };

    watchListItem.company.researchReports = null;

    if (!this.watchListService.watchList.find((watcher) => watcher.company === company)) {
      this.watchListService.addItemToWatchList(watchListItem)
        .subscribe(
          result => {
            console.log('Add Item to My Favorites.', result);
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

  showReservationModal() {
    this.roadShowService.selectedRoadShow.next(this.roadShow);
    this.getRoadShow(this.id);
    this.reservationTrigger.nativeElement.click();

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

  toSpeakerDetail() {
    this.router.navigate(['speaker-detail', this.id]);
  }

  openMenu() {
    const roadshow: any = this.roadShow;
    // window.open('/docs/' + roadshow.menuLink, '_blank');
    this.pdfModal.nativeElement.click();
  }

  toCompany() {
    this.router.navigate([`company/${this.company.symbol}`]);
  }

  openAddressModal() {
    this.addressTrigger.nativeElement.click();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCoordinates() {
    const
      geocoder = new google.maps.Geocoder(),
      address = `${this.roadShow.address.address1} ${this.roadShow.address.cityOrLocality}
      ${this.roadShow.address.country} ${this.roadShow.address.postalCode}`;

    console.log(address);

    geocoder.geocode({ 'address': address }, (results, status) => {
      console.log(results);
      if (results.length != 0) {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
      }
    });
  }

  getCompanyRating(rating: number):string {
    return this.utilsService.getCompanyRating(rating);
  }
}
