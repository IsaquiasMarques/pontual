import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pontual-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  today: number = Date.now();
  temperatureInCelsium: number = 28;
  hours$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  minutes$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private hourIntervalCounter: any;
  
  ngOnInit(): void {
    this.getCurrentTime();
    this.refreshClock();
  }

  getCurrentTime(){
    const now = new Date();
    this.hours$.next(now.getHours());
    this.minutes$.next(now.getMinutes());
  }

  refreshClock(interval: number = 5){

    if(isPlatformBrowser(this.platformId)){
      setInterval(() => {
        this.getCurrentTime();
      }, interval * 1000);
    }

  }

  clearClockRefresh(){
    clearInterval(this.hourIntervalCounter);
  }
}
