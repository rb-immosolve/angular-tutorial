import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string[]): string[] {
    let response: string[] = []
    for (let i = 0; i < value.length; i++) {
      response[i] = value[i].split('').reverse().join('');
    }
    return response;
  }

}
