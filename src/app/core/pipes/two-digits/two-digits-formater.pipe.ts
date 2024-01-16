import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigitsFormat'
})
export class TwoDigitsFormaterPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value < 10){
      return "0" + value;
    }
    return value;
  }

}
