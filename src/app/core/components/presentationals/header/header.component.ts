import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pontual-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today: number = Date.now();
  temperatureInCelsium: number = 28;
  
  ngOnInit(): void {
  }
}
