import * as $ from 'jquery';
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { LoginService, WatchListService, RoadShowService, ChannelCastsService, MoversService, NewsService } from '@api';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { UtilsService, ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('home') homeElem: ElementRef;
  @ViewChild('welcomeTrigger') welcomeTrigger: ElementRef;
  scrolledDown: any = false;
  expanded: any = false;
  roadshowExpanded: any = false;
  channelCastsExpanded: any = false;
  moversExpanded: any = false;
  newsExpanded: any = false;
  isFirstLogin: Boolean = false;
  constructor(
    public loginService: LoginService,
    private watchListService: WatchListService,
    private roadShowService: RoadShowService,
    private channelCastsService: ChannelCastsService,
    private moversService: MoversService,
    private newsService: NewsService,
    private utilsService: UtilsService,
    public responsiveService: ResponsiveService
  ) {
    this.watchListService.expandListener.subscribe(
      res => {
        this.expanded = res;
        this.roadshowExpanded = false;
        this.channelCastsExpanded = false;
        this.moversExpanded = false;
        this.newsExpanded = false;
      }
    );

    this.roadShowService.expandListener.subscribe(
      res => {
        this.roadshowExpanded = res;
        this.expanded = false;
        this.channelCastsExpanded = false;
        this.moversExpanded = false;
        this.newsExpanded = false;
      }
    );

    this.channelCastsService.expandListener.subscribe(
      res => {
        this.channelCastsExpanded = res;
        this.expanded = false;
        this.roadshowExpanded = false;
        this.moversExpanded = false;
        this.newsExpanded = false;
      }
    );

    this.moversService.expandListener.subscribe(
      res => {
        this.moversExpanded = res;
        this.expanded = false;
        this.roadshowExpanded = false;
        this.channelCastsExpanded = false;
        this.newsExpanded = false;
      }
    );

    this.newsService.expandListener.subscribe(
      res => {
        this.newsExpanded = res;
        this.expanded = false;
        this.roadshowExpanded = false;
        this.channelCastsExpanded = false;
        this.moversExpanded = false;
      }
    );
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (number > 200) {
      this.scrolledDown = true;
    } else {
      this.scrolledDown = false;
    }
  }

  goToTop() {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  goToBottom() {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    // if (this.isFirstLogin) {
    //   this.welcomeTrigger.nativeElement.click();
    // }

    this.utilsService.navbar.subscribe((nav: ElementRef) => {
      const offsetVw = this.utilsService.pxToVw($(nav.nativeElement).outerHeight(true));
      const cssProp = this.responsiveService.isMobile ? 'padding-top' : 'margin-top';
      $(this.homeElem.nativeElement).css(cssProp, `${offsetVw}vw`);
    });
  }
}
