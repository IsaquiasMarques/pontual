import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { PostsModel } from '@core/base-models/posts.model';

@Injectable({
    providedIn: 'root'
})

export class HomeFacade{

    constructor(private api: ApiService){}

    private highlightedPosts: PostsModel[] = [];

    getHighlightedPosts(limit: number = 3): PostsModel[]{

        this.api.getHighlightedPosts().subscribe({
            next: (posts: PostsModel[]) => {
                this.highlightedPosts = posts;
            }
        });
        return this.highlightedPosts;

    }
}