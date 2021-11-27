import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchReport } from '@models';
import { ResearchReportService } from '@api';
import { ConfirmationDialogService } from '@shared/services';

@Component({
  selector: 'rom-research-report-list',
  templateUrl: './research-report-list.component.html',
  styleUrls: ['./research-report-list.component.scss', '../../admin.component.scss']
})
export class ResearchReportListComponent implements OnInit {
  reports: ResearchReport[] = [];
  isLoading: Boolean = false;
  constructor(
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private researchReportService: ResearchReportService
  ) {
    this.getResearchReports();
  }

  ngOnInit() {
  }

  toAddReport() {
    this.router.navigate(['admin/research-reports/add']);
  }

  getResearchReports() {
    this.isLoading = true;
    // currently just getting research reports for company id : 1
    // needs to be updated to get ALL reports regardless of company
    this.researchReportService.getAllReports().subscribe(
      res => {
        console.log(res);
        this.reports = res['ResearchReport'];
        this.reports.forEach(element => {
          element.reportData = JSON.parse(element.reportData);
        });
        this.isLoading = false;
      }
    );
  }

  public openConfirmationDialog(id: any, title: string) {
    this.confirmationDialogService.confirm('Please confirm...', 'Do you really want to delete ' + title + ' ? ' + id)
      .then((confirmed) => {
        if(confirmed === true) {
          console.log('news delete : ' + id);

          this.researchReportService.deleteReport(id).subscribe(
            res => {
              console.log(res);
              this.getResearchReports();

            }
          );

        } else {
          console.log('cancel news delete : ' + id);
        }
      })
      .catch(() => console.log('User canceled the delete.'));
  }
}
