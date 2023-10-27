import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: string[], order: "asc" | "desc" = 'asc'): string[] {
    if (order === 'asc') {
      return value.sort();
    }
    if (order === 'desc') {
      return value.sort((a, b) => { return a > b ? -1 : 1 })
    }
  }

}
