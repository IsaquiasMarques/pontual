import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import { CategoriesModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { CoreFacade } from '@core/facades/core.facade';
import { CATEGORY_CONTAINER_LABEL } from '@core/mock/Categories.mock';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';

import { Observable, map } from 'rxjs';
import { PostsFacade } from 'src/app/feature-modules/posts/facades/posts.facade';

@Component({
  selector: 'pontual-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    public coreFacade: CoreFacade,
    public screenDimentions: ScreenDimentions,
    private router: Router,
    private postsFacade: PostsFacade
  ){}

  containerLabel: string = CATEGORY_CONTAINER_LABEL;
  showMenu: boolean = false;
  showCategoryContainerDropdow: boolean = false;
  ContainerDropdownHeightForMobile: number = 0;
  
  showDesktopSubmenu: boolean = false;
  mostRecentPosts: PostsModel[] = [];

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd){
        this.closeMenu();
        this.closeMenuDropdownDesktop();
      }
    });

    this.postsFacade.getAllPosts(2).subscribe((incomingData: PostsModel[]) => this.mostRecentPosts = incomingData);

  }

  getHeaderCategories(): Observable<CategoriesModel[]>{
    return this.coreFacade.getHeaderCategories();
  }

  navigateToDesktop(categoryLabel: string, categorySlug: string){
    if(categoryLabel == this.containerLabel){
      this.showDesktopSubmenu = !this.showDesktopSubmenu;
      return;
    }

    this.toggleDesktopSubmenu(categoryLabel);
    this.router.navigate(['/posts/' + categorySlug]);
  }

  navigateTo(categoryLabel: string, categorySlug: string){
    if(categoryLabel == this.containerLabel){
      this.showCategoryContainerDropdow = !this.showCategoryContainerDropdow;
      return;
    }

    this.toggleMobileMenu(categoryLabel);
    this.router.navigate(['/posts/' + categorySlug]);
  }

  toggleMobileMenu(category: string){
    if(category === this.containerLabel){
      return;
    }
    this.showMenu = !this.showMenu;
  }

  toggleDesktopSubmenu(category: string){
    if(category === this.containerLabel){
      return;
    }
    this.showDesktopSubmenu = true;
  }

  closeMenu(){
    this.showMenu = false;
  }
  closeMenuDropdownDesktop(){
    this.showDesktopSubmenu = false;
  }


}