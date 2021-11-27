import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { CompanyService } from '../../../api/company/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmailTemplatesService } from '../../../api/email-templates/email-templates.service';
import { EmailTemplateDetails } from '@models';

@Component({
  selector: 'rom-edit-email-template',
  templateUrl: './edit-email-template.component.html',
  styleUrls: ['./add-email-template.component.scss']
})
export class EditEmailTemplateComponent implements OnInit {
  companies: any[];
  isLoading: Boolean = false;
  templateForm: FormGroup;
  template: EmailTemplateDetails;
  constructor(
    private companyService: CompanyService,
    private emailTemplateService: EmailTemplatesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location) {
      activeRoute.params.subscribe(
        params => {
            this.getEmailTemplate(params.id);
            this.template.id = params.id;
            // this.getCompanies();
        }
      );
    }

  ngOnInit() {
  }

  getEmailTemplate(id) {
    this.isLoading = true;
    this.emailTemplateService.getEmailTemplatebyId(id).subscribe(
      res => {
        console.log(res);
        this.template = res['EmailTemplate'];
        this.isLoading = false;
      }
    );
  }

  // getCompanies() {
  //   this.companyService.getCompanies().subscribe(
  //     companies => {
  //       console.log(companies);
  //       this.companies =  companies['company'];
  //     }
  //   );
  // }

  onSubmit(form: NgForm) {
    const data: any = {
      id: this.template.id,
      templateName: form.value.templateName,
      emailSubject: form.value.emailSubject,
      emailBody: this.template.emailBody
    };

    console.log(data);
    this.emailTemplateService.editEmailTemplate(data).subscribe(
      res => {
        console.log(res);
      }
    );
    this.isLoading = false;
    this.back();
  }

  back() {
    this.location.back();
  }

}
