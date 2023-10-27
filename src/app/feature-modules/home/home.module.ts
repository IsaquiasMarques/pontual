import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/containers/home/home.component';
import { BannerComponent } from './components/presentationals/banner/banner.component';
import { SharedModule } from '@shared/shared.module';
import { RecentPostsComponent } from './components/presentationals/recent-posts/recent-posts.component';
import { CategorizedPostsSectionComponent } from './components/presentationals/categorized-posts-section/categorized-posts-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    RecentPostsComponent,
    CategorizedPostsSectionComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
