import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  imports: [
    HomeModule,
    AdminModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
