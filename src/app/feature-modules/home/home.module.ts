import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/containers/home/home.component';
import { BannerComponent } from './components/presentationals/banner/banner.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
