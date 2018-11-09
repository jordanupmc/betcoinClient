import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'decodeURIPipe'})
export class DecodeURIPipe implements PipeTransform {
  transform(value: string): string {
    return decodeURIComponent(value);
  }
}