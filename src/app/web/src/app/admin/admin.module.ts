import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminRoadshowComponent } from './roadshow/admroadshow.component';
import { AddRoadshowComponent } from './roadshow/add-roadshow/add-roadshow.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditUserComponent } from './users/user/edit-user/edit-user.component';
import { UserListComponent } from './users/user/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ResearchReportComponent } from './research-report/research-report.component';
import { IndexComponent } from './index/index.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RoadshowListComponent } from './roadshow/roadshow-list/roadshow-list.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { AddRoadshowLocationComponent } from './locations/add-roadshow-location/add-roadshow-location.component';
import { LocationsComponent } from './locations/locations.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyComponent } from './company/company.component';
import { ResearchReportListComponent } from './research-report/research-report-list/research-report-list.component';
import { AddResearchReportComponent } from './research-report/add-research-report/add-research-report.component';
import { FieldErrorDisplayComponent } from './users/field-error-display/field-error-display.component';
import { EditRoadshowLocationComponent } from './locations/add-roadshow-location/edit-roadshow-location.component';
import { EditRoadshowComponent } from './roadshow/add-roadshow/edit-roadshow.component';
import { CompanySpecificComponent } from './company/company-specific/company-specific.component';
import { CompanyDetailsComponent } from './company/company-specific/company-details/company-details.component';
import { EditOtherInfoComponent } from './company/company-specific/edit-other-info/edit-other-info.component';
import { LoaderComponent } from './loader/loader.component';
import { HeadlineComponent } from './research-report/add-research-report/steps/headline/headline.component';
import { MainBodyComponent } from './research-report/add-research-report/steps/main-body/main-body.component';
import { ActionTabComponent } from './research-report/add-research-report/action-tab/action-tab.component';
import { EarningsPerShareComponent } from './research-report/add-research-report/steps/earnings-per-share/earnings-per-share.component';
import { CashFlowComponent } from './research-report/add-research-report/steps/cash-flow/cash-flow.component';
import { ValuationSummaryComponent } from './research-report/add-research-report/steps/valuation-summary/valuation-summary.component';
import { CompanyProfileComponent } from './research-report/add-research-report/steps/company-profile/company-profile.component';
import { ModelsComponent } from './research-report/add-research-report/steps/models/models.component';
import { CertificationComponent } from './research-report/add-research-report/steps/certification/certification.component';
import { PublicationComponent } from './research-report/add-research-report/steps/publication/publication.component';
import { PublicationMainComponent } from './research-report/add-research-report/steps/publication/publication-main/publication-main.component';
import { KeystatsComponent } from './research-report/add-research-report/steps/publication/keystats/keystats.component';
import { HistoricalPricesComponent } from './research-report/add-research-report/steps/publication/historical-prices/historical-prices.component';
import { RevenueComponent } from './research-report/add-research-report/steps/revenue/revenue.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { EmailTemplatesListComponent } from './email-templates/email-templates-list/email-templates-list.component';
import { AddEmailTemplateComponent } from './email-templates/add-email-template/add-email-template.component';
import { EditEmailTemplateComponent } from './email-templates/add-email-template/edit-email-template.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AdminComponent,
    SideMenuComponent,
    FavoritesComponent,
    AdminRoadshowComponent,
    AddRoadshowComponent,
    AddRoadshowLocationComponent,
    UsersComponent,
    UserComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    ResearchReportComponent,
    RoadshowListComponent,
    LocationListComponent,
    LocationsComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    CompanyComponent,
    ResearchReportListComponent,
    AddResearchReportComponent,
    FieldErrorDisplayComponent,
    EditRoadshowLocationComponent,
    EditRoadshowComponent,
    EditOtherInfoComponent,
    CompanySpecificComponent,
    LoaderComponent,
    IndexComponent,
    HeadlineComponent,
    MainBodyComponent,
    ActionTabComponent,
    EarningsPerShareComponent,
    CashFlowComponent,
    ValuationSummaryComponent,
    CompanyProfileComponent,
    ModelsComponent,
    CertificationComponent,
    PublicationComponent,
    PublicationMainComponent,
    KeystatsComponent,
    HistoricalPricesComponent,
    RevenueComponent,
    EmailTemplatesComponent,
    EmailTemplatesListComponent,
    AddEmailTemplateComponent,
    EditEmailTemplateComponent,
    NewsComponent,
    NewsListComponent,
    AddNewsComponent,
    EditNewsComponent,
    PreferencesComponent
  ],
  exports: [
    AdminComponent,
    SideMenuComponent,
    FavoritesComponent,
    AdminRoadshowComponent,
    AddRoadshowComponent,
    AddRoadshowLocationComponent,
    LocationListComponent,
    LocationsComponent,
    AdminRoutingModule
  ]
})

export class AdminModule { }
