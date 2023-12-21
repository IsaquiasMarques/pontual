import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { PostsModel } from '@core/base-models/posts.model';
import { READING_PAGE_INDEX_ID } from '@core/constants/pages';

import { BehaviorSubject, Observable, map, pipe, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PostFacade implements OnInit{

    private advertisements$: BehaviorSubject<AdsModel[]> = new BehaviorSubject<AdsModel[]>([]);
    private recommendedPosts$: BehaviorSubject<PostsModel[]> = new BehaviorSubject<PostsModel[]>([]);

    constructor(
        private api: ApiService
    ) {}

    ngOnInit(): void {
        
    }

    getAdvertisements(): Observable<any[]>{
        if(this.advertisements$.getValue().length == 0)
            this.api.advertisements().subscribe({
                next: (ads: any[]) => {
                    this.advertisements$.next(ads[READING_PAGE_INDEX_ID]);
                }
            });

        return this.advertisements$;
    }

    getRelatedPosts(categoryId: number, excluded_id?: number): Observable<PostsModel[]>{
        return this.api.getPostsFromCategory(4, categoryId, excluded_id);
    }

    getRecommendedPosts(): Observable<PostsModel[]>{
        if(this.recommendedPosts$.getValue().length == 0)
            this.api.getRecentPosts(8).subscribe({
                next: (recommendedPosts: PostsModel[]) => {
                    this.recommendedPosts$.next(recommendedPosts);
                }
            });
        
        return this.recommendedPosts$;
    }

    getPostBySlug(slug: string): Observable<PostsModel>{
        return this.api.getPostBySlug(slug);
    }

}