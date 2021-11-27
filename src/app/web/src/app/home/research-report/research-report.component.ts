import {Component, ElementRef, OnInit, SimpleChanges, ViewChild, OnChanges} from '@angular/core';
import * as moment from 'moment';

import { ResearchReport, Company } from '@models';
import {ResearchReportService, CompanyService, AggreementsService, LoginService} from '@api';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { UtilsService, AuthService } from '@shared/services';
declare var $: any;
import { OverlayService } from '@shared/services';

@Component({
  selector: 'rom-research-report',
  templateUrl: './research-report.component.html',
  styleUrls: ['./research-report.component.scss']
})
export class ResearchReportComponent implements OnInit, OnChanges {
  researchReport: ResearchReport;
  company: Company;
  publishDate: string;
  reportData: any;
  disclosures: any;
  hidden: boolean;
  showDialog: boolean;
  models: any;
  showReport = false;
  showAgreement = true;


  @ViewChild('openModal') openModal: ElementRef;

  constructor(
    private researchReportService: ResearchReportService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    public utilsService: UtilsService,
    private router: Router,
    public overlayService: OverlayService,
    private aggreementsService: AggreementsService,
    private authService: AuthService,
    public loginService: LoginService
  ) {
    this.route.params.subscribe(
      params => {
        console.log('Research Report page: ' + params.id);

        this.companyService.getCompanyByTickerSymbol(params.ticker).subscribe(companyData => {

          this.getCompany(companyData);

          this.researchReportService.getResearchReportById(params.id).subscribe( reportData => {

            this.getResearchReport(reportData);

            console.log('Compare Company: ' + this.researchReport.companyId + ' == ' + this.company.id);

            if (this.researchReport.companyId !== this.company.id) {
              console.log('Invalid company and report ID combination ');
              this.router.navigate(['company', this.company.symbol]);
            }

          });

        });


      }
    );
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('On Change research report');


  }

  ngOnInit() {

    console.log('On Init research report');

    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        console.log('Route Navigation End Report', this.router.url);
        this.openModal.nativeElement.click();

        this.showAgreement = true;
        this.showReport = false;
      }
    });

    if (!this.loginService.isAuthenticated) {
      this.authService.toggleRegister();
    }
  }

  private getResearchReport(data) {
    console.log(data);

    this.researchReport = data['ResearchReport'];


    this.publishDate = moment(this.researchReport.publishedDate).format('MMMM D, YYYY');
    this.reportData = JSON.parse(this.researchReport.reportData);

    if (this.reportData.models) {
        this.models = [].concat(this.reportData.models.split('|'));
    }
  }

  private getCompany(data) {

    console.log(data);
    this.company = data['company'];
  }

  private parseBody(body: string): any {
    return body.split('\n').map((content: string) => {
      const sentences = content.split('.');
      return {
        bulletPoint: `${sentences.shift()}.`,
        body: sentences.join('.')
      };
    });
  }

  getCompanyRating(rating: number): string {
    return this.utilsService.getCompanyRating(rating);
  }

  toDisclosures() {
    $('.report-data-container').animate({
        scrollTop: (Number($('#disclosures').offset().top) - 325)
    }, 100);
  }

  toTopSection() {
    $('.report-data-container').animate({
      scrollTop: (0)
    }, 100);
    window.scrollTo(0, 0);

  }


  scrollToElement($element): void {
    $element.scrollIntoView(true);
  }


  openDialog(url) {
    window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700');
  }

  agree() {
    if(this.loginService.isAuthenticated){
      this.showAgreement = false;
      this.showReport = true;
    } else {
      this.authService.toggleRegister();
    }
  }

  disagree() {
    this.router.navigate(['company', this.company.symbol]);
  }
}
