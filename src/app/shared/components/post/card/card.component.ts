import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pontual-post-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class PostCardComponent implements OnInit, OnChanges {
  
  @Input() cardType: 'short' | 'tall' = 'tall';
  @Input() postCategory: string = '';
  @Input() postImagePath?: string = '';
  @Input() postTitle: string = '';
  @Input() postAuthor: string = '';
  @Input() postCreatedAt: string = '';
  @Input() postHighlightDescription: string = '';

  @Input() chipBgColor: string = '';
  @Input() chipIconColor: string = '';
  @Input() chipTextColor: string = '';

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
