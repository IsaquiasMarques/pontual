import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel, CategoriesWithPostsModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { HOME_PAGE_INDEX_ID } from '@core/constants/pages';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HomeFacade{

    private categoriesWithPosts$: BehaviorSubject<CategoriesWithPostsModel[]> = new BehaviorSubject<CategoriesWithPostsModel[]>([]);
    private bannerPosts$: BehaviorSubject<PostsModel[]> = new BehaviorSubject<PostsModel[]>([]);
    private advertisements$: BehaviorSubject<AdsModel[]> = new BehaviorSubject<AdsModel[]>([]);
    private highlightedPosts$: BehaviorSubject<PostsModel[]> = new BehaviorSubject<PostsModel[]>([]);
    private recentPosts$: BehaviorSubject<PostsModel[]> = new BehaviorSubject<PostsModel[]>([]);

    constructor(private api: ApiService){

    }

    getBannerPosts(limit?: number): Observable<PostsModel[]>{

        if(this.bannerPosts$.getValue().length == 0)
            this.api.getBannerPosts(limit).subscribe({
                next: (posts: PostsModel[]) => {
                    this.bannerPosts$.next(posts);
                }
            });

        return this.bannerPosts$;

    }

    getAdvertisements(): Observable<any[]>{
        if(this.advertisements$.getValue().length == 0)
            this.api.advertisements().subscribe({
                next: (ads: any[]) => {
                    this.advertisements$.next(ads[HOME_PAGE_INDEX_ID]);
                }
            });

        return this.advertisements$;
    }

    getHighlightedPosts(limit?: number): Observable<PostsModel[]>{

        if(this.highlightedPosts$.getValue().length == 0)
            this.api.getHighlightedPosts(limit).subscribe({
                next: (posts: PostsModel[]) => {
                    this.highlightedPosts$.next(posts);
                }
            });

        return this.highlightedPosts$;

    }

    getRecentPosts(): Observable<PostsModel[]>{
        this.api.getRecentPosts().subscribe({
            next: (posts: PostsModel[]) => {
                this.recentPosts$.next(posts);
            }
        });
        
        return this.recentPosts$;
    }

    getCategoriesWithPosts(): Observable<CategoriesWithPostsModel[]>{
        if(this.categoriesWithPosts$.getValue().length == 0)
            this.api.categoriesWithPosts().subscribe({
                next: (categoriesWithPosts: CategoriesWithPostsModel[]) => {
                    this.categoriesWithPosts$.next(categoriesWithPosts);
                }
            });

        return this.categoriesWithPosts$;
    }
}