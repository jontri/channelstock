import {AfterViewInit, Component, OnInit} from '@angular/core';

import {RoadShow} from '@models';
import {AggreementsService, RoadShowService, LoginService} from '@api';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuxiliaryGuard} from '../auxiliary-guard/auxiliary.guard';
import {AuthService} from '@shared/services';
import {AggreementRoadshowPopupComponent} from '@shared/components';
import {OrderPipe} from 'ngx-order-pipe';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'rom-road-shows',
  templateUrl: './road-shows.component.html',
  styleUrls: ['./road-shows.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})

export class RoadShowsComponent implements OnInit, AfterViewInit {
  romTitle = 'Meet <span class="small-text">the</span> Management';
  roadShows: RoadShow[];
  pastRoadShows: RoadShow[];
  isExpanded: boolean;
  agreementRoadshowPopupComponent: any;
  agreementRoadshowPopupData: any;
  showAgreement = false;
  loggedId: number;
  order: string = 'date';
  reverse: boolean = false;
  sortedCollection: any[];
  sortedPastCollection: any[];
  isLoggedIn: boolean;

  constructor(private roadShowService: RoadShowService,
              private route: ActivatedRoute,
              private router: Router,
              public location: Location,
              public aux: AuxiliaryGuard,
              private aggreementsService: AggreementsService,
              private authService: AuthService,
              private orderPipe: OrderPipe,
              private loginService: LoginService) {
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);
    this.agreementRoadshowPopupComponent = AggreementRoadshowPopupComponent;
    this.loggedId = authService.loggedId;
    this.showRoadshowAggreement(this.loggedId);
    this.loginListener();
  }

  ngOnInit() {
    this.getRoadShows();
    this.isLoggedIn = this.loginService.isAuthenticated;
    // this.isLoggedIn = false; //ROME-851
  }

  ngAfterViewInit() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }

  getRoadShows(): void {
    this.roadShowService.getRoadShows()
      .subscribe(
        roadShows => {
          this.roadShows = roadShows['Roadshow'];
          this.sortedCollection = this.orderPipe.transform(this.roadShows, 'date');
          this.roadShows = this.sortedCollection;

          // split roadshows to upcoming and past.
          const upcomingRoadShows: any = [];
          const pastRoadShows: any = [];
          const todaysDate = new Date();
          const todayMs = todaysDate.getTime();

          this.roadShows.forEach((roadShow: any) => {
            const roadShowDate = new Date(roadShow.date);
            (roadShowDate.getTime() >= todayMs ? upcomingRoadShows : pastRoadShows).push(roadShow);
          });
          this.roadShows = upcomingRoadShows;
          this.pastRoadShows = pastRoadShows;
          // console.log('>> past: ', pastRoadShows);
          // console.log('>> upcoming: ', upcomingRoadShows);
        }
      );
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;

    this.sortedCollection = this.orderPipe.transform(this.roadShows, this.order, this.reverse);
    this.sortedPastCollection = this.orderPipe.transform(this.pastRoadShows, this.order, this.reverse);
    // console.log('sortedCollection reordered', this.sortedCollection);
    this.roadShows = this.sortedCollection;
    this.pastRoadShows = this.sortedPastCollection;


  }

  expand(toggle) {
    this.roadShowService.expandListener.next(toggle);
  }

  createAgreementData(id): any {
    return {
      agree: () => this.toggleAgreement('AGREE', id),
      disagree: () => this.toggleAgreement('DISAGREE', id)
    };
  }

  private toggleAgreement(value, id): void {
    if (value == 'AGREE') {
      this.aggreementsService.roadshowAgreement(this.loggedId).subscribe(
        data => {
          this.router.navigate(['roadshowdetail', id]);
          this.showRoadshowAggreement(this.loggedId);
        }
      );
    }
  }

  showRoadshowAggreement(id) {
    if(isNaN(id)){
      // console.log("Can't get Agreement for Roadshow because of NaN id.  ")
    } else {
      this.aggreementsService.didUserAgreeToRoadshows(id).subscribe(data => {
        // console.log(`didUserAgreeToRoadshows : ${data} >>>> ${id}`);

        if (data === 'false') {
          this.showAgreement = true;
        } else {
          this.showAgreement = false;
        }
      }, error => console.log(error));
    }
  }

  loginListener() {
    this.loginService.loginListener.subscribe(
      emitter => {
        this.ngOnInit();
      }
    );
  }
}
