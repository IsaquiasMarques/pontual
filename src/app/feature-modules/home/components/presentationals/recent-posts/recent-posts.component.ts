import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostsModel } from '@core/base-models/posts.model';
import { LIMIT_OF_RECENT_POSTS } from '@core/constants/limitations';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';
import { slideTo } from '@shared/helpers/functions/slider.func';

@Component({
  selector: 'pontual-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit, OnChanges {

  constructor(
    public screenDimentions: ScreenDimentions
  ) {}

  @Input() recentPosts: PostsModel[] = [];
  activeIndex: number = 0;
  numberOfPostsWithFullContent: number = (this.screenDimentions.getScreenType == 'mobile') ? 1 : 2;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  next(data: any[], parent: string, subparent?: string){
    
    if(this.activeIndex == data.length - this.numberOfPostsWithFullContent){
      return;
    }

    this.activeIndex++;
    slideTo(this.activeIndex, parent, subparent,);
  }

  prev(data: any[], parent: string, subparent?: string){
    if(this.activeIndex == 0){
      return;
    }
    
    this.activeIndex--;
    slideTo(this.activeIndex, parent, subparent);
  }

  // sectionPages(data: any[]){
  //   // console.log(data);
  //   let pagesNumber: number[] = [];

  //   if(data.length < this.numberOfPostsWithFullContent){
  //     pagesNumber = Array(1);

  //   }
  //   else if(data.length > this.numberOfPostsWithFullContent && data.length <= (this.numberOfPostsWithFullContent * 2)){
  //     pagesNumber = Array(2);
  //   }
  //   else if(data.length > (this.numberOfPostsWithFullContent * 2) && data.length <= (this.numberOfPostsWithFullContent * 3)){
  //     pagesNumber = Array(3);
  //   }
  //   else if(data.length > (this.numberOfPostsWithFullContent * 3) && data.length <= (this.numberOfPostsWithFullContent * 4)){
  //     pagesNumber = Array(4);
  //   }
  //   else if(data.length > (this.numberOfPostsWithFullContent * 4) && data.length <= (this.numberOfPostsWithFullContent * 5)){
  //     pagesNumber = Array(5);
  //   }
  //   else if(data.length > (this.numberOfPostsWithFullContent * 5) && data.length <= LIMIT_OF_RECENT_POSTS){
  //     pagesNumber = Array(6);
  //   }
  //   else{}

  //   return pagesNumber;
  // }

}
