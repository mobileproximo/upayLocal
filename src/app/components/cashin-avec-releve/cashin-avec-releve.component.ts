import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { ServiceService } from 'src/app/service/service.service';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { Storage } from '@ionic/storage';
import { PopoverContactComponent } from 'src/app/popover-contact/popover-contact.component';
import { PopoverController } from '@ionic/angular';
import { Contacts } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'cashin-avec-releve',
  templateUrl: './cashin-avec-releve.component.html',
  styleUrls: ['./cashin-avec-releve.component.scss'],
})
export class CashinAvecReleveComponent implements OnInit {

  public rechargeForm: FormGroup;
  public montantrelve;
@Input('cashindata') cashindata;
dataForPin: any = {};
  phones: any[];
  displayName: any;
  showName = false;
ngOnInit() {}
  constructor(public storage: Storage, public millier: MillierPipe,
              public serv: ServiceService, public glb: GlobaleVariableService,
              public formbuilder: FormBuilder,
              public contact: Contacts,
              public popover: PopoverController) {
      this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montantrlv: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      frais: [''],
      sousop: ['']

    });
      this.glb.modeTransactionnel = false;
  }
  resetMontant() {
    this.montantrelve = 0;
    this.rechargeForm.controls.montant.setValue(0);
  }

  releveFrais() {
    this.montantrelve = 0;
    const data: any = {};
    data.recharge = {};
    data.recharge.montant = this.rechargeForm.controls.montantrlv.value;
    data.recharge.sousop = this.cashindata.sousop;
    data.recharge.oper = this.cashindata.oper;
    data.idTerm = this.glb.IDTERM;
    data.session = this.glb.IDSESS;
    this.serv.afficheloading();
    const file = data.recharge.oper === '0074' ? 'initcashoutUpay.php' : 'relevecashinwizall.php';

    this.serv.posts('recharge/' + file, data, {}).then(reponse => {
      this.serv.dismissloadin();
      const rep: any = JSON.parse(reponse.data);
      if (rep.returnCode) {
              if (rep.returnCode === '0') {
        this.montantrelve = data.recharge.montant;
        const mntttc: any = rep.mntTarif * 1 + data.recharge.montant * 1;
        this.rechargeForm.controls.montant.setValue(this.millier.transform(mntttc));
        this.rechargeForm.controls.frais.setValue(this.millier.transform(rep.mntTarif));
        if (this.cashindata.oper === '0074') {
          this.storage.get('login').then((val) => {
            if (val != null) {
              this.rechargeForm.controls.telephone.setValue(val);
            } else {
              this.serv.showError('Impossible de recuperer votre numero telephone');
            }

          });

        }

      } else { this.serv.showError(rep.errorLabel); }
      } else {
        this.serv.showError('Reponse inattendue');

      }

    }).catch(err => {
        this.serv.dismissloadin();
        if (err.status === 500) {
        this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
        } else {
        this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');
        }
      }
    );
  }

  validerCashin() {
    this.dataForPin = this.cashindata;
    this.dataForPin.telephone = this.rechargeForm.getRawValue().telephone;
    this.dataForPin.montant = this.millier.transform(this.rechargeForm.getRawValue().montant);
    this.glb.modeTransactionnel = true;
    if (this.cashindata.oper === '0057' && this.cashindata.sousop === '0002') {
    this.dataForPin.label = 'Numéro Badge';
    } else {
    this.dataForPin.label = 'Téléphone';
    }

    this.glb.ShowPin = true;
  }
  changetel() {
    this.showName = false;
    console.log('change');
    if (this.cashindata.sousop !== '0002') {
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
      this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));
      if (this.rechargeForm.controls.telephone.value.length > 9) {
        this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.substring(0, 9));
      }
    }

  }
  changemontant() {
    this.resetMontant();

    if (this.rechargeForm.controls.montant.value) {
      this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/ /g, ''));
      this.rechargeForm.controls.montant.setValue(this.rechargeForm.controls.montant.value.replace(/-/g, ''));
      this.rechargeForm.controls.montant.setValue(this.millier.transform(this.rechargeForm.controls.montant.value));

    }

  }
  focustel() {
    console.log('focus');
    if (this.cashindata.sousop !== '0002') {
      if (this.rechargeForm.controls.telephone.value) {
        this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/ /g, ''));
        this.rechargeForm.controls.telephone.setValue(this.rechargeForm.controls.telephone.value.replace(/-/g, ''));

      }
    }

  }
  blurtel() {
    console.log('blur');
    if (this.cashindata.sousop !== '0002') {
      const tel = this.rechargeForm.controls.telephone.value;
      let phone = tel.length >= 2 ? tel.substring(0, 2) + '-' : '';
      phone += tel.length > 5 ? tel.substring(2, 5) + '-' : '';
      phone += tel.length > 7 ? tel.substring(5, 7) + '-' : '';
      phone += tel.length >= 8 ? tel.substring(7, 9) : '';
      this.rechargeForm.controls.telephone.setValue(phone);
    }

  }
  eventCapture(codepin) {
    if (this.glb.modeTransactionnel) {
      this.rechargeForm.controls.oper.setValue(this.cashindata.oper);
      this.rechargeForm.controls.sousop.setValue(this.cashindata.sousop);
      const data: any = {};
      data.recharge = this.rechargeForm.getRawValue();
      data.recharge.montant = this.millier.transform(this.montantrelve);
      data.recharge.pin = codepin;
      data.image = this.cashindata.image;
      data.operation = this.cashindata.operation;
      data.operateur = this.cashindata.operateur;
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
