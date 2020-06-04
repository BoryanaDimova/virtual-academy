import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'passwordFormat'
})
export class PasswordFormatPipe implements PipeTransform{
  transform(value: string): string {
    return value.replace(/./gi, '*');
  }

}
