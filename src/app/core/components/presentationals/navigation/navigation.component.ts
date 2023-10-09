import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from '@core/base-models/categories.model';
import { CoreFacade } from '@core/facades/core.facade';
import { CATEGORY_CONTAINER_LABEL } from '@core/mock/Categories.mock';

@Component({
  selector: 'pontual-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private coreFacade: CoreFacade){}

  containerLabel: string = CATEGORY_CONTAINER_LABEL;
  headerCategories: CategoriesModel[] = [];

  ngOnInit(): void {
    this.headerCategories = this.getHeaderCategories();
  }

  getHeaderCategories(): CategoriesModel[]{
    return this.coreFacade.getHeaderCategories();
  }

}