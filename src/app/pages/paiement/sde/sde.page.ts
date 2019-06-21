import { Component, OnInit } from '@angular/core';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { CoupurechainePipe } from 'src/app/pipes/coupurechaine.pipe';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'app-sde',
  templateUrl: './sde.page.html',
  styleUrls: ['./sde.page.scss'],
})
export class SdePage implements OnInit {

  public  dataencaissement: any = {};
  public numfacture: any;
  public  factures: any;
  public listefactures: any;
  public hastel = true;
  public total: any;
  public nombreFacture = 0;
  public facturescoches: any = [];
  public showdetails = false;
  public telephone: any;
  dataForPin: any = {};
  constructor(public formatdate: FormatdatePipe,
              public coupurechaine: CoupurechainePipe,
              public formatphone: FormatphonePipe,
              public serv: ServiceService,
              public glb: GlobaleVariableService,
              public monmillier: MillierPipe) {

              }

  ngOnInit() {
    this.glb.modeTransactionnel = false;
    this.glb.ShowPin = false;
    this.reset();
    this.glb.recu = null,
    this.glb.showRecu = false;
    this.dataencaissement.oper = '0016';
    this.dataencaissement.operateur = 'SDE';
    this.dataencaissement.encaissementfile = 'encaissement/encaissementsde.php';
    this.dataencaissement.image = this.glb.IMAGE_BASE_URL + 'Icon-28.png';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-04.png';
    this.glb.HEADERTITELE.title = 'Paiement de Factures';
    this.listefactures = [{contrat: '0', numFact: '8342820716', dateEch: '2019-12-15',
    dateEmi: '2018-10-16', devise: 'XOF', type: 'FACT', mntFact: '102120',
    frais: '1000', timbre: '1021.2', mntTotal: '104141.2', checked: false, id: 0},
   {contrat: '0', numFact: '8342820717', dateEch: '2019-12-31',
    dateEmi: '2018-11-26', devise: 'XOF', type: 'FACT', mntFact: '96500', frais: '500',
     timbre: '0', mntTotal: '97000', checked: false, id: 1},
     {contrat: '0', numFact: '8342820717', dateEch: '2019-12-31',
     dateEmi: '2018-11-26', devise: 'XOF', type: 'FACT', mntFact: '96500', frais: '500',
      timbre: '0', mntTotal: '97000', checked: false, id: 2},
      {contrat: '0', numFact: '8342820717', dateEch: '2019-12-31',
      dateEmi: '2018-11-26', devise: 'XOF', type: 'FACT', mntFact: '96500', frais: '500',
       timbre: '0', mntTotal: '97000', checked: false, id: 3}];
  }
  reset() {
    this.numfacture = '';
    this.showdetails = false;
    this.listefactures = this.facturescoches = []; this.hastel = true;
    this.nombreFacture = 0;
    this.telephone = '';
    this.total = 0;

}
vider() {
  this.showdetails = false;
  this.listefactures = this.facturescoches = []; this.hastel = true;
  this.nombreFacture = 0;
  this.telephone = '';
  this.total = 0;
}
  releve() {
    this.vider();
    const parametre: any = {};
    parametre.numpolice = this.numfacture;
    parametre.idTerm = this.glb.IDTERM;
    parametre.session = this.glb.IDSESS;
    parametre.oper = this.dataencaissement.oper;

    this.serv.afficheloading();
    this.serv.posts('encaissement/releve.php', parametre, {}).then(data => {
      const reponse = JSON.parse(data.data);
     // alert(JSON.stringify(reponse));
      this.serv.dismissloadin();
      if (reponse !== false) {
        if (reponse.returnCode === '0') {
          this.showdetails = true;
          this.nombreFacture = 0;
          if (reponse.Factures.Facture.length) {
            console.log('taillle possible');
            this.factures = reponse;
            this.factures.nomClient = reponse.NomClient;
            this.factures.numfacture = this.numfacture = reponse.IdClient;

            /*La aussi j'ai remarqué lorqu'il n'ya pas de date d'echeance et que j valide l'operation le serveur se plante c'est pour cela
             que je mets un champs text vide dans ce cas
             * */
            for (let i = 0; i < this.factures.Factures.Facture.length; i++) {
              this.factures.Factures.Facture[i].checked = false;
              // si la date d'echeance n'est pas definie
              if (typeof(this.factures.Factures.Facture[i].dateEch) === 'object') {
                this.factures.Factures.Facture[i].dateEch = '';
              }
              //  console.log(typeof(this.factures.Factures.Facture[i].dateEch));
              this.factures.Factures.Facture[i].id = i;

            }
          } else {
            this.factures = {};
            this.factures.NomClient = this.glb.PRENOM + ' ' + this.glb.NOM;
            this.factures.IdClient = this.numfacture = reponse.IdClient;
            this.factures.NomOper = reponse.NomOper;
            this.factures.errorCode = reponse.errorCode;
            this.factures.errorLabel = reponse.errorLabel;
            this.factures.nbrFact = reponse.nbrFact;
            this.factures.returnCode = reponse.returnCode;
            this.factures.Factures = {};


            // c'est le tableau qui va contenir ma facture
            this.factures.Factures.Facture = [];
            this.factures.Factures.Facture.push(reponse.Factures.Facture);
            this.factures.Factures.Facture[0].checked = false;
            this.factures.Factures.Facture[0].id = 0;
            console.log('une seule facture', this.factures);
          }
          this.listefactures = this.factures.Factures.Facture;
          // Pour le cas de sde on recupere le numero de telephone
        //  alert(JSON.stringify(this.listefactures))

          if (typeof (this.listefactures[0].telclient) !== 'object') {
              this.telephone = this.listefactures[0].telclient;
              this.hastel = true;

            } else { this.hastel = false; }

        } else { this.serv.showError(reponse.errorLabel); }
      } else {   this.serv.showError('Pas de facture correspondant'); }


    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');

    });
  }
/*   handlechecking(id: number) {
    this.total = 0;
    this.listefactures[id].checked = !this.listefactures[id].checked;
    if (this.listefactures[id].checked) {
      if (this.nombreFacture === 3) {
        this.serv.showError('Désolé, Vous ne pouvez pas payez plus 3 factures');
        setTimeout(() => {
          this.listefactures[id].checked = false;
        }, 100);
      } else {
        this.nombreFacture++;
        this.facturescoches.push(this.listefactures[id]);

      }
    } else {
      this.nombreFacture--;
      let j = 0;
      while (this.facturescoches[j].id != id && j < this.facturescoches.length) {
        j++;
      }
      this.facturescoches.splice(j, 1);

    }
    for (let i = 0; i < this.listefactures.length; i++) {
      if (this.listefactures[i].checked) {
        this.total = this.total * 1 + this.listefactures[i].mntFact * 1;
      }
    }
    this.total = this.monmillier.transform(this.total);

  } */
  handlechecking(id: number) {
    if (!this.listefactures[id].checked) {

        if (this.nombreFacture === 3) {
          this.serv.showError('Désolé, Vous ne pouvez pas payez plus de 3 factures');
          console.log('id vaut ' + id);
          this.listefactures[id].checked = false;
          setTimeout(() => {
            this.listefactures[id].checked = false;
          }, 100);

        } else {
          console.log('incremente ' );

          this.nombreFacture++;
          this.facturescoches.push(this.listefactures[id]);

        }
      } else {
        console.log('ligne ' + id * 1 + 1 + ' est decochée');

        this.nombreFacture--;
        console.log('decremente ' );

        let j = 0;
        while (this.facturescoches[j].id !== id && j < this.facturescoches.length) {
          j++;
        }
        this.facturescoches.splice(j, 1);

      }
    console.log('nb coche ' + this.nombreFacture);
    if (this.facturescoches.length > 0) {
      this.total = 0;
      for (let i = 0; i < this.facturescoches.length; i++) {
      console.log('facture ' + JSON.stringify(this.facturescoches[i].mntFact));
      this.total = this.total * 1 + this.facturescoches[i].mntFact * 1;

      }
    } else { this.total = 0; }

    this.total = this.monmillier.transform(this.total);

  }
  change() {
    console.log('tester');

  }

