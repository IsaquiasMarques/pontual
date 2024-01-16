import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HomeFacade } from '../../../facades/home.facade';
import { PostsModel } from '@core/base-models/posts.model';
import { AdsModel } from '@core/base-models/ads.model';
import { PageStructure } from '@core/base-models/page-structure.mode';
import { CategoriesWithPostsModel } from '@core/base-models/categories.model';
import { SPECIAL_CATEGORIES } from '@core/config/special-categories';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';

@Component({
  selector: 'pontual-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges{

  constructor(
    private homeFacade: HomeFacade,
  ){}

  bannerPosts: PostsModel[] = [];
  highlightedPosts: PostsModel[] = [];
  recentPosts: PostsModel[] = [];
  ads: AdsModel[] = [];
  categoriesWithPosts: CategoriesWithPostsModel[] = [];

  postsDisplaySectionStructure: PageStructure = {
    sections: []
  }
  activeIndexes: { [key: string]: number } = {}

  ngOnInit(): void {
    this.homeFacade.getBannerPosts().subscribe((posts: PostsModel[]) => this.bannerPosts = posts);
    this.homeFacade.getAdvertisements().subscribe((ads: AdsModel[]) => this.ads = ads);
    this.homeFacade.getHighlightedPosts().subscribe((posts: PostsModel[]) => this.highlightedPosts = posts);
    this.homeFacade.getRecentPosts().subscribe((posts: PostsModel[]) => this.recentPosts = posts);
    
    this.homeFacade.getCategoriesWithPosts().subscribe({
        next: (categoriesWithPostsReadyToUse: CategoriesWithPostsModel[]) => {
          let dataCollect: any[] = [];
          let specialCategories: any[] = [];

          categoriesWithPostsReadyToUse.forEach((categoryWithPosts: CategoriesWithPostsModel) => {
            if(!(SPECIAL_CATEGORIES.includes(categoryWithPosts.label))){
              dataCollect.push({
                  sectionTitle: categoryWithPosts.label,
                  sectionSlug: categoryWithPosts.label.toLocaleLowerCase(),
                  entries: categoryWithPosts.entries
              });
              this.activeIndexes[categoryWithPosts.label.toLocaleLowerCase()] = 0;
            }else{
              specialCategories.push({
                sectionTitle: categoryWithPosts.label,
                sectionSlug: categoryWithPosts.label.toLocaleLowerCase(),
                entries: categoryWithPosts.entries
            });
          }
          });
          this.fullfillPageStructureSections(dataCollect);
          this.fullfillPageStructureSections(specialCategories, true);

          // console.log(this.postsDisplaySectionStructure)

          if(this.ads){
            return;
            if(this.ads.length >= 2){
              this.addAdvertisementOnPageRow(3, {
                type: 'advertisement',
                  sectionTitle: '',
                  data: { imagePath: this.ads[2].imagePath, link: this.ads[2].link },
              });
            }
            if(this.ads.length >= 3){
              this.addAdvertisementOnPageRow(6, {
                type: 'advertisement',
                  sectionTitle: '',
                  data: { imagePath: this.ads[3].imagePath, link: this.ads[3].link },
              });
            }
          }

        }
    });
  }

  fullfillPageStructureSections(categories: any[], isSpecialCategory: boolean = false){
    categories.forEach((data: any) => {
      this.postsDisplaySectionStructure.sections.push({
        type: 'post',
        sectionTitle: data.sectionTitle,
        sectionSlug: data.sectionSlug,
        data: data.entries,
        postsWrap: isSpecialCategory
      });
    });
  }

  addAdvertisementOnPageRow(row: number, advertisement: any): void{
    this.postsDisplaySectionStructure.sections.splice(row - 1, 0, advertisement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
