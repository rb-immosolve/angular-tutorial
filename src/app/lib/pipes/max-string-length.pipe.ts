import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxStringLength'
})
export class MaxStringLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number = 40): string {
    if (value.length > maxLength) {
      value = value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
