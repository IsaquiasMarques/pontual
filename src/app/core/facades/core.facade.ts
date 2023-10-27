import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel } from '@core/base-models/categories.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CoreFacade{

    constructor(private api: ApiService){}

    getHeaderCategories(): Observable<CategoriesModel[]>{
        return this.api.categories();
    }
    
}