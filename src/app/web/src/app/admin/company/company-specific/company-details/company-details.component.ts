import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '@api';
import { Company } from '@models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'rom-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyId: number;
  company: Company;

  companyForm: FormGroup;
  name = new FormControl('', [ Validators.compose([Validators.required])]);
  profile = new FormControl('', [ Validators.compose([Validators.required])]);
  alternateProfile = new FormControl('', [ Validators.compose([Validators.required])]);
  exchange = new FormControl('', [ Validators.compose([Validators.required])]);
  naics = new FormControl('', [ Validators.compose([Validators.required])]);
  industry = new FormControl('', [ Validators.compose([Validators.required])]);
  sector = new FormControl('', [ Validators.compose([Validators.required])]);
  participationLvl = new FormControl('', [ Validators.compose([Validators.required])]);
  ticker = new FormControl('', [ Validators.compose([Validators.required])]);
  marketCap = new FormControl('', [ Validators.compose([Validators.required])]);
  currentPrice = new FormControl('', [ Validators.compose([Validators.required])]);
  previousPrice = new FormControl('', [ Validators.compose([Validators.required])]);
  email = new FormControl('', [ Validators.compose([Validators.required])]);
  address1 = new FormControl('', [ Validators.compose([Validators.required])]);
  address2 = new FormControl('', [ Validators.compose([Validators.required])]);
  cityOrLocality = new FormControl('', [ Validators.compose([Validators.required])]);
  postalCode = new FormControl('', [ Validators.compose([Validators.required])]);
  country =  new FormControl('', [ Validators.compose([Validators.required])]);
  website = new FormControl();
  percentChange: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      console.log('Company Detail Id: ' + this.companyId);
    });
   
    this.getCompany(this.companyId);
     this.initForm();
  }

  getCompany(companyId: number) {
    this.companyService.getCompanyById(companyId).subscribe(
      company => {
        this.company = company['company'];
        this.percentChange =
        ((this.company.currentPrice - this.company.previousPrice) / this.company.previousPrice * 100 );
      }
     
    );
  }

  initForm() {
    this.companyForm = new FormGroup({
      'name': this.name,
      'profile': this.profile,
      'alternateProfile': this.alternateProfile,
      'exchange': this.exchange,
      'naics': this.naics,
      'industry': this.industry,
      'sector': this.sector,
      'participationLvl': this.participationLvl,
      'ticker': this.ticker,
      'marketCap': this.marketCap,
      'currentPrice': this.currentPrice,
      'previousPrice': this.previousPrice,
      'email': this.email,
      'address1': this.address1,
      'address2': this.address2,
      'city': this.cityOrLocality,
      'zipCode': this.postalCode,
      'country': this.country,
      'website': this.website
    });
  }

  back() {
    this.router.navigate(['admin/company/list']);
  }

}
