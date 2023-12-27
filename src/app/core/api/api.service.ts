import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdsModel } from '@core/base-models/ads.model';
import { CategoriesModel, CategoriesWithPostsModel } from '@core/base-models/categories.model';
import { PostsModel } from '@core/base-models/posts.model';
import { ADS_WANTED_FIELDS, CATEGORIES_WANTED_FIELDS, POSTS_WANTED_FIELDS } from '@core/constants/fields';
import { LIMIT_OF_CATEGORIES_ON_MENU, LIMIT_OF_POSTS_PER_CATEGORIES_ON_HOME_PAGE, LIMIT_OF_RECENT_POSTS } from '@core/constants/limitations';
import { HOME_PAGE_INDEX_ID, READING_PAGE_INDEX_ID, RESULTS_PAGE_INDEX_ID, SEE_POSTS_PAGE_INDEX_ID } from '@core/constants/pages';
import { CATEGORY_CONTAINER_ID, CATEGORY_CONTAINER_LABEL, CATEGORY_CONTAINER_SLUG } from '@core/mock/Categories.mock';

import { transformWPDataFormatIntoLocalDataFormat } from '@shared/helpers/functions/posts.funcs';

import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly allCategories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);
  private readonly limitedCategories$: BehaviorSubject<CategoriesModel[]> = new BehaviorSubject<CategoriesModel[]>([]);
  private readonly categoriesWithPosts$: BehaviorSubject<CategoriesWithPostsModel[]> = new BehaviorSubject<CategoriesWithPostsModel[]>([])
  private readonly ads$: BehaviorSubject<AdsModel[]> = new BehaviorSubject<AdsModel[]>([]);

  constructor(private http: HttpClient){
    this.http.get<CategoriesModel[]>(`${environment.backoffice}/categories?${CATEGORIES_WANTED_FIELDS}`)
             .pipe(
                  // order categories by number of posts
                  map((nonOrderedData: any[]) => {
                    nonOrderedData.sort((x, y) => {
                        if (x.count < y.count) {
                          return 1;
                        }
                        if (x.count > y.count) {
                          return -1;
                        }
                        return 0;
                    })
                    return nonOrderedData;
                  }),
                  map((nonTransformedData: any) => {

                    this.allCategories$.next(nonTransformedData);

                    let categories: CategoriesModel[] = [];
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

                    this.fulfillCategoriesWithPosts(categoriesThatHavePosts, 3);

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
                        id: CATEGORY_CONTAINER_ID,
                        label: CATEGORY_CONTAINER_LABEL,
                        slug: CATEGORY_CONTAINER_SLUG,
                        hasPosts: true,
                        childrens: subcategories,
                      });
                    }
                    return TransformeData;
                  }),
              ).subscribe((categoriesReadyForUse: CategoriesModel[]) => {
                this.limitedCategories$.next(categoriesReadyForUse);
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

  limitedCategories(): Observable<CategoriesModel[]>{
    return this.limitedCategories$;
  }

  allCategories(): Observable<CategoriesModel[]>{
    return this.allCategories$;
  }

  categoriesWithPosts(): Observable<CategoriesWithPostsModel[]>{
    return this.categoriesWithPosts$;
  }

  fulfillCategoriesWithPosts(categories: CategoriesModel[], waitInSeconds: number = 3){
    let categoriesWithPostsArray: CategoriesWithPostsModel[] = [];

    categories.forEach((category: CategoriesModel) => {
      this.getPostsFromCategory(LIMIT_OF_POSTS_PER_CATEGORIES_ON_HOME_PAGE, category.id).subscribe({
          next: (postsFromCategory: PostsModel[]) => {
            categoriesWithPostsArray.push({
                categoryId: category.id,
                label: category.label,
                slug: category.slug,
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

  getRecentPosts(limit?: number): Observable<PostsModel[]>{
    let per_page = 0;
    
    per_page = (limit) ? limit : LIMIT_OF_RECENT_POSTS;

    return this.http.get<PostsModel[]>(`${environment.backoffice}/posts?per_page=${per_page + '&' + POSTS_WANTED_FIELDS }`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                        return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }

  getPostBySlug(slug: string): Observable<PostsModel>{
    return this.http.get<PostsModel>(`${environment.backoffice}/posts?slug=${slug + '&' + POSTS_WANTED_FIELDS}`)
                    .pipe(
                      map((nonTransformedData: any) => {
                          return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)[0];
                      }),
                    )
  }

  getAuthors(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.backoffice}/acf-authors`);
  }

  getPostsFromCategory(limit?: number, categoryId?: number, excluded_id?: number): Observable<PostsModel[]>{
    let per_page = 0;
    let category = '';
    let excludedId = '';
    
    per_page = (limit) ? limit : 100;
    category = (categoryId) ? `categories=${categoryId}` : '';
    excludedId = (excluded_id) ? `exclude=${excluded_id}` : '';
    
    return this.http.get<PostsModel[]>(`${environment.backoffice}/posts?${category}&${excludedId}&per_page=${per_page + '&' + POSTS_WANTED_FIELDS}`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                          return transformWPDataFormatIntoLocalDataFormat(nonTransformedData)
                      })
                    );
  }

  filterPosts(searchTerm?: string, categoryId?: number, created_at?: string, acfAuthor?: string): Observable<PostsModel[]>{
    let searchFor: string = '';
    let created: string = '';
    let category: string = '';

    if(categoryId){
      category = `categories=${categoryId}`;
    }
    if(searchTerm){
      searchFor = `search=${searchTerm}`;
    }
    if(created_at){
      created = `after=${created_at}`;
    }

    // console.log(`${environment.backoffice}/posts?&${category}&${searchFor}&${created}`);
    return this.http.get<PostsModel[]>(`${environment.backoffice}/posts?&${category}&${searchFor}&${created}`)
                    .pipe(
                      map((nonTransformedData: any[]) => {
                        return transformWPDataFormatIntoLocalDataFormat(nonTransformedData);
                      })
                    );
  }

  getAboutInfo(){
    return this.http.get(`${environment.backoffice}/about`);
  }

  subscibe(subscriber: any){
    return this.http.post(`${environment.newsletter.endpoint}/subscribers?client_key=${environment.newsletter.clientKey}&client_secret=${environment.newsletter.clientSecret}`, subscriber);
  }
  
}
