import { NgModule } from '@angular/core';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './components/container/post/post.component';
import { SharedModule } from '@shared/shared.module';
import { NgOptimizedImage } from '@angular/common';


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
    NgOptimizedImage
  ]
})
export class PostModule { }
