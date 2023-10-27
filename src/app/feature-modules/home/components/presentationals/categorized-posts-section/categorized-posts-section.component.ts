import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PageStructure } from '@core/base-models/page-structure.mode';

@Component({
  selector: 'pontual-categorized-posts-section',
  templateUrl: './categorized-posts-section.component.html',
  styleUrls: ['./categorized-posts-section.component.css']
})
export class CategorizedPostsSectionComponent implements OnInit, OnChanges {
  
  @Input() pageStructure: PageStructure = { sections: [] };
  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
