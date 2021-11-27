import { Component, OnInit } from '@angular/core';
import { RoadShowService, CompanyService } from '@api';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, TabItem } from '@models';
import { Location } from '@angular/common';
import {OrderPipe} from 'ngx-order-pipe';

@Component({
  selector: 'rom-upcoming-roadshows',
  templateUrl: './upcoming-roadshows.component.html',
  styleUrls: ['./upcoming-roadshows.component.scss']
})
export class UpcomingRoadshowsComponent implements OnInit {
  items: TabItem[];
  company: Company;
  companyId: any;
  // upcomingRoadshows: any[] = [];


  constructor(
    private roadShowService: RoadShowService,
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private orderPipe: OrderPipe
  ) {
    this.activeRoute.params.subscribe(
      params => {
        console.log(params);
        this.companyId = params.ticker;
        // this.getUpcomingRoadShows(params.ticker);
        this.getUpcomingRoadShows(params.companyId);
      }
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  getCompany(companyName): void {
    this.companyService.getCompanyById(companyName).subscribe(
      company => {
        this.company = company['company'];
      }
    );
  }

  // new method for upcoming roadshows retrieves the list from server.
  // Server sends the final list of roadshows where schedule date is after today.
  getUpcomingRoadShows(companyId) {
    this.roadShowService.getUpcomingRoadShowsByCompany(companyId).subscribe(
      res => {
        console.log(res);
        const upcomingRoadShows = res['Roadshow'];
        const sortedUpcomingRoadshows = this.orderPipe.transform(upcomingRoadShows, 'date');
        const companyName = res['Roadshow'][0].companyName;
        this.items = [
          {
            id: 'upcoming',
            contentId: 'upcoming-tab',
            name: companyName,
            selected: true,
            content: sortedUpcomingRoadshows
          }
        ];
      }
    );
  }

  getUpcomingRoadShowsOLD(companyId): void {
    this.roadShowService.getRoadShowsByCompany(companyId).subscribe(
      res => {
        console.log(res);
        const upcomingRoadShows: any = [];
        const currentRoadShows: any = [];
        const pastRoadShows: any = [];
        const roadShows = res['Roadshow'];
        const todaysDate = new Date();
        const todayMs = todaysDate.getTime();
        const day = todaysDate.getDate();
        const month = todaysDate.getMonth();
        const year = todaysDate.getFullYear();

        roadShows.forEach((roadShow: any) => {
          const roadShowDate = new Date(roadShow.date);
          if (roadShowDate.getDate() === day && roadShowDate.getMonth() === month && roadShowDate.getFullYear() === year) {
            currentRoadShows.push(roadShow);
          } else {
            (roadShowDate.getTime() > todayMs ? upcomingRoadShows : pastRoadShows).push(roadShow);
            console.log('XXX=',roadShow.locationId);
          }
        });

        this.items = [
          {
            id: 'current',
            contentId: 'current-tab',
            name: 'current',
            selected: true,
            content: currentRoadShows
          },
          {
            id: 'upcoming',
            contentId: 'upcoming-tab',
            name: 'upcoming',
            selected: false,
            content: upcomingRoadShows
          },
          {
            id: 'past',
            contentId: 'past-tab',
            name: 'past',
            selected: false,
            content: pastRoadShows
          }
        ];
      }
    );
  }

  back() {
    this.location.back();
  }

}
