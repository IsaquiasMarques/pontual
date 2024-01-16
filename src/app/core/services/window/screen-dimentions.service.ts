import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

interface ScreenDimentionsInterface{
  width: number,
  heigth: number
}

@Injectable({
  providedIn: 'root'
})
export class ScreenDimentions {
  
  private screen: ScreenDimentionsInterface = {
    width: 0,
    heigth: 0
  }

  private screenType:
                    'mobile'      | // < 375
                    'tablet-sm'   | // 425
                    'tablet-lg'   | // 768
                    'laptop-sm'   | // 1024
                    'laptop-lg'   | // 1440
                    'desktop-sm'  | // 1280
                    'desktop-lg'  | // 1536
                    'desktop-2xl' = 'mobile' // > 1536

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.onResize();
  }

  private onResize(){

    if(isPlatformBrowser(this.platformId)){
      this.screen.width = window.innerWidth;
      this.screen.heigth = window.innerHeight;

      this.determineScreenType(this.screen.width);
    }

  }

  public get getScreenDimentions(): ScreenDimentionsInterface{
    return this.screen;
  }

  public get getScreenType(): string{
    return this.screenType;
  }

  private determineScreenType(screenWidth: number){

    if(screenWidth <= 375){
      this.screenType = 'mobile';
      return;

    }else if(screenWidth > 375 && screenWidth < 768){
      this.screenType = 'tablet-sm';
      return;
      
    }else if(screenWidth >= 768 && screenWidth < 1024){
      this.screenType = 'tablet-lg';
      return;
      
    }else if(screenWidth >= 1024 && screenWidth < 1440){
      this.screenType = 'laptop-sm';
      return;
      
    }else if(screenWidth >= 1440 && screenWidth < 1280){
      this.screenType = 'laptop-lg';
      return;
      
    }else if(screenWidth >= 1280 && screenWidth < 1536){
      this.screenType = 'desktop-sm';
      return;
      
    }else {
      this.screenType = 'desktop-lg';
      return;
    }

  }

}