  eventCapture(codePin) {
    if (this.glb.modeTransactionnel) {
      const parametre: any = {};
      parametre.infoclient = {};
      parametre.infoclient.nom = this.factures.NomClient;
      parametre.infoclient.idclient = this.factures.IdClient;
      parametre.infoclient.telclient = this.telephone ;
      parametre.image = this.dataencaissement.image;
      parametre.oper = this.dataencaissement.oper;
      parametre.recharge = {};
      parametre.operation = 'Encaissement SDE';
      parametre.recharge.montant = this.total;
      parametre.recharge.frais = '500';
      parametre.factures = this.facturescoches;
      parametre.nbrfact = this.nombreFacture;
      parametre.mnttotal = this.total.replace(/ /g, '');
      parametre.infoclient.pin = codePin;
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
    //  alert('sde ' + JSON.stringify(parametre));
      this.serv.afficheloading();
      this.serv.posts(this.dataencaissement.encaissementfile, parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse: any = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        this.vider();
        this.glb.ShowPin = false;
        this.glb.recu = reponse;
        if (!reponse.Factures.Facture.length) {
          this.glb.recu = {};
          this.glb.recu.Oper = this.dataencaissement.operateur;
          this.glb.recu.dtTrx = reponse.dtTrx;
          this.glb.recu.NomClient = reponse.NomClient;
          this.glb.recu.IdClient = reponse.IdClient;
          this.glb.recu.telClient = parametre.infoclient.telclient;
          this.glb.recu.nbrFact = reponse.nbrFact;
          this.glb.recu.mntTotal = reponse.mntTotal;
          this.glb.recu.mntFrais = reponse.mntFrais;
          this.glb.recu.mntTbr = reponse.mntTbr;
          this.glb.recu.mntPlfap = reponse.mntPlfap;
          this.glb.recu.mntFact = reponse.mntFact;
          this.glb.recu.Factures = {};
          this.glb.recu.Factures.Facture = [];
          this.glb.recu.Factures.Facture.push(reponse.Factures.Facture);

        }
        this.glb.recu.numTrx = reponse.numTrx;
        this.glb.recu.dtTrx = this.formatdate.transform(reponse.dtTrx);
        this.glb.recu.NomClient = this.coupurechaine.transform(reponse.NomClient);
        this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
        this.glb.recu.agence = this.glb.HEADER.agence;
        this.glb.showRecu = true;
        this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.numfacture = '';
        this.glb.recu.Oper = this.dataencaissement.operateur;
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

  validerEncaissement() {
    if (!this.telephone || this.serv.verificationnumero(this.telephone)) {
      this.serv.showError('Veuillez bien renseigner le numéro de téléphone du client');
      return false;
    }
    this.dataForPin.operation = 'Encaissement SDE';
    this.dataForPin.montant = this.total;
    this.glb.modeTransactionnel = true;
    this.glb.ShowPin = true;

  }

}
