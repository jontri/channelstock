import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';
import { CheckChannelsService, ChannelCastsService, CompanyService, LoginService, PreferencesService } from '@api';
import { Channel, UserProfile } from '@models';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'rom-check-channels',
  templateUrl: './check-channels.component.html',
  styleUrls: ['./check-channels.component.scss'],
  animations: [
    trigger('industryState', [
      state('opened', style({height: '*'})),
      state('closed', style({height: 0})),
      transition('opened => closed', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ]),
      transition('closed => opened', [
        style({height: 0}),
        animate(250, style({height: '*'}))
      ])
    ])
  ]
})

export class CheckChannelsComponent implements OnInit, AfterViewInit {
  card;
  private million = Math.pow(10, 6);
  romtTitle = 'Chek <span class="small-text">the</span> Channels';
  channels: Channel[];
  filteredSector: string;
  discoverFilters: any;
  isLoggedIn = false;
  widgetWidth: number;
  widgetHeight: number;
  isExpanded: boolean;

  userProfile: UserProfile[];

  constructor(
    public checkChannelsService: CheckChannelsService,
    private channelCastsService: ChannelCastsService,
    private companyService: CompanyService,
    private router: Router,
    private loginService: LoginService,
    private el: ElementRef,
    private route: ActivatedRoute,
    public aux: AuxiliaryGuard,
    private location: Location,
    private preferencesService: PreferencesService,
  ) {
    this.buildSectorsFilters();
    this.buildDiscoverFilters();
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);
    this.loginListener();

  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isAuthenticated;
    // console.log("LOGIN: " + this.loginService.isAuthenticated);

    this.widgetWidth = this.el.nativeElement.offsetWidth;
    this.widgetHeight = this.el.nativeElement.offsetHeight + 100;
    this.companyService.getAllCompanies().subscribe();

    let loggedUser = sessionStorage.getItem('LOGGED_USER');

    if(loggedUser){
      this.getUserProfile(loggedUser);
    }

    // console.log("USER: " + loggedUser);
  }

  getUserProfile(emailAddress: String): void  {
    this.preferencesService.getUserProfile(emailAddress)
    .subscribe(userProfile => {
      this.userProfile = userProfile['userProfile'];

      // console.log(this.userProfile);
    });

  }

  loginListener() {
    this.loginService.loginListener.subscribe(
      emitter => {
        this.ngOnInit();
      }
    );
  }
  ngAfterViewInit() {
    this.setAttribute();
  }

  setAttribute() {
    $('.card-body').attr("id", "card");
    this.card = $('.card-body')[0];
    // console.log(this.card);
  }

  filterCasts(categoryId) {
    this.channelCastsService.channelFilterListener.next(categoryId);
  }

  filterSector(sector: string): void {
    this.checkChannelsService.filteredCategory = this.checkChannelsService.filteredSubCategory = null;
    this.checkChannelsService.filteredSector = sector;
    if (sector === 'All') {
      this.companyService.companiesDefault();
    } else {
      this.companyService.companiesBySector(sector);
    }
    this.router.navigate(['companies']);
    this.companyService.getCompanies().subscribe();
    this.checkChannelsService.filteredIndustry = null;
  }

  filterIndustry(industry: string): void {
    this.checkChannelsService.filteredIndustry = industry;
    this.companyService.companiesByIndustry(industry);
    this.router.navigate(['companies']);
    this.companyService.getCompanies().subscribe();
    this.filteredSector = null;
    this.checkChannelsService.filteredSector = null;
  }

  toggleSector(sector: any, index): void {

    // console.log("Toggle Sector Filter : " + sector.sector + "  " + sector.isOpened );

    if (!sector.isOpened) {
      this.filterSector(sector.sector);
      // console.log(index);
      if (index >= 4 && index <= 6) {
        this.card.scrollBy({ top: 150, behavior: 'smooth'});
      } else if (index >= 7 && index <= 12) {
        this.card.scrollBy({ top: 300, behavior: 'smooth'});
      } else if (index >= 13 && index <= 18) {
        this.card.scrollBy({ top: 450, behavior: 'smooth'});
      }
    }
    if (sector.sector !== 'All') {
      sector.isOpened = !sector.isOpened;
    } else {
      this.filterSector(sector.sector);
      sector.isOpened = true;
    }
  }

  filterSubCategory(category: string, subCategory?: string): void {
    this.checkChannelsService.filteredSector = this.checkChannelsService.filteredIndustry = null;
    this.checkChannelsService.filteredCategory = category;
    this.checkChannelsService.filteredSubCategory = subCategory;
    this.router.navigate(['companies']);
  }

  toggleCategory(category: any, index): void {
    // console.log(category);
    if (category.name !== 'Discover Level Companies') {
      category.isOpened = !category.isOpened;
      setTimeout(() => {
        this.card.scrollBy({ top: 250, behavior: 'smooth'});
      }, 500);
    } else {
      this.filterSubCategory(category.name);
    }
    if (category.action) {
      category.action();
    }
  }

  private buildSectorsFilters(): void {
    this.companyService.getSectorsIndustries().subscribe((data) => {
      this.checkChannelsService.addSectorsIndustries(data['sectors']);
    });
  }

  private buildDiscoverFilters(): void {
    this.discoverFilters = [{
      name: 'Discover Level Companies',
      action: this.getCompanyFilter('companiesByParticipation', 'Discover')
    },
    {
      name: 'Market Cap',
      subCategories: [
        {name: '0 - 30M', action: this.getCompanyFilter('companiesByMarketCap', 0, 30 * this.million)},
        {name: '30M - 75M', action: this.getCompanyFilter('companiesByMarketCap', 30 * this.million, 75 * this.million)},
        {name: '75M - 150M', action: this.getCompanyFilter('companiesByMarketCap', 75 * this.million, 150 * this.million)},
        {name: '150M and up', action: this.getCompanyFilter('companiesByMarketCap', 150 * this.million, Math.pow(this.million, 2))}
      ]
    },
    {
      name: 'Exchange',
      subCategories: [
        {name: 'AMX', action: this.getCompanyFilter('companiesByExchange', 'AMX')},
        {name: 'NYSE', action: this.getCompanyFilter('companiesByExchange', 'NYSE')},
        {name: 'Nasdaq', action: this.getCompanyFilter('companiesByExchange', 'Nasdaq')},
        {name: 'AMERA', action: this.getCompanyFilter('companiesByExchange', 'AMERA')},
        {name: 'PINK', action: this.getCompanyFilter('companiesByExchange', 'PINK')}
      ]
    },
    {
      name: 'Financial Metrics',
      subCategories: [
        {name: 'Cash'},
        {name: 'Revenue'}
      ]
    }];
  }

  private getCompanyFilter(method: string, ...args: any[]) {
    return () => {
      this.companyService[method](...args);
      this.companyService.getCompanies().subscribe();
    };
  }
}
