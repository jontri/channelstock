import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { CompanyService } from '../../../api/company/company.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmailTemplateDetails } from '@models';
import { EmailTemplatesService } from '../../../api/email-templates/email-templates.service';

@Component({
  selector: 'rom-add-email-template',
  templateUrl: './add-email-template.component.html',
  styleUrls: ['./add-email-template.component.scss']
})
export class AddEmailTemplateComponent implements OnInit {
  companies: any[];
  isLoading: Boolean = false;
  // templateForm: FormGroup;
  template: EmailTemplateDetails = {
    emailBody : '',
    emailSubject: '',
    templateName: '',
    id: 0
  };
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private emailTemplateService: EmailTemplatesService
  ) { }

  ngOnInit() {
    // this.getCompanies();
    // this.formInit();
    this.template.emailBody = '';
  }

  // formInit() {
  //   this.templateForm = this.formBuilder.group({
  //     // id: ['', Validators.compose([Validators.required])],
  //     templateName: ['', Validators.compose([Validators.required])],
  //     emailSubject: ['', Validators.compose([Validators.required])],
  //     emailBody: ['', Validators.compose([Validators.required])]
  //   });
  // }

  // getFieldValue(field) {
  //   return this.templateForm.controls[field].value;
  // }

  getCompanies() {
    this.isLoading = true;
    this.companyService.getCompanies().subscribe(
      companies => {
        console.log(companies);
        this.companies =  companies['company'];
        this.isLoading = false;
      }
    );
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const data: any = {
      templateName: form.value.templateName,
      emailSubject: form.value.emailSubject,
      emailBody: this.template.emailBody
    };

    console.log(data);
    this.emailTemplateService.addEmailTemplate(data).subscribe(
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
