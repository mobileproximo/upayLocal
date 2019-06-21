import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormatcodePipe } from 'src/app/pipes/formatcode.pipe';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { NavController } from '@ionic/angular';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.page.html',
  styleUrls: ['./woyofal.page.scss'],
})
export class WoyofalPage implements OnInit {
  private clientForm: FormGroup;
  private showdetails = false;
  private newclient = false;
  private client: any = {};
  dataForPin: any = {};
  constructor(public formatagechaine: FormatcodePipe,
              public phoneformat: FormatphonePipe,
              public dateformat: FormatdatePipe, public formBuilder: FormBuilder,
              public serv: ServiceService,
              public monmillier: MillierPipe, public navCtrl: NavController,
              public glb: GlobaleVariableService) {
    this.clientForm = this.formBuilder.group({
      numcompteur: ['', Validators.required],
      NomClient: ['', Validators.required],
      telClient: ['', Validators.required],
      IdClient: ['', Validators.required],
      mnttotal: ['', Validators.required],
      adrsClient: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.showdetails = this.newclient = false;
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-04.png';
    this.glb.HEADERTITELE.title = 'Paiement de Factures';
    this.glb.modeTransactionnel = false;

  }
  releve() {
    this.showdetails = this.newclient = false;
    const parametre: any = {};
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.oper = '0029';
    parametre.numpolice = this.clientForm.controls.numcompteur.value;
    this.clientForm.reset();
    this.clientForm.controls.numcompteur.setValue(parametre.numpolice);
    this.serv.afficheloading();
    this.serv.posts('encaissement/releve.php', parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse: any = JSON.parse(data.data);
      // alert(JSON.stringify(reponse));
      if (reponse.returnCode === '0') {
        this.showdetails = true;
        this.client = reponse;
        this.clientForm.controls.NomClient.setValue(reponse.NomClient);
        this.clientForm.controls.telClient.setValue(reponse.telClient);
        this.clientForm.controls.IdClient.setValue(reponse.IdClient);
        this.clientForm.controls.numcompteur.setValue(reponse.IdClient);
        this.clientForm.controls.adrsClient.setValue(reponse.adrsClient);
        this.client.telClient = this.phoneformat.transform(reponse.telClient);
        this.newclient = false;

      } else {
        if (reponse.errorLabel === 'Nom Client inconnu') {
          this.clientForm.controls.IdClient.setValue(parametre.numpolice);

          this.showdetails = this.newclient = true;

        } else { this.serv.showError(reponse.errorLabel); }
      }


    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');
    });
  }
  vider() {
    this.showdetails = false;
  }
  reset() {
    this.clientForm.reset();

  }
  changetel() {
    console.log('change');
    this.clientForm.controls.telClient.setValue(this.clientForm.controls.telClient.value.replace(/ /g, ''));
    this.clientForm.controls.telClient.setValue(this.clientForm.controls.telClient.value.replace(/-/g, ''));
    if (this.clientForm.controls.telClient.value.length > 9) {
      this.clientForm.controls.telClient.setValue(this.clientForm.controls.telClient.value.substring(0, 9));
    }
  }
  changemontant() {

    if (this.clientForm.controls.mnttotal.value) {
      this.clientForm.controls.mnttotal.setValue(this.clientForm.controls.mnttotal.value.replace(/ /g, ''));
      this.clientForm.controls.mnttotal.setValue(this.clientForm.controls.mnttotal.value.replace(/-/g, ''));
      this.clientForm.controls.mnttotal.setValue(this.monmillier.transform(this.clientForm.controls.mnttotal.value));

    }

  }
  focustel() {
    console.log('focus');
    if (this.clientForm.controls.telClient.value) {
      this.clientForm.controls.telClient.setValue(this.clientForm.controls.telClient.value.replace(/ /g, ''));
      this.clientForm.controls.telClient.setValue(this.clientForm.controls.telClient.value.replace(/-/g, ''));

    }
  }
  blurtel() {

    this.clientForm.controls.telClient.setValue(this.phoneformat.transform(this.clientForm.controls.telClient.value));

  }
  encaisser() {
    this.dataForPin.operation = 'Recharge Woyofal';
    this.dataForPin.telephone = this.clientForm.getRawValue().IdClient;
    this.dataForPin.montant = this.clientForm.getRawValue().mnttotal;
    this.dataForPin.operation = 'Recharge Woyofal';
    this.dataForPin.label = 'N° Compteur';
    this.glb.modeTransactionnel = true;
    this.glb.ShowPin = true;
  }
  eventCapture(codepin) {
    if (this.glb.modeTransactionnel) {
      if (this.newclient && this.serv.verificationnumero(this.clientForm.controls.telClient.value)) {
      this.serv.showError('Veuillez bien renseigner le numéro de téléphone du client');
      return false;
    }
      const parametre: any = {};
      parametre.factures = this.clientForm.getRawValue();
      parametre.image = this.glb.IMAGE_BASE_URL + 'Icon-23.png';
      parametre.recharge = {};
      parametre.recharge.telephone = parametre.factures.IdClient;
      parametre.recharge.montant = parametre.factures.mnttotal;
      parametre.recharge.oper = '0029';
      parametre.operation = 'Recharge WOYOFAL';
      parametre.newclient = this.newclient ? 'nouveau' : '';

      parametre.factures.pin = codepin;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      this.serv.afficheloading();
      this.serv.posts('encaissement/encaissementwoyofal.php', parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      // alert(JSON.stringify(reponse))
      if (reponse.returnCode === '0') {
        this.vider();
        this.glb.recu = reponse;
        this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
        this.glb.recu.agence = this.glb.HEADER.agence;
        this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.glb.recu.dtTrx = this.dateformat.transform(reponse.dtTrx);
        this.glb.recu.numTrx = reponse.numTrx;
        this.glb.recu.Token2 = typeof (reponse.Token3) !== 'object' ? this.formatagechaine.transform(reponse.Token2, 5, '-') : '';
        this.glb.recu.Token3 = typeof (reponse.Token3) !== 'object' ? this.formatagechaine.transform(reponse.Token3, 5, '-') : '';
        this.glb.recu.Token1 = this.formatagechaine.transform(reponse.Token1, 5, '-');
        this.glb.recu.mntFrais = this.monmillier.transform(reponse.mntFrais);
        this.glb.recu.mntFact = this.monmillier.transform(reponse.mntFact);
        this.glb.recu.mntTotal = this.monmillier.transform(reponse.mntTotal);
        this.clientForm.reset();
        this.glb.showRecu = true;
      } else {
        this.serv.showError(reponse.errorLabel);
      }
    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');
    });


    }
    this.glb.ShowPin = false;
  }

}
