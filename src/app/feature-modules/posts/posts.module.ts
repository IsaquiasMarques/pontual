import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/container/posts.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    SharedModule,
    PostsRoutingModule,
    FormsModule
  ]
})
export class PostsModule { }
