import { Component, OnInit } from '@angular/core';
import { CompanyService, ChannelCastsService } from '@api';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, ChannelCasts } from '@models';
import { Location } from '@angular/common';

@Component({
  selector: 'rom-upcoming-channel-casts',
  templateUrl: './upcoming-channel-casts.component.html',
  styleUrls: ['./upcoming-channel-casts.component.scss']
})
export class UpcomingChannelCastsComponent implements OnInit {
  upcomingChannelCasts: ChannelCasts[] = [];
  company: Company;
  companyId: any;

  constructor(
    private channelCastService: ChannelCastsService,
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activeRoute.params.subscribe(
      params => {
        console.log(params);
        //params.ticker is actually an id
        this.companyId = params.companyId;
        this.getUpcomingChannelCasts(params.companyId);
        this.getCompany(params.companyId);
      }
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  getCompany(id): void {
    this.companyService.getCompanyById(id).subscribe(
      company => {
        this.company = company['company'];
      }
    );
  }

  getUpcomingChannelCasts(companyId): void {
    this.channelCastService.getChannelCastByCompany(companyId).subscribe(
      res => {
        // console.log(res);
        this.upcomingChannelCasts = res['ChannelCast'];
      }
    );
  }

  back() {
    this.location.back();
  }

}
