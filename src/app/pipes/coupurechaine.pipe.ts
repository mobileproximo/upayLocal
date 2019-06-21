import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coupurechaine'
})
export class CoupurechainePipe implements PipeTransform {

  transform(chaine: string) {
    if (chaine.length > 20) {
      const part1 = chaine.substring(0, 20);
      const part2 = chaine.substring(20, chaine.length);
      return part1 + '-\n       ' + part2;
    } else { return chaine; }
  }
}
