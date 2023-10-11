import { Component, OnInit } from '@angular/core';
import { HomeFacade } from '../../../facades/home.facade';
import { PostsModel } from '@core/base-models/posts.model';

@Component({
  selector: 'pontual-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeFacade: HomeFacade){}

  highlightedPosts: PostsModel[] = [];

  ngOnInit(): void {
    this.highlightedPosts = this.homeFacade.getHighlightedPosts();
  }
}
