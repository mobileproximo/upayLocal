import { Component, EventEmitter, OnInit, OnChanges, Input, Output } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'codepin',
  templateUrl: './codepin.component.html',
  styleUrls: ['./codepin.component.scss'],
})
export class CodepinComponent implements OnInit, OnChanges {

// tslint:disable-next-line: variable-name
  constructor(private serv: ServiceService, public glb: GlobaleVariableService, public number: MillierPipe) {
    const shuffleNumbers = this.shuffle(this.numbersTabs);
    this.inCommingData.image = glb.IMAGE_BASE_URL + 'upay.png';
    let j = 0;
    for (let i = 0; i < 3; i++) {
      this.taba[j++] = shuffleNumbers[i];
    }
    j = 0;
    for (let i = 3; i < 6; i++) {
      this.tabb[j++] = shuffleNumbers[i];
    }
    j = 0;
    for (let i = 6; i < 9; i++) {
      this.tabc[j++] = shuffleNumbers[i];
    }

    this.lastnumer = shuffleNumbers[9];
    if (this.inCommingData) {

      if (this.inCommingData.telephone) {
        if (this.inCommingData.oper === '0057' && this.inCommingData.sousop === '0002') {
        this.inCommingData.label = 'Numéro Badge';
        } else {
          if (this.inCommingData.oper === '0029') {
          this.inCommingData.label = 'N° Compteur ';
          } else {
          this.inCommingData.label = 'Téléphone ';
          }
         }

     }
      if (this.inCommingData.montant) {
       if (this.inCommingData.frais) {
         let mttc: any =  this.inCommingData.montant.replace(/ /g, '') * 1 + this.inCommingData.frais.replace(/ /g, '') * 1;
         mttc += '';
         this.inCommingData.montant = this.number.transform(mttc);
       } else {
         this.inCommingData.montant = this.number.transform(this.inCommingData.montant);

       }
     }
    }

}
  @Input() pagetitle: String = 'Enter Pin';
  @Input() toClear = false;
  @Input() inCommingData: any = {operation: '', image: 'assets/imgs/upay.png', montant: 'RAS', telephone: 'RAS'};

  pin = '';
  numbersTabs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  taba: any = [];
  tabb: any = [];
  tabc: any = [];
  lastnumer: any;

  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {}
  ngOnChanges(changes) {
    if (changes.toClear) {
      if (changes.toClear.currentValue && changes.toClear.currentValue === true) {
      this.pin = '';
      }
    }
  }
  emitEvent() {
    this.change.emit(this.pin);
  }

  handleInput(pin: any) {
    if (pin === 'clear') {
      this.pin = this.pin.slice(0, this.pin.length - 1);
      return;
    }
    if (pin !== 'ok') {
    this.pin += pin;
    }
    if (this.pin.length > 4) {
    this.pin = this.pin.substring(0, 4);
    }
    if (this.pin.length === 4) {
      this.verificationCodePin();
      return;
    }
  }
  // verification code pin
  verificationCodePin() {

    setTimeout(() => {
      // Autre que Connexion
      if (this.glb.PIN !== '') {
        // Si code Pin saisi vaut code pin local
        if (this.pin === this.glb.PIN) {
          this.change.emit(this.pin);
        } else {
          this.serv.showToast('Code pin incorrect !');
          this.pin = '';
        }
      } else {
        this.change.emit(this.pin);
      }

    }, 500);
  }
shuffle(arra1) {
    let ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


}
