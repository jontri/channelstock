import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChannelCastsService, AggreementsService, LoginService } from '@api';
import { ChannelCasts } from '@models';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';
import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';
import { AuthService } from '@shared/services';
import { AgreementChannelcastPopupComponent } from '@shared/components';
import {OrderPipe} from 'ngx-order-pipe';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'rom-channel-cast',
  templateUrl: './channel-cast.component.html',
  styleUrls: ['./channel-cast.component.scss'],
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
export class ChannelCastComponent implements OnInit, AfterViewInit  {

  channelCasts: any;
  isExpanded: boolean;
  agreementChannelcastPopupComponent: any;
  agreementChannelcastPopupData: any;
  showAgreement = false;
  loggedId: number;
  isLoggedIn: boolean;
  order = 'date';
  reverse = false;
  sortedCollection: any[];

  constructor(
    private channelCastsService: ChannelCastsService,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
    public aux: AuxiliaryGuard,
    private aggreementsService: AggreementsService,
    public authService: AuthService,
    private loginService: LoginService,
    private orderPipe: OrderPipe
  ) {
    this.listenForCastFilters();
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);

    this.agreementChannelcastPopupComponent = AgreementChannelcastPopupComponent;
    this.showChannelCastsAggreement(this.loggedId);
    this.loginListener();
  }

  ngOnInit() {
    this.getAllChannelCasts();
    //this.isLoggedIn = this.loginService.isAuthenticated;
    this.isLoggedIn = false; //ROME-851
  }

  ngAfterViewInit() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }

  getAllChannelCasts() {
    this.channelCastsService.getAllChannelCasts().subscribe(channelCasts => {
      this.channelCasts = channelCasts['ChannelCast'];

      this.channelCasts.sort((a: any, b: any) => {
        return new Date(b.date) > new Date(a.date) ? 1 : -1;
      });
      this.sortedCollection = this.orderPipe.transform(this.channelCasts, 'date');

    });
  }

  filterCasts(categoryId) {
    this.channelCastsService.getChannelCastById(categoryId).subscribe(
      channelCasts => {
        // this.channelCasts = channelCasts;XXX
        this.channelCasts = channelCasts['ChannelCast'];
      }
    );
  }

  listenForCastFilters() {
    this.channelCastsService.channelFilterListener.subscribe(
      categoryId => {
        // console.log('filter to: ', categoryId);
        this.filterCasts(categoryId);
      }
    );
  }

  toCast(castId) {
    this.router.navigate(['channelcast-detail', castId]);
  }

  expand(toggle) {
    this.channelCastsService.expandListener.next(toggle);
  }

  createAgreementData(id): any {
    return {
      agree: () => this.toggleAgreement('AGREE', id),
      disagree: () => this.toggleAgreement('DISAGREE', id)
    };
  }

  private toggleAgreement(value, id): void {

    if (value == 'AGREE') {
        this.aggreementsService.channelCastsAgreement(this.loggedId).subscribe(
          data => {
            this.router.navigate(['channelcast-detail', id]);
            this.showChannelCastsAggreement(this.loggedId);
          }
        );
    }
  }

  showChannelCastsAggreement(id) {
    if(isNaN(id)) {
      // console.log("Can't get channel cast agreement due to NAN id");
    } else {
      this.aggreementsService.didUserAgreeToChannelCasts(id).subscribe(data => {
        // console.log('didUserAgreeToChannelCasts : ' + data );

        if ( data === 'false') {
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    if (this.order === 'date') {
      if (this.reverse) {
      this.channelCasts.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else {
        this.channelCasts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    } else {
      this.sortedCollection = this.orderPipe.transform(this.channelCasts, this.order, this.reverse);
      // console.log('sortedCollection reordered', this.sortedCollection);
      this.channelCasts = this.sortedCollection;
    }
  }
}
