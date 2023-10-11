import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogotypeComponent } from './components/logotype/logotype.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChipComponent } from './components/static/chip/chip.component';
import { PostCardComponent } from './components/post/card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LogotypeComponent,
    CarouselComponent,
    ChipComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    LogotypeComponent,
    CarouselComponent,
    ChipComponent,
    PostCardComponent
  ]
})
export class SharedModule { }
