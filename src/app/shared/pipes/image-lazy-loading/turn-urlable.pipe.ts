import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnUrlable'
})
export class TurnUrlablePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `url(${value})`;
  }

}
