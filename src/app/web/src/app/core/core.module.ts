import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
// import { SliderComponent } from './slider/slider.component';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserManagementComponent } from '../home/user-management/user-management.component';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav/nav-menu/nav-menu.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    // SliderComponent
  ],
  declarations: [
    NavComponent,
    UserManagementComponent,
    FooterComponent,
    NavMenuComponent,
    // SliderComponent
  ],
  entryComponents: [
    NavMenuComponent
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
