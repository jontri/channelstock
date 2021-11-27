import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailTemplatesService } from '../../../api/email-templates/email-templates.service';
import {EmailTemplateDetails } from '@models';

@Component({
  selector: 'rom-email-templates-list',
  templateUrl: './email-templates-list.component.html',
  styleUrls: ['./email-templates-list.component.scss', '../../admin.component.scss']
})
export class EmailTemplatesListComponent implements OnInit {
  emailTemplates: EmailTemplateDetails[];
  isLoading: Boolean = false;
  constructor(
    private router: Router,
    private emailTemplateService: EmailTemplatesService
  ) {
    this.getEmailTemplates();
  }

  ngOnInit() {
  }

  getEmailTemplates() {
    this.isLoading = true;
    this.emailTemplateService.getAllEmailTempates().subscribe(
      res => {
        this.isLoading = false;
        console.log(res);
        this.emailTemplates = res['EmailTemplate'];
      }
    );
  }

  toAddTemplate() {
    this.router.navigate([`admin/email-templates/add`]);
  }

  toEditTemplate(templateId) {
    this.router.navigate([`admin/email-templates/edit/${templateId}`]);
  }

  deleteTemplate(templateId) {
    const confirmation = confirm('Are you sure you want to delete this email template?');
    if (confirmation) {
      this.isLoading = true;
      // delete here
      this.emailTemplateService.deleteEmailTemplate(templateId).subscribe(
        res => {
          this.isLoading = false;
          console.log(res);
          this.getEmailTemplates();
        }, (error) => {
          console.log(error);
          this.isLoading = false;
          this.getEmailTemplates();
        }
      );
    }
  }

}
