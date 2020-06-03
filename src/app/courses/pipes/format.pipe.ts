import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string, length?: number): string {
    const maxLength = length ? length : 50;

    if (value.length > maxLength) {
      return `${value.substr(0, maxLength)}...`;
    }

    return value;
  }
}
