import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import {
  OverlayModule,
  OverlayContainer,
  FullscreenOverlayContainer
} from '@angular/cdk/overlay';

import {
  BoxHeaderComponent,
  SearchBoxComponent,
  TabsComponent,
  ContextMenuComponent,
  DropdownMenuComponent,
  DropdownComponent,
  NobleBoxComponent,
  SwitchComponent,
  RatingComponent,
  IcoTxtBtnComponent,
  TickerInfoTableComponent,
  InitialTreeComponent,
  TextboxioComponent,
  CompanyLinksComponent,
  ResearchReportExtComponent,
  DisclaimersDisclosuresComponent,
  AgreementPopupComponent,
  ExpandComponent,
  CompanyInfoComponent,
  ExpandCollapseComponent,
  DisclosurePopupComponent,
  CompanyImgComponent,
  CompanyListComponent,
  PaginationComponent,
  SortComponent,
  BootstrapModalComponent,
  QmodComponent,
  ChangePasswordFormComponent,
  RegisterNowComponent,
  EntryInputsComponent,
  LoginInputsComponent,
  RegistrationInputsComponent
} from './components';

import {
  ContextMenuDirective,
  DisclaimersDisclosuresDirective
} from './directives';

import {
  RomAbsPipe,
  ObjKeysPipe,
  SanitizeUrlPipe,
  ShortNumPipe,
  ReplacePipe,
  RomMobileOrDesktopPipe
} from './pipes';

import {
  FbLikeComponent,
  GooglePlusComponent,
  TweetComponent,
  LinkedInShareComponent,
  YoutubeComponent,
  ShareComponent
 } from './social-media';

 import {
   ChannelCastBlockerComponent,
   MeetTheManagementBlockerComponent,
   MyFavoritesComponent
 } from './blocker-images';

import { PasswordValidationDirective } from './directives/validator/password-validation.directive';
import { AggreementRoadshowPopupComponent } from './components/aggreement-roadshow-popup/aggreement-roadshow-popup.component';
import { AgreementChannelcastPopupComponent } from './components/agreement-channelcast-popup/agreement-channelcast-popup.component';
import { RecentNewsComponent } from '../home/recent-news/recent-news.component';
import { AggreementCorporatePopupComponent } from './components/aggreement-corporate-popup/aggreement-corporate-popup.component';
import { AdvancedMarketDataModalComponent } from '@shared/components/advanced-market-data-modal/advanced-market-data-model.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WelcomeSliderComponent } from './components/welcome-slider/welcome-slider.component';
import {ResearchDisclosureComponent} from '@shared/components/research-disclosure/research-disclosure.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    RouterModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [
    BoxHeaderComponent,
    SearchBoxComponent,
    TabsComponent,
    ContextMenuDirective,
    ContextMenuComponent,
    DropdownMenuComponent,
    DropdownComponent,
    NobleBoxComponent,
    SwitchComponent,
    RatingComponent,
    IcoTxtBtnComponent,
    RomAbsPipe,
    TickerInfoTableComponent,
    ObjKeysPipe,
    InitialTreeComponent,
    TextboxioComponent,
    CompanyLinksComponent,
    SanitizeUrlPipe,
    ResearchReportExtComponent,
    ShortNumPipe,
    ReplacePipe,
    DisclaimersDisclosuresDirective,
    DisclaimersDisclosuresComponent,
    AgreementPopupComponent,
    ExpandComponent,
    AgreementPopupComponent,
    PasswordValidationDirective,
    CompanyInfoComponent,
    DisclosurePopupComponent,
    ExpandCollapseComponent,
    CompanyImgComponent,
    ExpandCollapseComponent,
    AggreementRoadshowPopupComponent,
    AgreementChannelcastPopupComponent,
    RecentNewsComponent,
    CompanyListComponent,
    AggreementCorporatePopupComponent,
    AdvancedMarketDataModalComponent,
    PaginationComponent,
    ConfirmationDialogComponent,
    WelcomeSliderComponent,
    SortComponent,
    ResearchDisclosureComponent,
    ChannelCastBlockerComponent,
    MeetTheManagementBlockerComponent,
    MyFavoritesComponent,
    FbLikeComponent,
    GooglePlusComponent,
    TweetComponent,
    LinkedInShareComponent,
    YoutubeComponent,
    ShareComponent,
    BootstrapModalComponent,
    QmodComponent,
    ChangePasswordFormComponent,
    RomMobileOrDesktopPipe,
    RegisterNowComponent,
    EntryInputsComponent,
    LoginInputsComponent,
    RegistrationInputsComponent
  ],
  exports: [
    BoxHeaderComponent,
    SearchBoxComponent,
    TabsComponent,
    ContextMenuDirective,
    DropdownMenuComponent,
    DropdownComponent,
    NobleBoxComponent,
    SwitchComponent,
    RatingComponent,
    IcoTxtBtnComponent,
    RomAbsPipe,
    TickerInfoTableComponent,
    ObjKeysPipe,
    InitialTreeComponent,
    TextboxioComponent,
    CompanyLinksComponent,
    SanitizeUrlPipe,
    ResearchReportExtComponent,
    ShortNumPipe,
    ReplacePipe,
    DisclaimersDisclosuresDirective,
    AgreementPopupComponent,
    ExpandComponent,
    CompanyInfoComponent,
    DisclosurePopupComponent,
    ExpandCollapseComponent,
    CompanyImgComponent,
    ExpandCollapseComponent,
    AggreementRoadshowPopupComponent,
    AgreementChannelcastPopupComponent,
    RecentNewsComponent,
    CompanyListComponent,
    AggreementCorporatePopupComponent,
    AdvancedMarketDataModalComponent,
    PaginationComponent,
    ConfirmationDialogComponent,
    WelcomeSliderComponent,
    SortComponent,
    ResearchDisclosureComponent,
    ChannelCastBlockerComponent,
    MeetTheManagementBlockerComponent,
    MyFavoritesComponent,
    FbLikeComponent,
    GooglePlusComponent,
    TweetComponent,
    LinkedInShareComponent,
    YoutubeComponent,
    ShareComponent,
    BootstrapModalComponent,
    QmodComponent,
    ChangePasswordFormComponent,
    RomMobileOrDesktopPipe,
    RegisterNowComponent,
    EntryInputsComponent,
    LoginInputsComponent,
    RegistrationInputsComponent
  ],
  entryComponents: [
    DropdownMenuComponent,
    DisclaimersDisclosuresComponent,
    AgreementPopupComponent,
    AggreementRoadshowPopupComponent,
    AgreementChannelcastPopupComponent,
    AggreementCorporatePopupComponent,
    AdvancedMarketDataModalComponent,
    ConfirmationDialogComponent,
    WelcomeSliderComponent
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ]
})

export class SharedModule { }
