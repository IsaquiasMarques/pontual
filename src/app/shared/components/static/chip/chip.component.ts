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
  @Input() iconWidth: number = 12;
  @Input() iconHeight: number = 14;
  @Input() bgColor: string = '';
  @Input() bgOpacity: string = '';
  @Input() textColor: string = 'white';
  @Input() gap = 'gap-1';
  @Input() chipPadding: string = 'p-2';
  @Input() labelSize: string = 'text-sm'
  @Input() labelWeight: string = 'font-normal';

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
