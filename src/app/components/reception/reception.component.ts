import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';
import { FormatcodePipe } from 'src/app/pipes/formatcode.pipe';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  public showdetails = false;
  public cashoutForm: FormGroup;
  public dataForPin: any = {};

// tslint:disable-next-line: no-input-rename
  @Input('datareception') datareception;

  constructor(public formdate: FormatdatePipe,
              public formatcode: FormatcodePipe,
              public phoneformat: FormatphonePipe,
              public monmillier: MillierPipe,
              public glb: GlobaleVariableService,
              public serv: ServiceService,
              public formbuilder: FormBuilder) {
    this.cashoutForm = formbuilder.group({
      codTrans: ['', Validators.required],
      prenomExp: ['', Validators.required],
      nomExp: ['', Validators.required],
      telExp: ['', Validators.required],
      adrsExp: ['', Validators.required],
      prenomBen: ['', Validators.required],
      nomBen: ['', Validators.required],
      numBen: [''],
      numExp: [''],
      telBen: ['', Validators.required],
      adrsBen: ['', Validators.required],
      typIdBen: ['', Validators.required],
      idBen: ['', Validators.required],
      mntPaie: ['', Validators.required],

    });
    this.glb.modeTransactionnel = false;
  }

  ngOnInit() {}
  reset() {
    this.showdetails = false;
  }
  vider() {
    this.showdetails = false;
    this.cashoutForm.reset();
  }
  releve() {

    this.showdetails = false;
    const parametre: any = {};
    parametre.oper = this.datareception.oper;
    parametre.codetransfert = this.cashoutForm.controls.codTrans.value;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    this.serv.afficheloading();
    this.serv.posts('transfert/releveRecepCash.php', parametre, {}).then(data => {
    this.serv.dismissloadin();
    const reponse = JSON.parse(data.data);
  //  alert(JSON.stringify(reponse))
    if (reponse.returnCode) {
    if (reponse.returnCode === '0') {
      this.showdetails = true;
      this.cashoutForm.controls.prenomExp.setValue(reponse.prenomExp);
      this.cashoutForm.controls.nomExp.setValue(reponse.nomExp);
      this.cashoutForm.controls.telExp.setValue(reponse.telExp);
      this.cashoutForm.controls.adrsExp.setValue(reponse.adrsExp);
      this.cashoutForm.controls.prenomBen.setValue(reponse.prenomBen);
      this.cashoutForm.controls.nomBen.setValue(reponse.nomBen);
      this.cashoutForm.controls.adrsBen.setValue(reponse.adrsBen);
      this.cashoutForm.controls.telBen.setValue(reponse.telBen);
      if (this.datareception.oper === '0052') {
        this.cashoutForm.controls.numExp.setValue(reponse.numExp);
        this.cashoutForm.controls.numBen.setValue(reponse.numBen);
      }
      this.cashoutForm.controls.typIdBen.setValue('1');
      this.cashoutForm.controls.idBen.setValue('');
      this.cashoutForm.controls.mntPaie.setValue(this.monmillier.transform(reponse.mntPaie));
      if (typeof(reponse.codTrans) === 'object' ) {
        this.cashoutForm.controls.codTrans.setValue(parametre.codetransfert);

      }
      if (typeof(reponse.adrsBen) === 'object' ) {
        this.cashoutForm.controls.adrsBen.setValue('');
      }

    } else { this.serv.showError(reponse.errorLabel); }
    }
    else{
      this.serv.showError('Réponse inattendue ');
    }

  }).catch(err => {
    this.serv.dismissloadin();
    if (err.status === 500) {
      this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
      } else {
      this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');
      }    }
  );

    this.reset();
   // this.showdetails = !this.showdetails
 }
 validerReception() {
  this.dataForPin  = this.cashoutForm.getRawValue();
  this.dataForPin.operation  = 'Reception ' + this.datareception.operateur;
  this.dataForPin.montant  = this.dataForPin.mntPaie;
  this.glb.ShowPin = true;
  this.glb.modeTransactionnel = true;
 }

 eventCapture(codePin: any) {
  if (this.glb.modeTransactionnel) {
    const parametre: any = {};
    parametre.datarecep = this.cashoutForm.getRawValue();
    parametre.image = this.datareception.image;
    parametre.operation = 'Reception';
    parametre.operateur = this.datareception.operateur;
    parametre.recharge = {};
    parametre.recharge.montant = parametre.datarecep.mntPaie;
    parametre.session = this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.datarecep.pin = codePin;
    parametre.oper = this.datareception.oper;

    this.serv.afficheloading();
    this.serv.posts('transfert/ReceptionCash.php', parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode) {
      if (reponse.returnCode === '0') {
        this.glb.recu = reponse;
        this.glb.recu.operation = 'RECEPTION';
        this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
        this.glb.recu.agence = this.glb.HEADER.agence;
        this.glb.recu.dtTrx = this.formdate.transform(this.glb.recu.dtTrx);
        this.glb.recu.codTrans = this.formatcode.transform(this.glb.recu.codTrans, 3, ' ');
        this.glb.recu.operateur = this.datareception.operateur;
        this.glb.showRecu = true;

      } else { this.serv.showError(reponse.errorLabel) }
      }else{
        this.serv.showError('Reponse inattendue');

      }


    }).catch(err => {
      this.serv.dismissloadin();
      if (err.status === 500) {
        this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
        } else {
        this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');
        }     });

  }
  this.glb.ShowPin = false;
}
}
