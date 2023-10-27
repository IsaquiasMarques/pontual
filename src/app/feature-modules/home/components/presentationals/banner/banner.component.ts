import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostsModel } from '@core/base-models/posts.model';

@Component({
  selector: 'pontual-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnChanges {

  @Input() bannerPosts: PostsModel[] = [];
  @Input() highlightedPosts: PostsModel[] = [];
  
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
