import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel, CategoriesWithPostsModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { ADS_WANTED_FIELDS, CATEGORIES_WANTED_FIELDS, POSTS_WANTED_FIELDS } from '@core/constants/fields';
import { LIMIT_OF_CATEGORIES_ON_MENU, LIMIT_OF_POSTS_PER_CATEGORIES_ON_HOME_PAGE, LIMIT_OF_RECENT_POSTS } from '@core/constants/limitations';
import { HOME_PAGE_INDEX_ID, READING_PAGE_INDEX_ID, RESULTS_PAGE_INDEX_ID, SEE_POSTS_PAGE_INDEX_ID } from '@core/constants/pages';
import { CATEGORY_CONTAINER_LABEL, CATEGORY_CONTAINER_SLUG } from '@core/mock/Categories.mock';

import { transformWPDataFormatIntoLocalDataFormat } from '@shared/helpers/functions/posts.funcs';

import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly categories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);
  private readonly categoriesWithPosts$: BehaviorSubject<CategoriesWithPostsModel[]> = new BehaviorSubject<CategoriesWithPostsModel[]>([])
  private readonly ads$: BehaviorSubject<AdsModel[]> = new BehaviorSubject<AdsModel[]>([]);

  constructor(private http: HttpClient){
    this.http.get<CategoriesModel[]>(`${environment.backoffice}/categories?${CATEGORIES_WANTED_FIELDS}`)
             .pipe(
                  map((nonTransformedData: any) => {
                    let categories: any[] = [];
                    nonTransformedData.forEach((element: any) => {
                      categories.push({
                          id: element.id,
                          label: element.name,
                          slug: element.slug,
                          hasPosts: (element.count > 0) ? true : false,
                        })
                    });
                    return categories;
                  }),
                  map((transformedData: CategoriesModel[]) => {

                    let categoriesThatHavePosts: CategoriesModel[] = [];
                    transformedData.forEach((category: CategoriesModel) => {
                        if(category.hasPosts){
                            categoriesThatHavePosts.push(category);
                        }
                    });

                    this.fulfillCategoriesWithPosts(categoriesThatHavePosts, 1.5);

                    return transformedData;
                  }),
                  map((TransformeData: CategoriesModel[]) => {
                    if(TransformeData.length > LIMIT_OF_CATEGORIES_ON_MENU){

                      let subcategories: CategoriesModel[] = [];

                      for (let index = LIMIT_OF_CATEGORIES_ON_MENU; index <= TransformeData.length - 1; index++) {
                        let splicedItem: CategoriesModel[] = TransformeData.splice(index, 1);
                        subcategories.push(splicedItem[0]);
                      }

                      TransformeData.unshift({
                        id: 4200,
                        label: CATEGORY_CONTAINER_LABEL,
                        slug: CATEGORY_CONTAINER_SLUG,
                        hasPosts: true,
                        childrens: subcategories,
                      });
                    }
                    return TransformeData;
                  }),
              ).subscribe((categoriesReadyForUse: CategoriesModel[]) => {
                this.categories$.next(categoriesReadyForUse);
              });

    this.http.get<AdsModel[]>(`${environment.backoffice}/anuncios?${ADS_WANTED_FIELDS}`)
             .pipe(
                  // transform ads structure
                  map((nonTransformedData: any) => {
                    
                    let advertisements: AdsModel[] = [];

                    nonTransformedData.forEach((element: any) => {
                      if(!element.acf.anuncios) return;
                      element.acf.anuncios.forEach((anuncio: any) => {
                        advertisements.push({
                          page: anuncio.pagina_de_visualizacao,
                          imagePath: {
                            fullImageSize: anuncio.imagem_do_anuncio.url,
                            thumbnailImageSize: anuncio.imagem_do_anuncio.sizes?.thumbnail
                          },
                          link: anuncio.link_de_redireccionamento
                        });
                      });
                    });
                    return advertisements;

                  }),
                  // categorize ads by page
                  map((TransformedData: AdsModel[]) => {
                    let advertisementsCategorizedByPage: any = []

                    let homePageAds: AdsModel[] = [];
                    let seePostsPageAds: AdsModel[] = [];
                    let readingPageAds: AdsModel[] = [];
                    let resultsPageAds: AdsModel[] = [];

                    TransformedData.forEach((advertisement: AdsModel) => {
                      switch(advertisement.page){
                        case 'home':
                          homePageAds.push(advertisement);
                          break;
                        case 'see-posts':
                          seePostsPageAds.push(advertisement);
                          break;
                        case 'reading':
                          readingPageAds.push(advertisement);
                          break;
                        case 'results':
                          resultsPageAds.push(advertisement);
                          break;
                      }
                    });
                    advertisementsCategorizedByPage[HOME_PAGE_INDEX_ID] = homePageAds;
                    advertisementsCategorizedByPage[SEE_POSTS_PAGE_INDEX_ID] = seePostsPageAds;
                    advertisementsCategorizedByPage[READING_PAGE_INDEX_ID] = readingPageAds;
                    advertisementsCategorizedByPage[RESULTS_PAGE_INDEX_ID] = resultsPageAds;

                    return advertisementsCategorizedByPage;
                  })
             ).subscribe((advertisementsReadyToUse: AdsModel[]) => {
              this.ads$.next(advertisementsReadyToUse);
             });
  }

  advertisements(): Observable<AdsModel[]>{
    return this.ads$;
  }

  categories(): Observable<CategoriesModel[]>{
    return this.categories$;
  } 

  categoriesWithPosts(): Observable<CategoriesWithPostsModel[]>{
    return this.categoriesWithPosts$;
  }

  fulfillCategoriesWithPosts(categories: CategoriesModel[], waitInSeconds: number = 3){
    let categoriesWithPostsArray: CategoriesWithPostsModel[] = [];

    categories.forEach((category: CategoriesModel) => {
      this.getPostsFromCategory(category.id).subscribe({
          next: (postsFromCategory: PostsModel[]) => {
            categoriesWithPostsArray.push({
                categoryId: category.id,
                label: category.label,
                entries: postsFromCategory
            });
          }
      });
    })
    setTimeout(() => {
      // order from categories with more posts to less
      categoriesWithPostsArray.sort((x, y) => {
          if (x.entries.length < y.entries.length) {
           return 1;
          }
          if (x.entries.length > y.entries.length) {
           return -1;
          }
          return 0;
      })

      this.categoriesWithPosts$.next(categoriesWithPostsArray);
    }, waitInSeconds * 1000)
  }

  getBannerPosts(limit: number = 4): Observable<PostsModel[]>{
    return this.http.get<PostsModel[]>(`${environment.backoffice}/banner-posts`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                        return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }

  getHighlightedPosts(limit: number = 3): Observable<PostsModel[]>{
    return this.http.get<PostsModel[]>(`${environment.backoffice}/highlight-posts`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                        return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }

  getRecentPosts(): Observable<PostsModel[]>{
    return this.http.get<PostsModel[]>(`${environment.backoffice}/posts?per_page=${LIMIT_OF_RECENT_POSTS + '&' + POSTS_WANTED_FIELDS }`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                        return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }

  getPostsFromCategory(categoryId: number): Observable<PostsModel[]>{
    return this.http.get<PostsModel[]>(`${environment.backoffice}/posts?categories=${categoryId}&per_page=${LIMIT_OF_POSTS_PER_CATEGORIES_ON_HOME_PAGE}`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                          return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }
  
}
