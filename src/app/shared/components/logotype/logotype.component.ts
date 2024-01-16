import { Component, Input } from '@angular/core';

@Component({
  selector: 'logotype',
  templateUrl: './logotype.component.html',
  styleUrls: ['./logotype.component.css']
})
export class LogotypeComponent {
  @Input() width: number = 163;
  @Input() height: number = 39;
  @Input() viewbox: string = `0 0 ${this.width + ' ' + this.height}`;
  @Input() lettersColor: string = '#030616';
  @Input() brandColor: string = '#D3352A';
}
