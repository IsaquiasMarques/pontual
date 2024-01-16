import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { PageStructure } from '@core/base-models/page-structure.mode';
import { LIMIT_OF_POSTS_PER_CATEGORIES_ON_HOME_PAGE } from '@core/constants/limitations';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';
import { slideTo } from '@shared/helpers/functions/slider.func';

@Component({
  selector: 'pontual-categorized-posts-section',
  templateUrl: './categorized-posts-section.component.html',
  styleUrls: ['./categorized-posts-section.component.css']
})
export class CategorizedPostsSectionComponent implements OnInit, OnChanges {
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public screenDimentions: ScreenDimentions
  ) {}

  @Input() pageStructure: PageStructure = { sections: [] };
  @Input() activeIndexes: { [key: string]: number } = {}

  numberOfPostsWithFullContent: number = 3;

  
  ngOnInit(): void {
    // console.log(this.screenDimentions.getScreenType)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  next(data: any[], categoryName: string){

    if(this.activeIndexes[categoryName] >= data.length - 2){
      return;
    }

    this.activeIndexes[categoryName]++;
    slideTo(this.activeIndexes[categoryName], 'scrollEnabled-' + categoryName);
  }

  prev(data: any[], categoryName: string){
    if(this.activeIndexes[categoryName] == 0){
      return;
    }
    
    this.activeIndexes[categoryName]--;
    slideTo(this.activeIndexes[categoryName], 'scrollEnabled-' + categoryName);
  }

}
