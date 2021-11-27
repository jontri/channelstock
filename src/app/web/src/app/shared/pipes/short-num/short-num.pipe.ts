import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'shortNum'
})
export class ShortNumPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) private localeId: string
  ) {}

  transform(value: number, isCurrency: boolean): string {

    if (value == 0){
      return "0";
    }

    if (!value) {
      return '';
    }

    const exp = Number(value.toExponential().split('+')[1]);
    let prefix = '';
    let suffix = '';
    let divisor = 1;

    if (exp >= 9) {
      suffix = 'B';
      // 1,000,000,000 one billion
      divisor = Math.pow(10, 9);
    } else if (exp >= 6) {
      suffix = 'M';
      // 1,000,000 one million
      divisor = Math.pow(10, 6);
    } else if (exp >= 3) {
      suffix = 'k';
      // 1,000 one thousand
      divisor = Math.pow(10, 3);
    }

    if (isCurrency) {
      const cp = new CurrencyPipe(this.localeId);
      prefix = cp.transform(value).charAt(0);
    }

    return `${prefix}${(value / divisor).toFixed(2)}${suffix}`;
  }

}
