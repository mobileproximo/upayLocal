import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var SMS: any;
@Component({
  selector: 'app-transfert-unite-valeur',
  templateUrl: './transfert-unite-valeur.page.html',
  styleUrls: ['./transfert-unite-valeur.page.scss'],
})
export class TransfertUniteValeurPage implements OnInit {
  service: string;
  public datacashin: any = {};
  public montantrelve;
  dataForPin: any = {};
  public rechargeForm: FormGroup;
  constructor(public glb: GlobaleVariableService, public serv: ServiceService, public formbuilder: FormBuilder,
              public millier: MillierPipe,  private callNumber: CallNumber) {
    this.rechargeForm = this.formbuilder.group({
      telephone: ['', Validators.required],
      montantrlv: ['', Validators.required],
      montant: ['', Validators.required],
      oper: [''],
      frais: [''],
      sousop: ['']
   });
  }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Transfert Inter Wallet';
    this.glb.showRecu = false;
    this.glb.ShowPin = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'upay.jpg';
    this.datacashin.oper  = '0074';
    this.datacashin.operation = 'Cashout UPay';
    this.datacashin.operateur  = 'TIW';
    this.rechargeForm.controls.telephone.setValue(this.glb.PHONE);
    this.onCommingSms();
  }
  onWalletChange() {
    if (this.service !== '0005') {
    this.serv.showAlert('Service en cours developpement');
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
  resetMontant() {
    this.montantrelve = 0;
    this.rechargeForm.controls.montant.setValue(0);
  }
  initier() {
    if (!this.service || this.service === '') {
      this.serv.showError('Selectionner un wallet');
    }
    else{
      if (this.service !== '0005') {
        this.serv.showAlert('Service en cours developpement');
      } else {
      this.dataForPin.telephone = this.rechargeForm.getRawValue().telephone;
      this.dataForPin.montant = this.rechargeForm.controls.montantrlv.value;
      this.dataForPin.operation = 'Transfert Inter Wallet';
      this.glb.modeTransactionnel = true;
      this.dataForPin.label = 'Téléphone';
      this.glb.ShowPin = true;
    }
    }

    }

  // eventCapture
  eventCapture(codepin) {
    if (this.glb.modeTransactionnel) {
  if (this.service !== '0005') {
    this.serv.showAlert('Service en cours developpement');
  } else {
  const transfert = {montant: this.rechargeForm.controls.montantrlv.value, telSource: this.glb.PHONE, opersource: this.service};
  const params =  {
    transfert,
    idTerm: this.glb.IDTERM,
    session: this.glb.IDSESS
  };
  const data: any = {};
  data.idTerm = this.glb.IDTERM;
  data.session = this.glb.IDSESS;

  this.serv.posts('recharge/initcashoutoper.php', params, {}).then(data => {
    const reponse = JSON.parse(data.data);

    if (reponse.returnCode === '0') {
      alert('initié' + JSON.stringify(reponse) );
  } 
  //dismisslogin
  else {
    this.serv.showError(reponse.errorLabel);
  }
}
  ).catch(err => {
     //dismisslogin
    this.serv.showError('INIT Impossible d\'atteindre le serveur ');
  });
}
  }
    this.glb.ShowPin = false;
  }

  onCommingSms() {
    if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
      document.addEventListener('deviceready', () => {

        if (!SMS ) { alert( 'SMS plugin not ready' ); return; } else {
          SMS.startWatch(() => {

          }, () => {
            this.serv.showError('Impossible de lire L\'SMS de UPay');
          });

        }


      }, false);
    } else {
      alert('need run on mobile device for full functionalities.');
    }
    document.addEventListener('onSMSArrive', (e: any) => {

      const sms: any = e.data;
      const expediteur = sms.address.toUpperCase();
      const message = sms.body;
      alert('Message ' + JSON.stringify(message));
      if (expediteur === 'ORANGEMONEY') {

        if (message.substr(0, 30) === 'Vous allez faire un retrait de') {
          // alert("vous avez reçu un sms de confirmation entrez votre code secret");
          setTimeout(() => {
            this.callNumber.callNumber('#144#', true)
            .then(res => {})
            .catch(err => {
               //dismisslogin
            });
          }, 200);

        }
        if (message.substr(0, 16) === 'Vous avez retire') {
          setTimeout(() => {
              this.cashinUPay();
          }, 200);
        }
      }



    });
  }
  cashinUPay() {
    const parametres: any = {};
    parametres.recharge = {};
    parametres.recharge.montant   = this.rechargeForm.controls.montantrlv.value.replace(/ /g, '');
    parametres.recharge.telephone = this.glb.PIN; // datarecharge.recharge.telephone.replace(/-/g, '');
   // parametres.recharge.telephone = parametres.recharge.telephone.replace(/ /g, '');
    if (parametres.recharge.frais) {
      parametres.recharge.frais = parametres.recharge.frais.replace(/ /g, '');
    }
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    this.serv.posts('recharge/cashinUpay.php', parametres, {}).then(data => {
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        alert('cashin UPAY' + JSON.stringify(reponse) );
    } else {
      this.serv.showError(reponse.errorLabel);
    }
  }
    ).catch(err => {
      this.serv.showError('INIT Impossible d\'atteindre le serveur ');
    });
  }

}
