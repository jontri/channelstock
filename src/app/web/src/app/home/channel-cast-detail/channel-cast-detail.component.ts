import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChannelCastsService, CompanyService } from '@api';
import { ActivatedRoute, Params } from '@angular/router';
import { ChannelCasts, Company } from '@models';
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'rom-channel-cast-detail',
  templateUrl: './channel-cast-detail.component.html',
  styleUrls: ['./channel-cast-detail.component.scss']
})
export class ChannelCastDetailComponent implements OnInit {
  @ViewChild('boxHeaderBody') boxHeaderBody: ElementRef;

  isExpanded: boolean;
  channelCast: ChannelCasts;
  company: Company;

  constructor(
    private channelCastsService: ChannelCastsService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params: Params) => {
      channelCastsService.getChannelCastById(params.id).pipe(
        map(this.getChannelCast.bind(this)),
        map(this.getCompany.bind(this))
      ).subscribe();
    });
  }

  ngOnInit() {
  }

  private getChannelCast(channelCast: ChannelCasts): ChannelCasts {
    $(this.boxHeaderBody.nativeElement).parent().animate({scrollTop: 0}, 500);
    return this.channelCast = channelCast['ChannelCast'];
  }

  private getCompany(channelCast: ChannelCasts): void {
    console.log('Company ID in channelcast : ' + channelCast.companyId);

    this.companyService.getCompanyById(channelCast.companyId).subscribe((data) => {
      this.company = data['company'];
    });
  }
}
