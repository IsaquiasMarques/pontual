import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { CategoriesModel } from '@core/base-models/categories.model';
import { CoreFacade } from '@core/facades/core.facade';
import { CATEGORY_CONTAINER_LABEL } from '@core/mock/Categories.mock';
import { gototop } from '@shared/helpers/functions/scroll';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {
  title = '';
  @ViewChild('navigationContainer') navigationElement!: ElementRef<HTMLElement>;
  bodyElementMarginTop: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public coreFacade: CoreFacade,
    
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: any,
    private _ngZone: NgZone
  ){}

  containerLabel: string = CATEGORY_CONTAINER_LABEL;

  // subscribing
  subscribeFormGroup: any;
  hasSubscribed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSubscribing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  emailIsInvalid: boolean = false;

  getHeaderCategories(): Observable<CategoriesModel[]>{
    return this.coreFacade.getHeaderCategories();
  }

  ngOnInit(): void {
    this.subscribeFormGroup = new FormGroup({
      'email': new FormControl('', [ Validators.required, Validators.email ])
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {  
  }

  ngAfterViewInit(): void {
    this.bodyElementMarginTop.next(this.navigationElement.nativeElement.clientHeight);
    this.changeDetectorRef.detectChanges();
  }

  gototop(){
    gototop();
  }

  subscribe(){

    if(!(this.subscribeFormGroup.invalid)){
      let email = this.subscribeFormGroup.get('email').value;

      let subscriber = {
        email: email,
        status: 'confirmed',
        lists: [1]
      }

      this.isSubscribing.next(true);
      this.apiService.subscibe(subscriber).subscribe((response: any) => {
        if(response.id){
          this.hasSubscribed.next(true);
        }else{
          this.hasError.next(true);
        }

        if(isPlatformBrowser(this.platformId)){
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this.hasSubscribed.next(false);
              this.hasError.next(false);
            }, 4000);
          });
        }

        this.isSubscribing.next(false);
        this.subscribeFormGroup.reset();
      });
    }

  }

  validate(){
    this.emailIsInvalid = this.subscribeFormGroup.get('email').invalid ? true : false;
  }

}
