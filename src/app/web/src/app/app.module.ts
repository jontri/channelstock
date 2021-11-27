import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtInterceptor } from './interceptors';
// import { GtagModule } from 'angular-gtag';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpModule,
    HttpClientModule,
    HomeModule,
    AdminModule,
    // DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    // GtagModule.forRoot({ trackingId: 'UA-48900086-27', trackPageviews: true })
  ],
  providers: [
  	{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
