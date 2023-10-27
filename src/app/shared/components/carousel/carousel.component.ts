import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PostsModel } from '@core/base-models/posts.model';

@Component({
  selector: 'pontual-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit, OnChanges, AfterViewInit {
  
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  @Input() bannerPosts: PostsModel[] = [];
  imageMayAppear: boolean = false;

  ngOnInit(): void {

  }

  appearWhenLoaded($event: any){
    this.imageMayAppear = true;
  }

  ngOnChanges(changes: SimpleChanges){
  }
  
  ngAfterViewInit(): void {
    this.startSliding();
    this.carouselContainer.nativeElement;
  }

  startSliding(index?: number){

    
    // setInterval(() => {
    //   // this.getTheBannerComponents();
    //   // this.carouselContainer.nativeElement.scrollTo(456, 0);
    // }, 3 * 1000)
  }

  getTheBannerComponents(){
    let bannerNews = document.querySelectorAll('#bannerNews') as NodeListOf<HTMLElement>;
    bannerNews.forEach((element: HTMLElement) => {
      console.log(element);
    });
  }

  @HostListener('wheel', ['$event']) onWheel($event: any){
    // console.log($event)
    // $event.preventDefault();
  }

}