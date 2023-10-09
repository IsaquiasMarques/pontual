import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { CategoriesModel } from '@core/base-models/categories.model';

@Injectable({
    providedIn: 'root'
})

export class CoreFacade{

    constructor(private api: ApiService){}

    private categories: CategoriesModel[] = [];

    getHeaderCategories(): CategoriesModel[]{

        this.api.getCategories().subscribe({
            next: (categories: CategoriesModel[]) => {
                categories.forEach((element: CategoriesModel) => {
                    if(element.hasPosts){
                        this.categories.push(element);
                    }
                });
            }
        });
        return this.categories;

    }
}