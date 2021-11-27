import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService, UserManagementService, ChannelCastsService, ResearchReportService } from '@api';
import { Company, UserAccount, ChannelCasts, ResearchReport } from '@models';
import { forkJoin } from '../../../../../../node_modules/rxjs';
// import { AgreementPopupComponent } from '@shared/components/agreement-popup/agreement-popup.component';

@Component({
  selector: 'rom-edit-other-info',
  templateUrl: './edit-other-info.component.html',
  styleUrls: ['./edit-other-info.component.scss', '../../../admin.component.scss']
})
export class EditOtherInfoComponent implements OnInit {
  company: any = {
    logoURL: '',
    roadshowLogoURL: '',
    participationLevel: '',
    analystId: '',
    associateAnalystId: '',
    presentationContent: ''
  };
  companyId: any;
  companyForm: FormGroup;
  logoURL = new FormControl();
  roadshowLogoURL = new FormControl();
  alternateProfile = new FormControl();
  participationLevel = new FormControl();
  analystId = new FormControl();
  associateAnalystId = new FormControl();
  presentation = new FormControl();
  presentationContent: any;
  noData: boolean;

  values: any;
  users: any = [];
  analysts: any = [];
  associateAnalysts: any = [];
  channelCasts: any = [];

  isLoading: Boolean = false;
  isViewChannelCast: Boolean = false;
  isAddChannelCast: Boolean = false;
  isEditChannelCast: Boolean = false;

  channelCastForm: FormGroup;
  subject = new FormControl();
  videoUrl = new FormControl();
  date = new FormControl();

