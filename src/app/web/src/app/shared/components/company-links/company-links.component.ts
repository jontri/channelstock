import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AggreementsService, CorporateFilingsService, RoadShowService} from '@api';
import {Router} from '@angular/router';
import {AggreementCorporatePopupComponent} from '../aggreement-corporate-popup/aggreement-corporate-popup.component';
import {AuthService} from '@shared/services';

import {animate, style, transition, trigger} from '@angular/animations';
import {Company} from '@models';

@Component({
  selector: 'rom-company-links',
  templateUrl: './company-links.component.html',
  styleUrls: ['./company-links.component.scss'],
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
export class CompanyLinksComponent implements OnInit, OnChanges {
  @ViewChild('roadshowTrigger') roadshowTrigger: ElementRef;
  @ViewChild('channelcastTrigger') channelcastTrigger: ElementRef;
  @ViewChild('corporateFilingsTrigger') corporateFilingsTrigger: ElementRef;
  @ViewChild('pressReleasesTrigger') pressReleasesTrigger: ElementRef;
  @ViewChild('newsFeedTrigger') newsFeedTrigger: ElementRef;
  @ViewChild('newsStoryTrigger') newsStoryTrigger: ElementRef;
  @ViewChild('closePressReleasesModal') closePressReleasesModal: ElementRef;
  @ViewChild('closeNewsStoryModal') closeNewsStoryModal: ElementRef;
  @ViewChild('notAvailableTrigger') notAvailableTrigger: ElementRef;
  @ViewChild('noReportTrigger') noReportTrigger: ElementRef;
  @ViewChild('researchAnalystTrigger') researchAnalystTrigger: ElementRef;

  @Input() companyId: any;
  @Input() upcomingRoadShows: any[];
  @Input() upcomingChannelCasts: any[];
  @Input() company: Company;

  showAgreement = false;
  loggedId: number;
  agreementCorporatePopupComponent: any;
  agreementCorporatePopupData: any;
  showPdf: Boolean = false;
  showIndustryReport: Boolean = false;
  corporateFilings: any[];
  pressReleases: any[][];
  newsStory: any;
  headline: any;
  isFilingsOpen = false;
  isEventsOpen = false;
  isNewsOpen = false;

  analysts: any;

  constructor(private roadShowService: RoadShowService,
              private router: Router,
              private aggreementsService: AggreementsService,
              private authService: AuthService,
              private corporateFilingService: CorporateFilingsService) {
    this.loggedId = authService.loggedId;
    this.agreementCorporatePopupComponent = AggreementCorporatePopupComponent;
  }

  ngOnInit() {
    this.upcomingRoadShows = this.upcomingRoadShows || [];
    this.upcomingChannelCasts = this.upcomingChannelCasts || [];
    this.companyId = this.companyId;
    this.company = this.company;

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.company && changes.company.currentValue) {
      const company = changes.company.currentValue;
      // console.log('company symbol ngOnInit: ' + company.symbol);

      if (!changes.company.previousValue || company.symbol !== changes.company.previousValue.symbol) {

        this.companyId = this.companyId;
        this.company = this.company;

      }
    }
  }

  getData(analystId: string) {

  }

  getNewsStory(newsId: string, headline: string) {
    console.log("newsid: " + newsId);
    this.headline = "";
    this.newsStory = "";
    this.closePressReleasesModal.nativeElement.click();
    this.corporateFilingService.getNewsStory(newsId)
      .subscribe(
        data => {
          this.headline = headline;
          this.newsStory = data;
          //console.log("news story: " + this.newsStory);
        }
      );

  }

  togglePdf() {
    this.showPdf = !this.showPdf;
  }

  toggleIndustryReport() {
    this.showIndustryReport = !this.showIndustryReport;
  }

  showUpcomingRoadshows() {
    this.router.navigate([`company/${this.companyId}/upcoming-roadshows`]);
  }

  showUpcomingChannelCasts() {
    this.router.navigate([`company/${this.companyId}/upcoming-channelcasts`]);
  }

  showCorporateFilingsModal() {
    this.company = this.company;
    this.corporateFilingsTrigger.nativeElement.click();
    this.isFilingsOpen = true;
  }

  showPressReleasesModal() {
    this.company = this.company;
    this.pressReleasesTrigger.nativeElement.click();
    this.isEventsOpen = true;
  }

  showResearchAnalystModal() {
    this.researchAnalystTrigger.nativeElement.click();
    // this.getAnalyst(this.company.analystId);
  }

  showNewsStory() {
    this.newsStoryTrigger.nativeElement.click();
  }

  closeNewsStory() {
    this.closeNewsStoryModal.nativeElement.click();
    this.pressReleasesTrigger.nativeElement.click();
  }

  showNotAvailableModal() {
    this.notAvailableTrigger.nativeElement.click();
  }

  showNoReportModal() {
    this.noReportTrigger.nativeElement.click();
  }

  openPresentationDeck() {
    window.open('/docs/' + this.company.presentationFilename, '_blank');
  }

  showNewsFeedModal() {
    this.company = this.company;
    //this.router.navigate([`company/${this.companyId}/news-feed`]);
    this.newsFeedTrigger.nativeElement.click();
    this.isNewsOpen = true;
  }

  createAgreementData(id): any {
    return {
      agree: () => this.toggleAgreement('AGREE', id),
      disagree: () => this.toggleAgreement('DISAGREE', id)
    };
  }

  private toggleAgreement(value, id): void {
    if (value == 'AGREE') {
      if (id && this.loggedId) {
        this.aggreementsService.corporatePresentationAggreement(id, this.loggedId).subscribe(
          data => {
            // this.router.navigate(['roadshowdetail', id]);
            this.showAggreement(id);
            this.togglePdf();
          }
        );
      }
    }
  }

  showAggreement(id) {
    if (isNaN(id) || id == null) {
      // console.log("Can't get corporatepresentation agreement due to NAN id");
    } else {
      this.aggreementsService.didUserAgreeToCorporatePresentation(id, this.loggedId).subscribe(data => {
        // console.log(`didUserAgreeToCorporatePresentation 1: ${data} >>>> ${id}` + ' -- ' + id + ' -- ' + this.loggedId);

        if (data === 'false') {
          this.showAgreement = true;
        } else {
          this.showAgreement = false;
        }
      }, error => console.log(error));
    }
  }

  closeModal(){
    console.log("Closing modal");
    this.isFilingsOpen = false;
    this.isNewsOpen = false;
    this.isEventsOpen = false;
  }
}
