import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { AgmCoreModule } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';

import { HomeComponent } from './home.component';
import { CheckChannelsComponent } from './check-channels/check-channels.component';
import { CompaniesComponent } from './companies/companies.component';
import { RoadShowDetailComponent } from './road-show-detail/road-show-detail.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { RoadShowsComponent } from './road-shows/road-shows.component';
import { NewsComponent } from './news/news.component';
import { MoversComponent } from './movers/movers.component';
import { IndexComponent } from './index/index.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterConfirmComponent } from './registration/register-confirm/register-confirm.component';
import { NobleComponent } from './noble/noble.component';
import { NobleConComponent } from './noble-con/noble-con.component';
import { RegistrationComponent } from './registration/registration.component';
import { SetupPasswordComponent } from './registration/setup-password/setup-password.component';
import { ThankYouComponent } from './registration/thank-you/thank-you.component';
import { CompanyComponent } from './company/company.component';
import { ResearchReportComponent } from './research-report/research-report.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { EntryComponent } from './entry/entry.component';
import { FeedbackComponent } from './road-show-detail/modals/feedback/feedback.component';
import { ReservationComponent } from './road-show-detail/modals/reservation/reservation.component';
import { ExpandedWatchListComponent } from './watch-list-expanded/expanded-watch-list.component';
import { ChannelCastDetailComponent } from './channel-cast-detail/channel-cast-detail.component';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';
import { NobleConDetailComponent } from './noble-con/noble-con-detail/noble-con-detail.component';
import { FrameComponent } from './frame/frame.component';
import { NobleDetailComponent } from './noble/noble-detail/noble-detail.component';
import { UserViewComponent } from './user-management/user-view/user-view.component';
import { ProfileEditComponent } from './user-management/profile-edit/profile-edit.component';
import { FieldErrorDisplayComponent } from './user-management/field-error-display/field-error-display.component';
import { AboutComponent } from './about/about.component';
import { CollegeContestComponent } from './college-contest/college-contest.component';
import { AnalystsComponent } from './analysts/analysts.component';
import { RiskRewardComponent } from './risk-reward/risk-reward.component';
import { OfferingsComponent } from './offerings/offerings.component';
import { NewsChannelDetailComponent } from './news-channel-detail/news-channel-detail.component';
import { ChannelCastComponent } from './channel-cast/channel-cast.component';
import { ChannelCastExpandedComponent } from './channel-cast-expanded/channel-cast-expanded.component';
import { MoversExpandedComponent } from './movers-expanded/movers-expanded.component';
import { NewsExpandedComponent } from './news-expanded/news-expanded.component';
import { DropdownComponent } from '@shared/components';
import { WelcomeComponent } from './welcome/welcome.component';
import { UpcomingRoadshowsComponent } from './road-show-detail/upcoming-roadshows/upcoming-roadshows.component';
import { UpcomingChannelCastsComponent } from './channel-cast-detail/upcoming-channel-casts/upcoming-channel-casts.component';
import { AuxiliaryComponent } from './auxiliary/auxiliary.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { OrderModule } from 'ngx-order-pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TermsconditionsComponent } from './registration/termsconditions/termsconditions.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChangePasswordComponent } from './registration/change-password/change-password.component';
import { ChangeSuccessComponent } from './registration/change-success/change-success.component';
import { SharedHomeComponent } from './shared-home/shared-home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjMkUtpSIb2pLE13SQ9P2n5UvEJfzw83U'
    }),
    PdfViewerModule,
    NgbTooltipModule
  ],
  declarations: [
    CheckChannelsComponent,
    CompaniesComponent,
    HomeComponent,
    WatchListComponent,
    RoadShowsComponent,
    NewsComponent,
    MoversComponent,
    IndexComponent,
    RoadShowDetailComponent,
    LoginComponent,
    RegisterConfirmComponent,
    NobleComponent,
    NobleConComponent,
    NobleConDetailComponent,
    RegistrationComponent,
    SetupPasswordComponent,
    ThankYouComponent,
    CompanyComponent,
    ResearchReportComponent,
    ForgotPasswordComponent,
    ResearchReportComponent,
    EntryComponent,
    FeedbackComponent,
    ReservationComponent,
    ExpandedWatchListComponent,
    ChannelCastDetailComponent,
    SpeakerDetailComponent,
    FrameComponent,
    NobleDetailComponent,
    UserViewComponent,
    ProfileEditComponent,
    FieldErrorDisplayComponent,
    AboutComponent,
    CollegeContestComponent,
    AnalystsComponent,
    RiskRewardComponent,
    OfferingsComponent,
    NewsChannelDetailComponent,
    ChannelCastComponent,
    ChannelCastExpandedComponent,
    MoversExpandedComponent,
    NewsExpandedComponent,
    WelcomeComponent,
    UpcomingRoadshowsComponent,
    UpcomingChannelCastsComponent,
    AuxiliaryComponent,
    UnauthorizedComponent,
    SessionExpiredComponent,
    TermsconditionsComponent,
    HomepageComponent,
    ChangePasswordComponent,
    ChangeSuccessComponent,
    SharedHomeComponent,
    NotFoundComponent
  ],
  entryComponents: [
    DropdownComponent
  ],
  exports: [
    CheckChannelsComponent,
    RoadShowsComponent,
    NewsComponent,
    WatchListComponent,
    MoversComponent,
    IndexComponent,
    RoadShowDetailComponent,
    LoginComponent,
    RegisterConfirmComponent,
    RegistrationComponent,
    SetupPasswordComponent,
    ThankYouComponent,
    ChangePasswordComponent,
    ChangeSuccessComponent
  ],
  providers: [ CookieService ]
})

export class HomeModule { }
