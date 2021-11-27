import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';

import { EntryComponent } from './entry/entry.component';
import { HomeComponent } from './home.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterConfirmComponent } from './registration/register-confirm/register-confirm.component';

import { CompaniesComponent } from 'app/home/companies/companies.component';
import { RoadShowDetailComponent } from 'app/home/road-show-detail/road-show-detail.component';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { RedirectGuardService } from './redirect-guard/redirect-guard.service';
import { NobleComponent } from './noble/noble.component';
import { NobleDetailComponent } from './noble/noble-detail/noble-detail.component';
import { NobleConComponent } from './noble-con/noble-con.component';
import { NobleConDetailComponent } from './noble-con/noble-con-detail/noble-con-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { SetupPasswordComponent } from './registration/setup-password/setup-password.component';
import { ThankYouComponent } from './registration/thank-you/thank-you.component';

import { CompanyComponent } from './company/company.component';
import { ResearchReportComponent } from './research-report/research-report.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChannelCastDetailComponent } from './channel-cast-detail/channel-cast-detail.component';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';

import { AboutComponent } from './about/about.component';
import { CollegeContestComponent } from './college-contest/college-contest.component';
import { AnalystsComponent } from './analysts/analysts.component';
import { RiskRewardComponent } from './risk-reward/risk-reward.component';
import { OfferingsComponent } from './offerings/offerings.component';

import { FrameComponent } from './frame/frame.component';
import { NewsChannelDetailComponent } from './news-channel-detail/news-channel-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UpcomingRoadshowsComponent } from './road-show-detail/upcoming-roadshows/upcoming-roadshows.component';
import { UpcomingChannelCastsComponent } from './channel-cast-detail/upcoming-channel-casts/upcoming-channel-casts.component';

import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { AuxiliaryGuard } from './auxiliary-guard/auxiliary.guard';
import { ConditionsGuardService } from './conditions-guard/conditions-guard.service';


import { MoversComponent } from './movers/movers.component';
import { RoadShowsComponent } from './road-shows/road-shows.component';
import { ChannelCastComponent } from './channel-cast/channel-cast.component';
import { NewsComponent } from './news/news.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';
import { ExpandedWatchListComponent } from './watch-list-expanded/expanded-watch-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { CheckChannelsComponent } from './check-channels/check-channels.component';
import { TermsconditionsComponent } from './registration/termsconditions/termsconditions.component';

import { ChangePasswordComponent } from './registration/change-password/change-password.component';
import { ChangeSuccessComponent } from './registration/change-success/change-success.component';
import { SharedHomeComponent } from './shared-home/shared-home.component';
import { MobileGuardService } from './mobile-guard/mobile-guard.service';
import {NotFoundComponent} from "./not-found/not-found.component";

const footerData = {
  footer: {
    hideNotice: true
  }
};

const mobileData = {
  mobile: {
    isEnabled: true
  }
};

const expandedData = {
  isExpanded: true
};

const companyRoutes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'research-report/:id', component: ResearchReportComponent }
];

const nobleConRoutes: Routes = [
  { path: '', component: NobleConDetailComponent },
  { path: 'frame', component: FrameComponent }
];

const nobleRoutes: Routes = [
  { path: '', component: NobleDetailComponent },
  { path: 'frame', component: FrameComponent }
];

const auxRoutes: Routes = [
  { path: 'movers', outlet: 'expanded', component: MoversComponent, data: expandedData },
  { path: 'watch-list', outlet: 'expanded', component: ExpandedWatchListComponent, data: expandedData },
  { path: 'road-shows', outlet: 'expanded', component: RoadShowsComponent, data: expandedData },
  { path: 'channel-cast', outlet: 'expanded', component: ChannelCastComponent, data: expandedData },
  { path: 'news', outlet: 'expanded', component: NewsComponent, data: expandedData },
  { path: 'recent-news/:symbol', outlet: 'expanded', component: RecentNewsComponent, data: expandedData },
  { path: 'check-channels', outlet: 'expanded', component: CheckChannelsComponent, data: expandedData },
];

