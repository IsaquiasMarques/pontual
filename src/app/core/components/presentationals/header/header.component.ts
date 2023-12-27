import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { COUNTRY_CODES } from '@core/constants/country-codes';
import { CoreFacade } from '@core/facades/core.facade';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pontual-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private coreFacade: CoreFacade
  ) {}

  today: number = Date.now();
  temperatureInCelsium$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  hours$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  minutes$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private hourIntervalCounter: any;

  locationPrimary: BehaviorSubject<string> = new BehaviorSubject<string>('');
  locationSecondary: BehaviorSubject<string> = new BehaviorSubject<string>('');

  latitude: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  longitude: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  ngOnInit(): void {
    this.getCurrentTime();
    this.refreshClock();
    this.getCoordinates();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  getCoordinates(){

    if ("geolocation" in navigator) {

      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        this.latitude.next(position.coords.latitude);
        this.longitude.next(position.coords.longitude);

        this.coreFacade.getGeolocationCoordinates(this.latitude.getValue(), this.longitude.getValue()).subscribe({
          next: (incomingData: any) => {
            this.temperatureInCelsium$.next(Math.floor(incomingData.main?.temp))
            this.locationSecondary.next(incomingData.name);
            this.locationPrimary.next(COUNTRY_CODES[incomingData.sys?.country] ?? 'Unknown country code');
          }
        });
        
      }, function(error) {
        console.error("Erro ao obter a localização: " + error.message);
      });

    } else {
      console.log("Geolocalização não suportada pelo navegador");
    }
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
