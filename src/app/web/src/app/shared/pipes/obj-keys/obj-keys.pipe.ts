import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objKeys'
})
export class ObjKeysPipe implements PipeTransform {

  transform(value: Object): any {
    return Object.keys(value);
  }

}
