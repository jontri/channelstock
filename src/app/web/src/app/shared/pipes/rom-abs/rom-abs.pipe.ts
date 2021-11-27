import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romAbs'
})
export class RomAbsPipe implements PipeTransform {

  transform(value: number): number {
    var val = value.toString().replace(/\,/g,'');
    return Math.abs(parseFloat(val));
  }

}
