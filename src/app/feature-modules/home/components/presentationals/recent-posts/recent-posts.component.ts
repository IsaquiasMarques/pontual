import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostsModel } from '@core/base-models/posts.model';

@Component({
  selector: 'pontual-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit, OnChanges {

  @Input() recentPosts: PostsModel[] = [];

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
