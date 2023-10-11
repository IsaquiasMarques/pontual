import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pontual-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnInit, OnChanges {
  
  @Input() label: string = '';
  @Input() icon: boolean = true;
  @Input() iconColor: string = '';
  @Input() bgColor: string = '';
  @Input() bgOpacity: string = '';
  @Input() textColor: string = '';
  @Input() gap = 'gap-1';

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
