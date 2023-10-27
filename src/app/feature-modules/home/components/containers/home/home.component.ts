import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HomeFacade } from '../../../facades/home.facade';
import { PostsModel } from '@core/base-models/posts.model';
import { AdsModel } from '@core/base-models/ads.model';
import { PageStructure } from '@core/base-models/page-structure.mode';
import { CategoriesWithPostsModel } from '@core/base-models/categories.model';

@Component({
  selector: 'pontual-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges{

  constructor(
    private homeFacade: HomeFacade
  ){}

  bannerPosts: PostsModel[] = [];
  highlightedPosts: PostsModel[] = [];
  recentPosts: PostsModel[] = [];
  ads: AdsModel[] = [];
  categoriesWithPosts: CategoriesWithPostsModel[] = [];

  postsDisplaySectionStructure: PageStructure = {
    sections: []
  }

  ngOnInit(): void {
    this.homeFacade.getBannerPosts().subscribe((posts: PostsModel[]) => this.bannerPosts = posts);
    this.homeFacade.getAdvertisements().subscribe((ads: AdsModel[]) => this.ads = ads);
    this.homeFacade.getHighlightedPosts().subscribe((posts: PostsModel[]) => this.highlightedPosts = posts);
    this.homeFacade.getRecentPosts().subscribe((posts: PostsModel[]) => this.recentPosts = posts);
    
    this.homeFacade.getCategoriesWithPosts().subscribe({
        next: (categoriesWithPostsReadyToUse: CategoriesWithPostsModel[]) => {
          let dataCollect: any[] = [];

          categoriesWithPostsReadyToUse.forEach((categoryWithPosts: CategoriesWithPostsModel) => {
            dataCollect.push({
                sectionTitle: categoryWithPosts.label,
                entries: categoryWithPosts.entries
            });
            
          });
          dataCollect.forEach((data: any) => {
            this.postsDisplaySectionStructure.sections.push({
              type: 'post',
              sectionTitle: data.sectionTitle,
              data: data.entries,
            });
          });

          if(this.ads){

            // console.log(this.ads)
            
            if(this.ads.length >= 2){
              this.addAdvertisementOnPageRow(3, {
                type: 'advertisement',
                  sectionTitle: '',
                  data: { imagePath: this.ads[1].imagePath, link: this.ads[1].link },
              });
            }
            if(this.ads.length >= 3){
              this.addAdvertisementOnPageRow(6, {
                type: 'advertisement',
                  sectionTitle: '',
                  data: { imagePath: this.ads[2].imagePath, link: this.ads[2].link },
              });
            }
            // if(this.ads.length >= 4){
            //   this.addAdvertisementOnPageRow(5, {
            //     type: 'advertisement',
            //       sectionTitle: '',
            //       data: this.ads[3],
            //   });
            // }

          }

        }
    });
  }

  addAdvertisementOnPageRow(row: number, advertisement: any): void{
    this.postsDisplaySectionStructure.sections.splice(row - 1, 0, advertisement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
