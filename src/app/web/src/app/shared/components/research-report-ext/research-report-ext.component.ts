import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ResearchReportService, AggreementsService } from '@api';
import { ResearchReport } from '@models';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';
import { AgreementPopupComponent } from '../agreement-popup/agreement-popup.component';

@Component({
  selector: 'rom-research-report-ext',
  templateUrl: './research-report-ext.component.html',
  styleUrls: ['./research-report-ext.component.scss']
})
export class ResearchReportExtComponent implements OnInit, OnChanges {
  @Input() researchReports: ResearchReport[];
  @Input() ticker: string;
  @Input() id: any[];

  agreementPopupComponent: any;
  agreementPopupData: any;
  loggedId: number;

  constructor(  private router: Router,
                private aggreementsService: AggreementsService,
                private authService: AuthService ) {
    this.agreementPopupComponent = AgreementPopupComponent;
    this.loggedId = authService.loggedId;
  }

  ngOnInit() {
    this.id = this.id;
  }

  ngOnChanges(){
    this.id = this.id;
  }

  createAgreementData(id): any {
    return {
      agree: () => this.toggleAgreement('AGREE', id),
      disagree: () => this.toggleAgreement('DISAGREE', id)
    };
  }

  private toggleAgreement(value, id): void {
    if (value == 'AGREE') {
      this.aggreementsService.researchReportAggreement(id, this.loggedId).subscribe(
        data => {
          this.router.navigate(['company', this.ticker, 'research-report', id]);
        }
      );
    }
  }

  private gotoReport(reportId): void {
    this.router.navigate(['company', this.ticker, 'research-report', reportId]);
  }
}


