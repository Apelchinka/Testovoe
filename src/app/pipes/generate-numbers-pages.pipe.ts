import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'generateNumbersPages' })
export class GenerateNumbersPagesPipe implements PipeTransform {
  transform(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }
}
