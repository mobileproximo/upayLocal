import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'operatorImage'
})
export class OperatorImagePipe implements PipeTransform {
   src = 'assets/imgs/';

  transform(OperatorsImages: any, codeOper: string, codeSousop: string): any {
    let i = 0;
// tslint:disable-next-line: max-line-length
    while (i < OperatorsImages.length && OperatorsImages[i].codeoper !== codeOper ) {
      i++;
    }
    if (i < OperatorsImages.length) {
      if (codeOper === '0057' && codeSousop === '2') {
      return this.src + 'logo_rapido.png';
      } else {
      return OperatorsImages[i].image;
      }
      } else { return this.src + 'logo_upay.jpg'; }
    }

}
