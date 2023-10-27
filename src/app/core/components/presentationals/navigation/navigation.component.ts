import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { CategoriesModel } from '@core/base-models/categories.model';
import { CoreFacade } from '@core/facades/core.facade';
import { CATEGORY_CONTAINER_LABEL } from '@core/mock/Categories.mock';

import { Observable } from 'rxjs';

@Component({
  selector: 'pontual-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    public coreFacade: CoreFacade,
  ){}

  containerLabel: string = CATEGORY_CONTAINER_LABEL;

  ngOnInit(): void { }

  getHeaderCategories(): Observable<CategoriesModel[]>{
    return this.coreFacade.getHeaderCategories();
  }

}