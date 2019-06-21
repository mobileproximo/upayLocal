import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdate'
})
export class FormatdatePipe implements PipeTransform {

  transform(chaine: string) {
    chaine = chaine.replace(/ /g, '');
    if (chaine.length === 14) {
// tslint:disable-next-line: max-line-length
      return chaine.substring(6, 8) + '/' + chaine.substring(4, 6) + '/' + chaine.substring(0, 4) + ' - ' + chaine.substring(8, 10) + 'h:' + chaine.substring(10, 12) ;
    }
    return chaine;
  }

}