const homeRoutes: Routes = [
  {
    path: '',
    component: SharedHomeComponent,
    data: {...footerData, ...mobileData}
  },
  // {
  //   path: 'entry',
  //   component: EntryComponent,
  //   data: {...footerData, ...mobileData}
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {...footerData, ...mobileData}
  // },
  // {
  //   path: 'login/:username',
  //   component: LoginComponent,
  //   data: {...footerData, ...mobileData}
  // },
  {
    path: 'reset-password/:username/:token',
    component: LoginComponent,
    data: {...footerData, ...mobileData}
  },
  {
    path: 'session-expired',
    component: EntryComponent,
    canActivate: [RedirectGuardService],
    data: {...footerData, ...mobileData}
  },
  {
    path: 'invalid-token',
    component: EntryComponent,
    data: {...footerData, ...mobileData}
  },
  {
    path: 'register-confirm/:username/:token',
    component: RegisterConfirmComponent,
    data: footerData
  },
  // {
  //   path: 'registration',
  //   component: RegistrationComponent,
  //   data: {...footerData, ...mobileData}
  // },
  // {
  //   path: 'registration/:username',
  //   component: RegistrationComponent,
  //   data: {...footerData, ...mobileData}
  // },
  { path: 'setup-password/:username',
    component: SetupPasswordComponent,
    data: footerData
  },
  { path: 'setup-password/:username/:token',
    component: SetupPasswordComponent,
    data: footerData
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
    data: footerData
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: footerData
  },
  { path: 'about', component: AboutComponent, data: mobileData},
  { path: 'noble', component: NobleComponent, children: nobleRoutes, canActivateChild: [ConditionsGuardService], data: mobileData },
  { path: 'analysts', component: AnalystsComponent, canActivate: [ConditionsGuardService], data: mobileData },
  { path: 'risk-reward', component: RiskRewardComponent, canActivate: [ConditionsGuardService], data: mobileData },
  { path: 'noble-con', component: NobleConComponent, children: nobleConRoutes, canActivateChild: [ConditionsGuardService],
    data: mobileData },
  { path: 'college-contest', component: CollegeContestComponent, data: mobileData},
  { path: 'offerings', component: OfferingsComponent, data: mobileData},
  { path: 'unauthorized', component: UnauthorizedComponent, data: mobileData},
  { path: '404', component: NotFoundComponent, data: mobileData},
  {
    path: '',
    canActivateChild: [AuthGuardService, ConditionsGuardService],
    canDeactivate: [ConditionsGuardService],
    children: [
      { path: 'aux', component: AuxiliaryComponent, children: auxRoutes,
        canActivateChild: [AuxiliaryGuard], canDeactivate: [AuxiliaryGuard] },
      { path: 'companies', component: CompaniesComponent },
      { path: 'watch-list', component: WatchListComponent },
      { path: 'roadshowdetail/:id', component: RoadShowDetailComponent },
      { path: 'company/:ticker', children: companyRoutes },
      { path: 'channelcast-detail/:id', component: ChannelCastDetailComponent },
      { path: 'company/:companyId/upcoming-roadshows', component: UpcomingRoadshowsComponent },
      { path: 'company/:companyId/upcoming-channelcasts', component: UpcomingChannelCastsComponent },
      { path: 'speaker-detail/:id', component: SpeakerDetailComponent },
      { path: 'research-channel', component: NewsComponent, data: {...{newsItemType: 'Research', showDate: true}, ...mobileData} },
      { path: 'podcasts-channel', component: NewsComponent, data: {...{newsItemType: 'Podcast', showDate: true}, ...mobileData} },
      { path: 'videos-channel', component: NewsComponent, data: {...{newsItemType: 'Video', showDate: true}, ...mobileData} },
      { path: 'news-channel', component: NewsComponent, data: {...{newsItemType: 'News', showDate: true}, ...mobileData} },
      { path: 'news-channel/:id', component: NewsChannelDetailComponent, data: mobileData },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'terms-conditions', component: TermsconditionsComponent },
      { path: 'home', component: SharedHomeComponent, data: {...{showDate: true}, ...mobileData} },
    ]
  },
  {
    path: 'change-password/:username/:token',
    component: ChangePasswordComponent,
    data: {...footerData, ...mobileData}
  },
  {
    path: 'change-success',
    component: ChangeSuccessComponent,
    data: {...footerData, ...mobileData}
  }
];

const routes: Routes = [
  {
    path: '',
    canActivateChild: [MobileGuardService],
    component: HomeComponent,
    children: homeRoutes
  }
];

const routerOptions: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions)
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule { }
