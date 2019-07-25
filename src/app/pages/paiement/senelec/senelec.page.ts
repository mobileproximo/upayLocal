import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { ServiceService } from 'src/app/service/service.service';
import { NavController } from '@ionic/angular';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormatdatePipe } from 'src/app/pipes/formatdate.pipe';

@Component({
  selector: 'app-senelec',
  templateUrl: './senelec.page.html',
  styleUrls: ['./senelec.page.scss'],
})
export class SenelecPage implements OnInit {
  public infosClient: FormGroup;
  public dataencaissement: any = {};
  public numfacture;
  public  factures: any;
  public listefactures: any;
  public hastel = true;
  public total: any;
  public nombreFacture = 0;
  public facturescoches: any = [];
  public showdetails = false;
  public telephone;
  public newclient = false;
  dataForPin: any = {};
  constructor(public formbuilder: FormBuilder,
              public monmillier: MillierPipe,
              public serv: ServiceService,
              public navCtrl: NavController,
              public glb: GlobaleVariableService,
              public dateFormat: FormatdatePipe) {
                this.infosClient = this.formbuilder.group({
                  numfacture: ['', Validators.required],
                  prenomClient: ['', Validators.required],
                  nomClient: ['', Validators.required],
                  telephone: ['', Validators.required],
                  adresse: ['', Validators.required]
                });

               }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.recu = null,
    this.glb.showRecu = false;
    this.dataencaissement.oper = '0027';
    this.dataencaissement.image = this.glb.IMAGE_BASE_URL + 'Petite-Icon-24.png';
    this.dataencaissement.encaissementfile = 'encaissement/encaissementsenelec.php';
    this.dataencaissement.typereleve = 'Police';
    this.dataencaissement.operateur = 'SENELEC';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-04.png';
    this.glb.HEADERTITELE.title = 'Paiement de Factures';
    this.glb.modeTransactionnel = false;

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
    this.total = 0;
  }
    releve() {
      this.vider();
      this.infosClient.reset();
      this.newclient = false;
      const parametre: any = {};
      parametre.numpolice = this.numfacture;
      this.infosClient.controls.numfacture.setValue(parametre.numpolice);
      parametre.idTerm = this.glb.IDTERM;
      parametre.session = this.glb.IDSESS;
      parametre.oper = this.dataencaissement.oper;
      this.serv.afficheloading();
      this.serv.posts('encaissement/releve.php', parametre, {}).then(data => {
        const reponse = JSON.parse(data.data);
        // alert("ReleveFacture "+JSON.stringify(reponse));
        // this.serv.dismissloadin();
        if (reponse !== false) {
          if (reponse.returnCode) {
                      if (reponse.returnCode === '0') {
            this.showdetails = true;
            this.nombreFacture = 0;
            this.serv.posts('encaissement/releveClient.php', parametre, {}).then(dataclient => {
              this.serv.dismissloadin();
              const reponseclient = JSON.parse(dataclient.data);
             // alert("ReleveFacture "+JSON.stringify(reponseclient));
              if (reponseclient.returnCode === '0') {
                this.infosClient.controls.prenomClient.setValue(reponseclient.prenom);
                this.infosClient.controls.nomClient.setValue(reponseclient.nom);
                this.infosClient.controls.telephone.setValue(reponseclient.telephone);
                this.infosClient.controls.adresse.setValue(reponseclient.adresse);
                this.newclient = false;
              } else { this.newclient = true; }

            });

            if (reponse.Factures.Facture.length) {
              console.log('taillle possible');
              this.factures = reponse;
             // this.factures.nomClient=reponse.NomClient;
              this.factures.numfacture = reponse.IdClient;

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
              this.factures.NomClient = reponse.NomClient;
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

            console.log(JSON.stringify(this.listefactures));

          } else {
            this.serv.showError(reponse.errorLabel); }
          } else {  this.serv.showError('Reponse inattendu'); }

        } else {
          this.serv.showError('Pas de facture correspondant');
        }


      }).catch(err => {
        this.serv.dismissloadin();
        if (err.status === 500) {
          this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
          } else {
          this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');
          }

      });
    }
    handlechecking(id: number) {
      if (!this.listefactures[id].checked) {
          console.log('ligne ' + id * 1 + 1 + ' est cochée');
          if (this.nombreFacture === 1) {
            this.serv.showToast('Désolé, Vous ne pouvez pas payez plus d\'une facture');
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
        console.log('facture ' + JSON.stringify(this.facturescoches[i].mntTotal));
        this.total = this.total * 1 + this.facturescoches[i].mntTotal * 1;

        }
      } else { this.total = 0; }

      this.total = this.monmillier.transform(this.total);

    }
    validerEncaissement() {
      this.dataForPin.operation = 'Encaissement Senelec';
      this.dataForPin.montant = this.total;
      this.glb.ShowPin = true;
      this.glb.modeTransactionnel = true;

    }
    eventCapture(codePin) {
      if (this.glb.modeTransactionnel) {
        const parametre: any = {};
        parametre.infoclient = {};
        parametre.infoclient.nomClient = this.infosClient.controls.nomClient.value; 
        parametre.infoclient.numfacture = this.numfacture;
        parametre.infoclient.prenomClient = this.infosClient.controls.prenomClient.value;
        parametre.infoclient.idclient = this.factures.IdClient;
        parametre.infoclient.telephone = this.infosClient.controls.telephone.value;
        parametre.infoclient.adresse = this.infosClient.controls.adresse.value;
        parametre.image = this.dataencaissement.image;
        parametre.oper = '0027';
        parametre.recharge = {};
        parametre.operation = 'Encaissement Facture Senelec';
        parametre.recharge.montant = this.total;
        parametre.factures = this.facturescoches;
        parametre.nbrfact = this.nombreFacture;
        parametre.mnttotal = this.total.replace(/ /g, '');
        parametre.infoclient.pin = codePin;
        parametre.idTerm = this.glb.IDTERM;
        parametre.session = this.glb.IDSESS;
        this.serv.afficheloading();
        this.serv.posts(this.dataencaissement.encaissementfile, parametre, {}).then(data => {
        this.serv.dismissloadin();
        const reponse: any = JSON.parse(data.data);
        if(reponse.returnCode){
        if (reponse.returnCode === '0') {
        this.glb.ShowPin = false;
        this.glb.recu = reponse;

        if (!reponse.Factures.Facture.length) {
            this.vider();
            this.glb.recu = {};
            this.glb.recu.Oper = this.dataencaissement.operateur;
            this.glb.recu.dtTrx = this.dateFormat.transform(reponse.dtTrx);
            this.glb.recu.NomClient = parametre.infoclient.prenomClient + ' ' + parametre.infoclient.nomClient;
            this.glb.recu.IdClient = reponse.IdClient;
            this.glb.recu.telClient = parametre.infoclient.telephone;
            this.glb.recu.nbrFact = reponse.nbrFact;
            this.glb.recu.mntTotal = reponse.mntTotal;
            this.glb.recu.mntFrais = reponse.mntTFrais;
            this.glb.recu.mntTbr = reponse.mntTtbr;
            this.glb.recu.mntPlfap = reponse.mntPlfap;
            this.glb.recu.mntFact = reponse.mntTFact;
            this.glb.recu.Factures = {};
            this.glb.recu.Factures.Facture = [];
            this.glb.recu.Factures.Facture.push(reponse.Factures.Facture);

          }
        this.glb.recu.numTrx = reponse.numTrx;
        this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
        this.glb.recu.agence = this.glb.HEADER.agence;
        this.glb.showRecu = true;
        this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.glb.recu.Oper = this.dataencaissement.operateur;
        this.infosClient.reset();
        } else {
          this.serv.showError(reponse.errorLabel);
        }
        }else{
          this.serv.showError("Reponse inattendue");

        }


      }).catch(err => {
        this.serv.dismissloadin();
        if (err.status === 500) {
          this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
          } else {
          this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');}

      });

      }
      this.glb.ShowPin = false;
    }


}
