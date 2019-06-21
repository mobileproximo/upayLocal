import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatcode'
})
export class FormatcodePipe implements PipeTransform {

  transform(chaine: string, bloc: number, separateur: string) {
    let i = 0, j = bloc;
    let format = '';
    chaine += '';
    if (chaine === '') {
      return '';
    }
    // supprime tous les espaces contenu dans la chaine
    chaine = chaine.replace(/ /g, '');
    while (j < chaine.length) {
      format += chaine.substring(i, j) + separateur;
      i = j;
      j += bloc;
    }
    return format += chaine.substring(i, j);
  }

}
