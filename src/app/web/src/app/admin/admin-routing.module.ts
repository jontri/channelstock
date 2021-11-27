import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './auth-guard/admin-guard.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminRoadshowComponent } from './roadshow/admroadshow.component';
import { AddRoadshowComponent } from './roadshow/add-roadshow/add-roadshow.component';
import { AddRoadshowLocationComponent } from './locations/add-roadshow-location/add-roadshow-location.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/user/edit-user/edit-user.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ResearchReportComponent } from './research-report/research-report.component';
import { RoadshowListComponent } from './roadshow/roadshow-list/roadshow-list.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { UserViewComponent } from '../home/user-management/user-view/user-view.component';
import { ProfileEditComponent } from '../home/user-management/profile-edit/profile-edit.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { ResearchReportListComponent } from './research-report/research-report-list/research-report-list.component';
import { AddResearchReportComponent } from './research-report/add-research-report/add-research-report.component';
import { EditRoadshowLocationComponent } from './locations/add-roadshow-location/edit-roadshow-location.component';
import { EditRoadshowComponent } from './roadshow/add-roadshow/edit-roadshow.component';
import { CompanySpecificComponent } from './company/company-specific/company-specific.component';
import { EditOtherInfoComponent } from './company/company-specific/edit-other-info/edit-other-info.component';
import { CompanyDetailsComponent } from './company/company-specific/company-details/company-details.component';
import { MainBodyComponent } from './research-report/add-research-report/steps/main-body/main-body.component';
import { HeadlineComponent } from './research-report/add-research-report/steps/headline/headline.component';
import { EarningsPerShareComponent } from './research-report/add-research-report/steps/earnings-per-share/earnings-per-share.component';
import { CashFlowComponent } from './research-report/add-research-report/steps/cash-flow/cash-flow.component';
import { ValuationSummaryComponent } from './research-report/add-research-report/steps/valuation-summary/valuation-summary.component';
import { ModelsComponent } from './research-report/add-research-report/steps/models/models.component';
import { CertificationComponent } from './research-report/add-research-report/steps/certification/certification.component';
import { PublicationComponent } from './research-report/add-research-report/steps/publication/publication.component';
import { KeystatsComponent } from './research-report/add-research-report/steps/publication/keystats/keystats.component';
import { HistoricalPricesComponent } from './research-report/add-research-report/steps/publication/historical-prices/historical-prices.component';
import { PublicationMainComponent } from './research-report/add-research-report/steps/publication/publication-main/publication-main.component';
import { RevenueComponent } from './research-report/add-research-report/steps/revenue/revenue.component';
import { CompanyProfileComponent } from './research-report/add-research-report/steps/company-profile/company-profile.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { EmailTemplatesListComponent } from './email-templates/email-templates-list/email-templates-list.component';
import { AddEmailTemplateComponent } from './email-templates/add-email-template/add-email-template.component';
import { EditEmailTemplateComponent } from './email-templates/add-email-template/edit-email-template.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { PreferencesComponent } from './preferences/preferences.component';

const addResearchReportRoutes: Routes = [
  { path: '', redirectTo: 'headline', pathMatch: 'full' },
  { path: 'headline', component: HeadlineComponent },
  { path: 'main-body', component: MainBodyComponent },
  { path: 'earnings-per-share', component: EarningsPerShareComponent },
  { path: 'cash-flow', component: CashFlowComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'valuation-summary', component: ValuationSummaryComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'certification', component: CertificationComponent },
  { path: 'publication', component: PublicationComponent, children: [
    { path: '', component: PublicationMainComponent },
    { path: 'keystats', component: KeystatsComponent },
    { path: 'historical-prices', component: HistoricalPricesComponent },
  ]}

];
const adminRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full', canActivate: [AdminGuardService] },
  { path: 'users', component: UsersComponent, canActivateChild: [AdminGuardService], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UserComponent, children: [
          { path: '', component: UserListComponent },
          { path: ':id', component: EditUserComponent },
        ]
      },
      { path: 'add', component: AddUserComponent }
    ]
  },
  { path: 'roadshows', component: AdminRoadshowComponent, canActivateChild: [AdminGuardService], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: RoadshowListComponent },
    { path: 'add', component: AddRoadshowComponent },
    { path: 'edit/:id', component: EditRoadshowComponent}
  ]},
  { path: 'locations', component: LocationsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: LocationListComponent },
    { path: 'add', component: AddRoadshowLocationComponent },
    { path: 'edit/:id', component: EditRoadshowLocationComponent }
  ]},
  { path: 'research-reports', component: ResearchReportComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ResearchReportListComponent },
    { path: 'add', component: AddResearchReportComponent, children: addResearchReportRoutes }
  ]},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'company', component: CompanyComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: CompanyListComponent },
    { path: ':id', component: CompanySpecificComponent, children: [
      { path: '', component: CompanyDetailsComponent },
      { path: 'other-info', component: EditOtherInfoComponent }
    ]}
  ]},
  { path: 'email-templates', component: EmailTemplatesComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EmailTemplatesListComponent },
    { path: 'add', component: AddEmailTemplateComponent },
    { path: 'edit/:id', component: EditEmailTemplateComponent }
  ]},
  { path: 'news', component: NewsComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: NewsListComponent },
    { path: 'add', component: AddNewsComponent },
    { path: 'edit/:id', component: EditNewsComponent }
  ]},
];

const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'favorites', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'profile-edit', component: ProfileEditComponent }

];
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuardService],
    children: adminRoutes
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivateChild: [AuthGuardService],
    children: dashboardRoutes
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }
