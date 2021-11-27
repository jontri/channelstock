import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfile: any = '';
  constructor() { }

  ngOnInit() {
  }

  save() {
    
  }

}
