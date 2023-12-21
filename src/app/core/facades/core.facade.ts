import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel } from '@core/base-models/categories.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CoreFacade{

    private headerCategories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);

    constructor(private api: ApiService){}

    getHeaderCategories(): Observable<CategoriesModel[]>{
        if(this.headerCategories$.getValue().length == 0)
            this.api.limitedCategories().subscribe({
                next: (categories: CategoriesModel[]) => {
                    this.headerCategories$.next(categories);
                }
            });

        return this.headerCategories$;
    }

    getAllCategories(): Observable<CategoriesModel[]>{
        return this.api.allCategories();
    }
    
}