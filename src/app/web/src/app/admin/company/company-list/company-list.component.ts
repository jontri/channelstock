import { Component, OnInit } from '@angular/core';
import { Company } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '@api';

@Component({
  selector: 'rom-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  numOfPages: number;
  currPageNum: number;
  companies: Company[];
  isLoading: Boolean = false;

  constructor(
    private router: Router,
    public companyService: CompanyService
  ) {
    console.log('Companies Loaded');
    this.getCompanies();

  }

  ngOnInit() {

  }

  getCompanies() {
    this.isLoading = true;
    console.log(this.isLoading);

    this.companyService.companiesDefault();

    this.companyService.getCompanies()
      .subscribe(
          companies => {
            this.isLoading = false;

            this.numOfPages = Math.ceil(this.companyService.getNumOfCompanies() / this.companyService.companiesPerPage);
            this.currPageNum = 1;
          }
        );
  }

  onCompanyDetail(companyId: number) {
    this.router.navigate([`admin/company/${companyId}`]);
  }

  goPrev() {

    if (this.companyService.companyOffset > 0) {
      this.isLoading = true;
      this.companyService.getCompanies(-1).subscribe(() => {
        this.currPageNum--
        this.isLoading = false;
    });
    }
  }

  goNext() {
    if ((this.companyService.companyOffset + this.companyService.companiesPerPage) < this.companyService.totalCompanies) {
      this.isLoading = true;
      this.companyService.getCompanies(1).subscribe(() => {
        this.currPageNum++
        this.isLoading = false;
      });
    }
  }

  onSubmit(pageNum: number) {
    this.isLoading = true;
    this.companyService.companyOffset = (pageNum - 1) * this.companyService.companiesPerPage;
    this.companyService.getCompanies().subscribe(() => {
      this.currPageNum = pageNum;
      this.isLoading = false;
    });
  }

}
