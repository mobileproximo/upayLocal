import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatphone'
})
export class FormatphonePipe implements PipeTransform {

  
  transform(value: any) {
    value =  value.replace(/ /g, '');
    const tel = value.replace(/-/g, '');
    let phone = tel.length >= 2 ? tel.substring(0, 2) + '-' : '';
    phone += tel.length > 5 ? tel.substring(2, 5) + '-' : '';
    phone += tel.length > 7 ? tel.substring(5, 7) + '-' : '';
    phone += tel.length >= 8 ? tel.substring(7, 9) : '';
    return phone;
  }
}
