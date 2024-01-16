import { Pipe, PipeTransform } from '@angular/core';
import { fulDateTranslate } from '@shared/helpers/date/translate';

@Pipe({
  name: 'translate_pt_ao'
})
export class TranslatorPipe implements PipeTransform {

  transform(fullDate: any) {
    return fulDateTranslate(fullDate);
  }

}
