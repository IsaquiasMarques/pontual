import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesModel } from '@core/base-models/categories.model';
import { CATEGORIES } from '@core/mock/Categories.mock';

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
  
}
