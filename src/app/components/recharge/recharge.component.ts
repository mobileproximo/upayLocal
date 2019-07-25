import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';
import { Contacts } from '@ionic-native/contacts/ngx';
import { PopoverContactComponent } from 'src/app/popover-contact/popover-contact.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {

  public rechargeForm: FormGroup;
  @Input() datarecharge: any = {};
  label: string;
  dataForPin: any = {};
  phones: any;
  displayName: any;
  showName = false;
  ngOnInit() {}


  constructor( public formatphone: FormatphonePipe,
               public millier: MillierPipe, public formbuilder: FormBuilder,
               public serv: ServiceService, public glb: GlobaleVariableService,
               public contacts: Contacts,
               public popover: PopoverController,
               public contact: Contacts) {
    this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      pin: [''],

    });
    this.glb.modeTransactionnel = false;
  }
  changetel() {
    this.showName = false;
    console.log('change');
    this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
    this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));
    if (this.rechargeForm.controls.telephone.value.length > 9) {
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.substring(0, 9));
    }
  }
  changemontant() {

      if (this.rechargeForm.controls.montant.value) {
        this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/ /g, ''));
        this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/-/g, ''));
        this.rechargeForm.controls.montant.setValue(this.millier.transform(this.rechargeForm.controls.montant.value));

      }

  }
  focustel() {
    console.log('focus');
    if (this.rechargeForm.controls.telephone.value) {
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));

    }
  }
  blurtel() {

   this.rechargeForm.controls.telephone.setValue(this.formatphone.transform(this.rechargeForm.controls.telephone.value));

  }
  recharger() {
      this.rechargeForm.controls.oper.setValue(this.datarecharge.oper);
      this.dataForPin = this.datarecharge;
      this.dataForPin.telephone = this.rechargeForm.getRawValue().telephone;
      this.dataForPin.montant = this.rechargeForm.getRawValue().montant;
      this.dataForPin.label = 'Téléphone';
      this.glb.modeTransactionnel = true;
      this.glb.ShowPin = true;

  }
  eventCapture(codePin: any) {
    if (this.glb.modeTransactionnel) {
      const data: any = {};
      data.recharge = this.rechargeForm.getRawValue();
      data.image = this.datarecharge.image;
      data.operation = this.datarecharge.operation;
      data.operateur = this.datarecharge.operateur;
      data.recharge.pin = codePin;
      this.serv.recharger(data);
    }
    this.glb.ShowPin = false;
  }
  listecontacts() {
    this.showName = false;
    this.contact.pickContact().then(numbers => {
      this.displayName  = numbers.displayName;
     // alert(JSON.stringify(numbers));
      const nombre = numbers.phoneNumbers.length;
      // le contact a plusieurs numero
      if (nombre > 1) {

        this.phones = [];
        for (const telephone of numbers.phoneNumbers) {
          this.phones.push(telephone.value);
        }
        this.showContacsNumbers();
      } else {
        const value = this.getphone(numbers.phoneNumbers[0].value);
        this.setTelephoneFromselection(value);
      }
    }).catch(err => {
    //  alert("erreur " + JSON.stringify(err));
    });
  }
  // Afiicher les numeros du contact si plusieurs
async  showContacsNumbers() {
  const popover = await this.popover.create({
    component: PopoverContactComponent,
    componentProps: {phones: this.phones},
    translucent: true
  });
  popover.onDidDismiss().then((dataReturned) => {
    if (dataReturned.data) {
      const value = this.getphone(dataReturned.data);
      this.setTelephoneFromselection(value);
    }
  });
  return await popover.present();
}

setTelephoneFromselection(value) {
  this.showName = false;
  if (value === '') {
    this.serv.showToast('Numéro de téléphone incorrect!');
  } else {
    this.showName = true;
    this.rechargeForm.controls.telephone.setValue(value);
  }
}
getphone(selectedPhone) {
  let tel = selectedPhone.replace(/ /g, '');
  if (isNaN(tel * 1)) {
    console.log('Not a number');
    return '';
  }
  tel = tel * 1 + '';
  if (tel.substring(0, 3) === '221') {
    tel = tel.substring(3, tel.length);
  }
  const  numeroautorisé = ['77', '78', '70', '76'];
  const retour = numeroautorisé.indexOf(tel.substring(0, 2));
  if (retour === -1) {
    console.log('Not a in array');

    return '';
  }
  tel =  tel.replace(/ /g, '');
  tel = tel.replace(/-/g, '');
  let  phone = tel.length >= 2 ? tel.substring(0, 2) + '-' : '';
  phone += tel.length > 5 ? tel.substring(2, 5) + '-' : '';
  phone += tel.length > 7 ? tel.substring(5, 7) + '-' : '';
  phone += tel.length >= 8 ? tel.substring(7, 9) : '';
  if (phone.length !== 12) {
    console.log('Not a 12');

    return '';
  }
  return phone;
}
}
