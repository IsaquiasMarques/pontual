import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { CATEGORIES } from '@core/mock/Categories.mock';
import { HIGHLIGHTED_POSTS } from '@core/mock/Posts.mock';

import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesModel[]>
  {
    return of(CATEGORIES);
  }

  getHighlightedPosts(): Observable<PostsModel[]>{
    return of(HIGHLIGHTED_POSTS);
  }
  
}
