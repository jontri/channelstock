import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResearchReportService, CompanyService } from '@api';
import { Company } from '@models';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'rom-add-research-report',
  templateUrl: './add-research-report.component.html',
  styleUrls: ['./add-research-report.component.scss']
})
export class AddResearchReportComponent implements OnInit {
  researchReportForm: FormGroup;
  textboxioContents = {
    body: '',
    bulletpoints: ['']
  };

  private company: Company;

  constructor(
    private fb: FormBuilder,
    private researchReportService: ResearchReportService,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.researchReportForm = fb.group({
      reportTitle: '',
      priceValue: null,
      eps: null,
      rating: ''
    });

    companyService.getCompanyById(1).subscribe((company) => {
      this.company = company['company'];
    });

    router.events.subscribe((url: any) => {
      if (router.url.includes('/admin/research-reports/add/publication') &&
      router.url.indexOf('/admin/research-reports/add/publication') === 0 ||
      router.url.includes('/admin/research-reports/add/certification') &&
      router.url.indexOf('/admin/research-reports/add/certification') === 0) {
        window.scrollTo(0, 300);
      }
    });
  }

  ngOnInit() {
    console.log(this.researchReportForm);
  }

  removeBulletpoint(idx) {
    this.textboxioContents.bulletpoints.splice(idx, 1);
  }

  addBulletpoint() {
    this.textboxioContents.bulletpoints.push('');
  }

  save() {
    const textboxioValues = {body: this.textboxioContents.body};
    this.textboxioContents.bulletpoints.forEach((bulletpoint, idx) => {
      textboxioValues[`bulletPoint${idx + 1}`] = bulletpoint;
    });

    const payload = Object.assign({company: this.company}, this.researchReportForm.value, textboxioValues);
    this.researchReportService.addResearchReport(payload).subscribe((data) => {
      console.log(data);
    });
  }

  back() {
    this.router.navigate(['admin/research-reports/list']);
  }
}
