import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { SEE_POSTS_PAGE_INDEX_ID } from '@core/constants/pages';
import { CoreFacade } from '@core/facades/core.facade';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PostsFacade{

    private advertisements$: BehaviorSubject<AdsModel[]> = new BehaviorSubject<AdsModel[]>([]);
    private allCategories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);
    private authors$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(
        private api: ApiService,
        private coreFacade: CoreFacade
    ) {
        // this.getAllCategories();
    }

    getAdvertisements(): Observable<any[]>{
        if(this.advertisements$.getValue().length == 0)
            this.api.advertisements().subscribe({
                next: (ads: any[]) => {
                    this.advertisements$.next(ads[SEE_POSTS_PAGE_INDEX_ID]);
                }
            });

        return this.advertisements$;
    }

    getAllCategories(): Observable<CategoriesModel[]>{
        if(this.allCategories$.getValue().length == 0)
            this.coreFacade.getAllCategories().subscribe({
                next: (categories: CategoriesModel[]) => {
                    this.allCategories$.next(categories);
                }
            });

        return this.allCategories$;
    }

    getAuthors(): Observable<string[]>{
        if(this.authors$.getValue().length == 0)
            this.api.getAuthors().subscribe({
                next: (authors: string[]) => {
                    this.authors$.next(authors);
                }
            });
        
        return this.authors$;
    }

    getCategoryBySlug(slug: string): Observable<CategoriesModel>{

        let pretendedCategory$: BehaviorSubject<any> = new BehaviorSubject<any>({});
        this.getAllCategories().subscribe({
            next: (categories: CategoriesModel[]) => {
                categories.forEach((category: any) => {
                    if(category.slug === slug){
                        pretendedCategory$.next(category);
                    }
                });
            }
        });
        return pretendedCategory$;
    }

    getAllPosts(limit?: number, categoryId?: number): Observable<PostsModel[]>{
        return this.api.getPostsFromCategory(limit, categoryId);
    }

    getPostByCategory(categoryId?: number): Observable<PostsModel[]>{
        return this.getAllPosts(100, categoryId);
    }

    filterPosts(searchTerm?: string, categoryId?: number, created_at?: string, acfAuthor?: string): Observable<PostsModel[]>{
        return this.api.filterPosts(searchTerm, categoryId, created_at, acfAuthor);
    }

}