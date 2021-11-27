import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private localeId: string) {
  }

  transform(input: string, from: string, to: string): string {
    if (!input) {
      return '';
    }

    var regex = new RegExp(from, 'g');

    return input.replace(regex, to);

  }

}
