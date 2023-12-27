import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { CategoriesModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { CoreFacade } from '@core/facades/core.facade';
import { CATEGORY_CONTAINER_LABEL } from '@core/mock/Categories.mock';

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
    private router: Router,
    private postsFacade: PostsFacade
  ){}

  containerLabel: string = CATEGORY_CONTAINER_LABEL;
  showMenu: boolean = false;
  showCategoryContainerDropdown: boolean = false;
  ContainerDropdownHeightForMobile: number = 0;
  
  showDesktopSubmenu: boolean = false;
  mostRecentPosts: PostsModel[] = [];

  searchInput: string = '';
  searchedPosts: PostsModel[] = [];

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
      this.showCategoryContainerDropdown = !this.showCategoryContainerDropdown;
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
      this.showDesktopSubmenu = true;
      return;
    }
  }

  closeMenu(){
    this.showMenu = false;
  }
  closeMenuDropdownDesktop(){
    this.showDesktopSubmenu = false;
  }

  searchPost(){
    if(this.searchInput.length != 0){
      this.coreFacade.searchPostsByTerm(this.searchInput).subscribe((incomingData: PostsModel[]) => this.searchedPosts = incomingData);
      return;
    }

    this.searchedPosts = [];

  }

}