import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AboutDataCenter } from '@core/services/data/datacenter.service';

@Injectable({
    providedIn: 'root'
})

export class CoreFacade{

    private headerCategories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);

    constructor(
        private api: ApiService,
        private aboutDataCenter: AboutDataCenter
    ){
        this.api.getAboutInfo().subscribe((incomingData: any) => {
            this.aboutDataCenter.weatherAppKey.next(incomingData.weather_app_id);
            this.aboutDataCenter.contacts.next(incomingData.contactos[0]);
            this.aboutDataCenter.team.next(incomingData.equipa);
            this.aboutDataCenter.editorialStatus.next(incomingData.estatuto_editorial);
            this.aboutDataCenter.socialMedia.next(incomingData.redes_sociais[0]);
        });
    }

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

    getGeolocationCoordinates(latitude: number, longitude: number): Observable<any>{
        return this.api.getGeolocationCoordinates(latitude, longitude);
    }

    searchPostsByTerm(term: string): Observable<PostsModel[]>{
        return this.api.filterPosts(term);
    }

    getAboutInfo(){
        return this.api.getAboutInfo();
    }
    
}