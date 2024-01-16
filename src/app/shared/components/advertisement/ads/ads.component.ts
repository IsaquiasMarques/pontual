import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { AdsModel } from '@core/base-models/ads.model';

@Component({
  selector: 'pontual-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})

export class AdsComponent implements OnInit, OnChanges {
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ){ }

  @Input() width: string = 'w-full';
  // @Input() height: string = 'h-[260px]';
  @Input() height: string = 'h-[523px]';
  @Input() ad: AdsModel = {
      imagePath: {
        fullImageSize: '',
        thumbnailImageSize: ''
      },
    link: ''
  };
  @Input() topLabel: boolean = true;

  imageMayAppear: boolean = false;

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  appearWhenLoaded($event: any){
    this.imageMayAppear = true;
  }

  openLink(link?: string){
    if(isPlatformBrowser(this.platformId)){
      if((this.ad.link && this.ad.link != '') || (link && link != '')){
        window.open(this.ad.link, '_blank');
      }
    }
  }

}
