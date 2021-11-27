import { Component, OnInit, NgModule } from '@angular/core';
import { CompanyService } from '@api';
import { trigger, style, animate, transition } from '@angular/animations';

// import social buttons module
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@Component({
  selector: 'rom-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})


@NgModule({
  imports: [
      // add social buttons module to NgModule imports
      JwSocialButtonsModule
  ]
})


export class CompaniesComponent implements OnInit {
  numOfPages: number;
  currPageNum: number;
  linkCopied: Boolean = false;
  constructor(
    private companyService: CompanyService
  ) {
      // this.numOfPages = Math.ceil(this.companyService.getNumOfCompanies() / this.companyService.companiesPerPage);
      // this.currPageNum = 1;
  }

  ngOnInit() {
  }

  // goPrev() {
  //   if (this.companyService.companyOffset > 0) {
  //     this.companyService.getCompanies(-1).subscribe(() => this.currPageNum--);
  //   }
  // }
  //
  // goNext() {
  //   if ((this.companyService.companyOffset + this.companyService.companiesPerPage) < this.companyService.totalCompanies) {
  //     this.companyService.getCompanies(1).subscribe(() => this.currPageNum++);
  //   }
  // }
  //
  // onSubmit(pageNum: number) {
  //   this.companyService.companyOffset = (pageNum - 1) * this.companyService.companiesPerPage;
  //   this.companyService.getCompanies().subscribe(() => this.currPageNum = pageNum);
  // }

  copyLink(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    // selBox.setSelectionRange(0, selbox.value.length);
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.linkCopied = true;
    setTimeout(() => {
      this.linkCopied = false;
    }, 1500);
  }
}