  channelCastDetailsArray: ChannelCasts[];
  channelCast: ChannelCasts;
  researchReports: ResearchReport[];
  latestReport: ResearchReport;
  agreementPopupComponent: any;
  agreementPopupData: any;
  showAgreement = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private userManagementService: UserManagementService,
    private channelCastService: ChannelCastsService,
    private researchReportService: ResearchReportService
  ) {
    // this.agreementPopupComponent = AgreementPopupComponent;
    // this.agreementPopupData = {
    //   agree: () => this.toggleAgreement(false, 'AGREE'),
    //   disagree: () => this.toggleAgreement(false, 'DISAGREE')
    // };
  }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      this.companyId = params['id'];
      console.log('Company Detail Id: ' + this.companyId);
    });

    this.initForm();
    this.initChannelForm();
    this.getData(this.companyId);
    // this.getLatestResearchReportForCompanyId(this.companyId);
    // this.getAllReportsForCompanyId(this.companyId);
  }

  getData(companyId) {
    this.isLoading = true;
    console.log("Company ID: " + companyId);

    forkJoin(
      this.companyService.getCompanyById(companyId),
      this.userManagementService.getAnalystUserProfiles(),
      this.userManagementService.getAssociateAnalystUserProfiles()
    ).subscribe(data => {
      const [company,  analysts, associateAnalysts] = data;
      this.company = company['company'];
      this.analysts = analysts['userProfile'];
      this.associateAnalysts = associateAnalysts['userProfile'];
      this.isLoading = false;
      this.viewChannelCast();
    });
  }

  initForm() {
    this.companyForm = new FormGroup({
      'logoURL': this.logoURL,
      'roadshowLogoURL': this.roadshowLogoURL,
      'alternateProfile': this.alternateProfile,
      'participationLevel': this.participationLevel,
      'analystId': this.analystId,
      'associateAnalystId': this.associateAnalystId
    });
  }

  initChannelForm() {
    this.channelCastForm = new FormGroup({
        'subject': this.subject,
        'videoUrl': this.videoUrl,
        'date': this.date
    });
  }

  back() {
    this.router.navigate([`admin/company/${this.companyId}`]);
  }


  onSubmit() {

    this.values = {
      'logoURL': this.company.logoURL,
      'roadshowLogoURL': this.company.roadshowLogoURL,
      'alternateProfile': this.company.alternateProfile,
      'participationLevel': this.company.participationLevel,
      'analystId': this.company.analystId,
      'associateAnalystId': this.company.associateAnalystId,
      'companyInfoId':this.company.companyInfoId,
      'id':this.company.id,
      'presentationContent':this.presentationContent
    }

    this.companyService.updateCompany(this.values).subscribe(
      res => {
        console.log(res);
      }
    );

    console.log( "Participation Level " + this.participationLevel);
    console.log( "Company " + this.company.participationLevel);
    console.log( "Analyst " + this.company.analystId);
    console.log( "AssociateAnalyst " + this.company.associateAnalystId);

    this.companyForm.reset();
    setTimeout(() => { this.back(); }, 100);
  }


  viewChannelCast() {
    console.log('view channel cast');
    this.isViewChannelCast = true;
    this.isAddChannelCast = false;
    this.isEditChannelCast = false;
    console.log(this.company.companyInfoId);
   // this.channelCastService.getChannelCastByCompany(this.company.companyInfoId).subscribe(res => {
    this.channelCastService.getChannelCastByCompany(this.companyId).subscribe(res => {
      this.channelCasts = res['ChannelCast'];
      console.log(this.channelCasts);
    });
  }

  closeChannelCast() {
    console.log('close channel cast');
    this.isViewChannelCast = false;
    this.isAddChannelCast = false;
    this.isEditChannelCast = false;
  }

  toAddChannelCast() {
    console.log('add channel cast');
    this.isViewChannelCast = false;
    this.isAddChannelCast = true;
    this.isEditChannelCast = false;
  }

  submitChannelCast(channelCastValue: any) {
    console.log('submitting channel cast');
    channelCastValue.date = `${channelCastValue.date.month}/${channelCastValue.date.day}/${channelCastValue.date.year}`;
    channelCastValue.companyId = this.companyId;
    channelCastValue.companyInfoId = this.company.companyInfoId;
    console.log('form values', channelCastValue);

    this.channelCastService.saveChannelCast(channelCastValue).subscribe(
      res => {
        console.log(res);
      }
    );
    this.channelCastForm.reset();
    setTimeout(() => { this.viewChannelCast(); }, 1000);
  }

  updateChannelCast(channelCastValue: any) {
    console.log('updating channel cast : ' + channelCastValue.id);
    channelCastValue.date = `${channelCastValue.date.month}/${channelCastValue.date.day}/${channelCastValue.date.year}`;
    channelCastValue.companyId = this.companyId;
    channelCastValue.companyInfoId = this.company.companyInfoId;
    console.log('form values', channelCastValue);
    this.channelCastService.updateChannelCast(channelCastValue).subscribe(
      res => {
        console.log(res);
      }
    );
    this.channelCastForm.reset();
    setTimeout(() => { this.viewChannelCast(); }, 1000);
  }

  onChannelCastDelete(companyId) {
    console.log('channel cast delete : ' + companyId);
    this.channelCastService.deleteChannelCast(companyId).subscribe(
      res => {
        console.log(res);
      }
    );
    setTimeout(() => { this.viewChannelCast(); }, 100);
  }

  onChannelCastDetail(companyId) {
    console.log('channel cast detail : ' + companyId);
    this.isViewChannelCast = false;
    this.isAddChannelCast = false;
    this.isEditChannelCast = true;
    this.channelCastService.getChannelCastById2(companyId).subscribe(res => {
        this.channelCastDetailsArray = res['ChannelCast'];
        this.initChannelFormDetails();
    });
  }

  initChannelFormDetails() {
    this.channelCast = this.channelCastDetailsArray[0];
    var sched = new Date (this.channelCast.date);
    var year = sched.getFullYear();
    var month = sched.getMonth() + 1;
    var day = sched.getDate();
    console.log(sched);
    this.channelCastForm = this.formBuilder.group({
        'subject': this.channelCast.subject,
        'videoUrl': this.channelCast.videoUrl,
        'date': { year: year, month: month, day: day },
        'id'    : this.channelCast.id,
        'version' : this.channelCast.version,
        'dirty' : this.channelCast.dirty,
        'deleted' : this.channelCast.deleted,
        'lastModified' : this.channelCast.lastModified
    });
  }

  readPresentationUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.presentationContent = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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

  // toggleAgreement(toggle, value) {
  //   this.showAgreement = toggle;
  //   if (value == 'AGREE') {
  //     this.router.navigate(['company', this.company.ticker.symbol, 'research-report', this.latestReport.id]);
  //   }
  // }
}
