import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LogotypeComponent } from './components/logotype/logotype.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChipComponent } from './components/static/chip/chip.component';
import { PostCardComponent } from './components/post/card/card.component';
import { RouterModule } from '@angular/router';
import { AdsComponent } from './components/advertisement/ads/ads.component';
import { TurnUrlablePipe } from './pipes/image-lazy-loading/turn-urlable.pipe';

@NgModule({
  declarations: [
    LogotypeComponent,
    CarouselComponent,
    ChipComponent,
    PostCardComponent,
    AdsComponent,
    TurnUrlablePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  exports: [
    CommonModule,
    LogotypeComponent,
    CarouselComponent,
    ChipComponent,
    PostCardComponent,
    AdsComponent
  ]
})
export class SharedModule { }
