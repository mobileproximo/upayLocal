import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { NavController } from '@ionic/angular';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { UpayWalletPage } from '../monnaie/upay-wallet/upay-wallet.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private pages: any;

  codePin = '';
  anim1 = '';
  items: any = [];
  factures: any = [];
  itemExpandHeight = 72;
  dateUpdate: any;
  slideOpts: any;
  total: any;
  facturescoches: any;
  nombreFacture: any;
  constructor(public glb: GlobaleVariableService,
              public navCtrl: NavController,
              public serv: ServiceService,
              public monmillier: MillierPipe,
              ) {
    this.slideOpts = {
      speed: 400,
      width: 60,
     spaceBetween: 5
    };
    this.pages = [
      { title: 'Paiement Factures',  src: this.glb.IMAGE_BASE_URL + 'Petite-Icon-04.png', expanded: false,
            souspages: [{nom: '/paiement/senelec', icone: this.glb.IMAGE_BASE_URL + 'Petite-Icon-24.png'},
             {nom: 'paiement/sde', icone: this.glb.IMAGE_BASE_URL + 'sde.png'},
             {nom: 'paiement/woyofal', icone: this.glb.IMAGE_BASE_URL + 'woyofal.png'}] },
      { title: 'Transfert d\'argent',  src: this.glb.IMAGE_BASE_URL + 'Petite-Icon-03.png', expanded: false,
            souspages: [{nom: 'transfert/proxicash', icone: this.glb.IMAGE_BASE_URL + 'logo_Proxicash.png'},
                    /*     {nom: 'transfert/ria', icone: this.glb.IMAGE_BASE_URL + 'logo_Ria.png'}*/]  },
      { title: 'Recharge',  src: this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png', expanded: false,
            souspages: [{nom: 'recharge/orange', icone: this.glb.IMAGE_BASE_URL + 'logo_Orange.png'},
                        {nom: 'recharge/izi', icone: this.glb.IMAGE_BASE_URL + 'logo_Tigo.png'},
                        {nom: 'recharge/yakalma', icone: this.glb.IMAGE_BASE_URL + 'logo_Expresso.png'},
                        {nom: 'recharge/rapido', icone: this.glb.IMAGE_BASE_URL + 'logo_rapido.png'}] },
      { title: 'Monnaie electronique', src: this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png', expanded: false,
      souspages: [{nom: 'monnaie/orange-money', icone: this.glb.IMAGE_BASE_URL + 'omoney.png'},
                 {nom: 'monnaie/tigocash', icone: this.glb.IMAGE_BASE_URL + 'logo_Tigo Cash.png'},
                 {nom: 'monnaie/emoney', icone: this.glb.IMAGE_BASE_URL + 'emoney.png'},
                 {nom: 'monnaie/wizall', icone: this.glb.IMAGE_BASE_URL + 'wizall.png'},
                 {nom: 'monnaie/postcash', icone: this.glb.IMAGE_BASE_URL + 'postecash.png'},
                 {nom: 'monnaie/upaywallet', icone: this.glb.IMAGE_BASE_URL + 'upay.png'},
                {nom: 'monnaie/transfertuv', icone: this.glb.IMAGE_BASE_URL + 'tiw.png'}
                ]
    },
       { title: 'Gestion',  src: this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png', expanded: false,
      souspages: [{nom: 'gestion/historique', icone: this.glb.IMAGE_BASE_URL + 'Petite-Icon-EtatMouvementCercle.png'},
                 // {nom: 'gestion/plafond', icone: this.glb.IMAGE_BASE_URL + 'etatplf.png'},
                  {nom: 'gestion/mouvement', icone: this.glb.IMAGE_BASE_URL + 'etatplf.png'},
                  {nom: 'gestion/pin', icone: this.glb.IMAGE_BASE_URL + 'chpin.png'} ,
                  {nom: 'gestion/codes', icone: this.glb.IMAGE_BASE_URL + 'wallet.png'} ] }

     ];

  }


  ngOnInit(): void {
    this.facturescoches = [];
    this.nombreFacture = 0;

  }
  expandItem(item: any) {

    this.pages.map((listItem) => {

      if (item === listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;

    });

  }

  handlechecking(id: number) {
    console.log(id);
    console.log(' av this.factures[id].checked  ' + this.factures[id].checked );
    this.total = 0;
    console.log(' av this.factures[id].checked  ' + this.factures[id].checked );

    if (!this.factures[id].checked) {
        console.log('ligne ' + id * 1 + 1 + ' est cochée');
        if (this.nombreFacture === 3) {
          this.serv.showError('Désolé, Vous ne pouvez pas payez plus d\'une factures');
          console.log('id vaut ' + id);
          this.factures[id].checked = false;
          setTimeout(() => {
            this.factures[id].checked = false;
          }, 100);

        } else {
          console.log('incremente ' );

          this.nombreFacture++;
          this.facturescoches.push(this.factures[id]);

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
  // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.factures.length; i++) {
        if (this.factures[i].checked) {
          this.total = this.total * 1 + this.factures[i].mntTotal * 1;
        }
      }
    this.total = this.monmillier.transform(this.total);

  }
  verspage(p: any) {
    console.log('page ' + JSON.stringify(p));
    this.navCtrl.navigateForward(p.nom);
  }
  getPlafond() {
    this.serv.afficheloading();
    this.serv.getplafond().then(data => {
      this.serv.dismissloadin();
      const plafond = JSON.parse(data.data);
      if (plafond.returnCode === '0') {
        this.dateUpdate = this.serv.getCurrentDate();
        this.glb.HEADER.montant = this.monmillier.transform(plafond.mntPlf);
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.glb.HEADER.numcompte = plafond.numcompte;
        this.glb.HEADER.consomme = this.monmillier.transform(plafond.consome);
      } else { this.serv.showError(plafond.errorLabel); }

    }).catch(error => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');

    });
  }
  logout() {
    console.log('test logout');
    this.navCtrl.navigateRoot('/connexion');
  }
  ionViewDidEnter() {
    this.glb.ShowPin = false;
  }

}
