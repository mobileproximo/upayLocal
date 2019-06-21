import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';
import { FormatcodePipe } from 'src/app/pipes/formatcode.pipe';

@Component({
  selector: 'envoi',
  templateUrl: './envoi.component.html',
  styleUrls: ['./envoi.component.scss'],
})
export class EnvoiComponent implements OnInit {
  @Input() dataenvoi;
  private envoiForm: FormGroup;
  dataForPin: any = {};
  showdetails = false;
  constructor(
              public formdate:FormatdatePipe,
              public formatcode:FormatcodePipe,
              public monmillier: MillierPipe,
              public envServ: ServiceService,
              public formBuilder: FormBuilder,
              public glb: GlobaleVariableService) {
                this.envoiForm = formBuilder.group({
                  montant: ['', Validators.required],
                  mntTarif: ['', Validators.required],
                  montantTTC: ['', Validators.required],
                  prenomExp: ['', Validators.required],
                  nomExp: ['', Validators.required],
                  adrsExp: ['', Validators.required],
                  telExp: ['', Validators.required],
                  typIdExp: ['', Validators.required],
                  idExp: ['', Validators.required],
                  prenomBen: ['', Validators.required],
                  nomBen: ['', Validators.required],
                  telBen: ['', Validators.required],
                  indicatif: [''],
                  idville: ['', Validators.required]
                });
               }

  ngOnInit() {
    this.glb.modeTransactionnel = false;
    console.log(this.dataenvoi.oper);
    if (this.dataenvoi.oper === '0052') {
    this.envoiForm.controls.idville.setValue(1);
    }
    this.envoiForm.controls.prenomExp.setValue(this.glb.PRENOM);
    this.envoiForm.controls.nomExp.setValue(this.glb.NOM);
    this.envoiForm.controls.telExp.setValue(this.glb.PHONE);
    if (this.dataenvoi.oper === '0007') {
      this.envoiForm.controls.idville.setValue(this.dataenvoi.idlieu);
    }

  }
  changemontant() {
    this.envoiForm.controls['montantTTC'].setValue('');
    if (this.envoiForm.controls['montant'].value) {
      this.envoiForm.controls['montant'].setValue(this.envoiForm.controls['montant'].value.replace(/ /g, ''));
      this.envoiForm.controls['montant'].setValue(this.envoiForm.controls['montant'].value.replace(/-/g, ''));
      this.envoiForm.controls['montant'].setValue(this.monmillier.transform(this.envoiForm.controls['montant'].value));
    }
  }
  reinitialiser() {
    this.envoiForm.reset();
    this.envoiForm.controls['idville'].setValue(1);
    this.envoiForm.controls['prenomExp'].setValue(this.glb.PRENOM);
    this.envoiForm.controls['nomExp'].setValue(this.glb.NOM);
    this.envoiForm.controls['telExp'].setValue(this.glb.PHONE);
    this.showdetails = false;

  }
  getIndicatif(pays) {
    const indicatif = pays.callingCodes[0];
    console.log(JSON.stringify(indicatif));
    this.envoiForm.controls['indicatif'].setValue(indicatif);

  }
  calculerFrais() {
    this.showdetails = false;
    this.envoiForm.controls['mntTarif'].setValue('');
    this.envoiForm.controls['montantTTC'].setValue('');
    const parametre : any = {};
    parametre.oper = this.dataenvoi.oper;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.montant = this.envoiForm.controls['montant'].value.replace(/ /g, '');
    parametre.lieu = this.envoiForm.controls['idville'].value;
    this.envServ.afficheloading();
    this.envServ.posts('transfert/calculfrais.php', parametre, {}).then(data => {
      this.envServ.dismissloadin();
      const reponse : any = JSON.parse(data.data);
      if (reponse.returnCode == '0') {
        this.showdetails = true;
        this.envoiForm.controls['montant'].setValue(this.monmillier.transform(parametre.montant));
        this.envoiForm.controls['mntTarif'].setValue(this.monmillier.transform(reponse.mntTarif));
        let mttc : any = reponse.mntTarif * 1 + parametre.montant * 1;
        mttc += '';
        this.envoiForm.controls['montantTTC'].setValue(this.monmillier.transform(mttc));
      } else this.envServ.showError(reponse.errorLabel);

    }).catch(err => {
      this.envServ.dismissloadin();
      this.envServ.showError('Impossible d\'atteindre le serveur');

    });

  }
  eventCapture(codePin) {
    if (this.glb.modeTransactionnel) {
      const parametres: any = {};
      parametres.image = this.dataenvoi.image;
      parametres.oper = this.dataenvoi.oper;
      parametres.recharge = {};
      parametres.recharge.montant = this.envoiForm.controls['montantTTC'].value;
      parametres.operation = 'Envoi';
      parametres.denv = this.envoiForm.getRawValue();
      parametres.session = this.glb.IDSESS;
      parametres.idTerm = this.glb.IDTERM;
      parametres.denv.pin = codePin;
      this.envServ.afficheloading();
      this.envServ.posts('transfert/envoicash.php', parametres, {}).then(data => {
        this.envServ.dismissloadin();
        const reponse: any = JSON.parse(data.data);
        if (reponse.returnCode === '0') {
          this.glb.recu = reponse;
          this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
          this.glb.dateUpdate = this.envServ.getCurrentDate();
          this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
          this.glb.recu.agence = this.glb.HEADER.agence;
          this.glb.recu.dtTrx = this.formdate.transform(this.glb.recu.dtTrx);
          this.glb.recu.codTrans = this.formatcode.transform(this.glb.recu.codTrans, 3, ' ');
          this.glb.recu.operateur = this.dataenvoi.operateur;
          this.glb.recu.operation = 'ENVOI';
          this.glb.showRecu = true;

        } else {
          this.envServ.showError(reponse.errorLabel);
        }

      }).catch(err => {
        this.envServ.dismissloadin();
        this.envServ.showError('impossible d\'atteindre le serveur');
      });

    }
    this.glb.ShowPin = false;
  }
  validerEnvoi() {
    this.glb.modeTransactionnel = true;
    this.dataForPin = this.envoiForm.getRawValue();
    this.dataForPin.montant = this.dataForPin.montantTTC;
    this.dataForPin.operation = 'Envoi ' + this.dataenvoi.operateur;
    this.glb.ShowPin = true;
  }

}
