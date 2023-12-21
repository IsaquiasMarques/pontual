import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { AdsModel } from '@core/base-models/ads.model';
import { PostsFacade } from '../../facades/posts.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesModel } from '@core/base-models/categories.model';
import { BehaviorSubject, map, pipe, tap } from 'rxjs';
import { PostsModel } from '@core/base-models/posts.model';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';

const ANY_DATE: number = -1;
const TODAY: number = 0;
const ONE_WEEK: number = 7;
const TWO_WEEKS: number = 14;
const ONE_MONTH: number = 30;
const TWO_MONTHS: number = 60;
const ONE_YEAR: number = 365;

@Component({
  selector: 'pontual-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})


export class PostsComponent implements OnInit {

  today: number = TODAY;
  any_date: number = ANY_DATE;
  one_week_ago: number = ONE_WEEK;
  two_weeks_ago: number = TWO_WEEKS;
  one_month_ago: number = ONE_MONTH;
  two_months_ago: number = TWO_MONTHS;
  one_year_ago: number = ONE_YEAR;

  // filtered values section
  searchTerm: string  = '';
  selectedCategoryForFilter: number = 0;
  selectedDateForFilter: number = -100;
  selectedAuthorForFilter: string = '';

  // filteredLabels section
  selectedCategoryLabel: string = '';
  selectedDateLabel: string = '';

  constructor(
    private postsFacade: PostsFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public screenDimentions: ScreenDimentions
  ) {}

  ads: AdsModel[] = [];
  theCategoryLabel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  theCategoryCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  theCategoryId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  categories: any[] = [];
  authors: string[] = [];

  mainPostsFromCategoryOrNot: PostsModel[] = [];
  postsSectionBeforeAdvertisementLimit: number = 12;
  postsSectionBeforeAdvertisement: PostsModel[] = [];
  postsSectionAfterAdvertisement: PostsModel[] = [];

  ngOnInit(): void {
    this.activatedRouteFunction();

    this.postsFacade.getAllCategories().subscribe((categories: CategoriesModel[]) => this.categories = categories);
    this.postsFacade.getAuthors().subscribe((authors: string[]) => this.authors = authors);
    this.postsFacade.getAdvertisements().subscribe((advertisements: AdsModel[]) => this.ads = advertisements);

  }

  activatedRouteFunction(){
    this.activatedRoute.params.subscribe((param: any) => {
      const categorySlug = param['category'];
      this.postsFacade.getCategoryBySlug(categorySlug) // getCategoryBySlug(): { id, count, name, slug }
                      .pipe(
                        map((theCategory: any) => {
                          this.theCategoryId$.next(theCategory.id);
                          this.theCategoryLabel$.next(theCategory.name);
                          this.theCategoryCount$.next(theCategory.count);
                          return theCategory;
                        }),
                        map((theCategory: any) => {
                          this.postsFacade.getPostByCategory(theCategory.id).subscribe({
                            next: (posts: PostsModel[]) => {
                              this.separatePosts(posts);
                            }
                          });
                        })
                      ).subscribe();
    });
  }

  separatePosts(posts: PostsModel[]){
    this.postsSectionBeforeAdvertisement = [];
    this.postsSectionAfterAdvertisement = [];

    if(posts.length > this.postsSectionBeforeAdvertisementLimit){
      for (let index = 0; index < this.postsSectionBeforeAdvertisementLimit; index++) {
        if(posts[index])
          this.postsSectionBeforeAdvertisement.push(posts[index]);
      }

      // >

      for (let index = this.postsSectionBeforeAdvertisementLimit; index <= (posts.length - 1); index++) {
        if(posts[index])
          this.postsSectionAfterAdvertisement.push(posts[index]);
      }
    }

    if(posts.length <= this.postsSectionBeforeAdvertisementLimit){
      for (let index = 0; index < this.postsSectionBeforeAdvertisementLimit; index++) {
        if(posts[index])
          this.postsSectionBeforeAdvertisement.push(posts[index]);
      }
    }

  }

  filterPosts(){
    if(this.searchTerm == "" && this.selectedCategoryForFilter == 0 && this.selectedDateForFilter == -100 && this.selectedAuthorForFilter == ''){
      this.activatedRouteFunction();
      return;
    }

    let categoryIdForFilter: number = (this.selectedCategoryForFilter > 0) ? this.selectedCategoryForFilter : this.theCategoryId$.getValue();

    // console.log(this.searchTerm, this.selectedCategoryForFilter, this.selectedDateForFilter, this.selectedAuthorForFilter)
    this.postsFacade.filterPosts(this.searchTerm, categoryIdForFilter, this.dateConverter(this.selectedDateForFilter), this.selectedAuthorForFilter)
                    .pipe(
                      map((incomingPosts: PostsModel[]) => {

                        if(this.selectedAuthorForFilter){
                          return incomingPosts.filter((post: PostsModel) => post.author == this.selectedAuthorForFilter);
                        }

                        return incomingPosts;
                      })
                    )
                    .subscribe((incomingPosts: PostsModel[]) => {
                      this.separatePosts(incomingPosts);
                    });

  }

  changeUrlCategory(){
    // this.router.navigate(['/posts/' + this.selectedCategoryForFilter]);
  }

  clearFilter(section: string){
    switch(section){
      case 'category':
        this.selectedCategoryForFilter = 0;
        this.selectedCategoryLabel = '';
        break;
      case 'date':
        this.selectedDateForFilter = -100;
        this.selectedDateLabel = '';
        break;
      case 'author':
        this.selectedAuthorForFilter = '';
        break;
      case 'all':
        this.selectedCategoryForFilter = 0;
        this.selectedCategoryLabel = '';
        this.selectedDateForFilter = -100;
        this.selectedDateLabel = '';
        this.selectedAuthorForFilter = '';
        break;
    }
    if(this.selectedCategoryForFilter == 0 && this.selectedDateForFilter == -100 && this.selectedAuthorForFilter == ''){
      this.activatedRouteFunction();
      return;
    }
    this.filterPosts();
  }

  identifyCategory(){
    this.categories.forEach((category: any) => {
      if(category.id == this.selectedCategoryForFilter){
        this.selectedCategoryLabel = category.name;
      }
    });
  }

  identifyDateByValue(){

    if(this.selectedDateForFilter == ANY_DATE){
      this.selectedDateLabel = 'Qualquer data';

    }else if(this.selectedDateForFilter == TODAY){
      this.selectedDateLabel = 'Hoje';

    }else if(this.selectedDateForFilter == ONE_WEEK){
      this.selectedDateLabel = 'Há uma semana';

    }else if(this.selectedDateForFilter == TWO_WEEKS){
      this.selectedDateLabel = 'Há duas semanas';

    }else if(this.selectedDateForFilter == ONE_MONTH){
      this.selectedDateLabel = 'Há um mês';

    }else if(this.selectedDateForFilter == TWO_MONTHS){
      this.selectedDateLabel = 'Há dois meses';

    }else if(this.selectedDateForFilter == ONE_YEAR){
      this.selectedDateLabel = 'Há um ano';
      
    }
  }

  dateConverter(interval: number): string{
    if(interval == -1){
      return '';
    }
    if(interval == -100){
      return '';
    }
    
    const startDate: Date = new Date();
    startDate.setDate(startDate.getDate() - interval);
    
    const isoDate: string = startDate.toISOString();

    return isoDate;

  }

}
