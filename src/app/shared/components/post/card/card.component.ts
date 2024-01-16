import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ImageObjectInterface } from '@shared/components/model/image-object';

@Component({
  selector: 'pontual-post-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class PostCardComponent implements OnInit, OnChanges {
  
  @Input() isFirstItem: boolean = false;
  @Input() cardType: 'short' | 'tall' = 'tall';
  @Input() postCategory: string = '';
  @Input() postImagePath: ImageObjectInterface = {
    thumbnailImageSize: '',
    mediumImageSize: '',
    fullImageSize: ''
  };
  @Input() postTitle: string = '';
  @Input() postSlug: string = '';
  @Input() postAuthor?: string = '';
  @Input() postCreatedAt: string = '';
  @Input() postHighlightDescription?: string = '';

  @Input() showPostImage: boolean = true;

  @Input() chipBgColor: string = '';
  @Input() chipIconColor: string = '';
  @Input() chipTextColor: string = '';
  
  // Lazy Loading attribute
  imageMayAppear: boolean = false;

  ngOnInit(): void {

  }

  appearWhenLoaded($event: any){
    this.imageMayAppear = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
