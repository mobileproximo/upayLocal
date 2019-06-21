import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { GlobaleVariableService } from './globale-variable.service';
import { HTTP } from '@ionic-native/http/ngx';
import { MillierPipe } from '../pipes/millier.pipe';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  loading = false;
  constructor(private alertCtrl: AlertController, private http: HTTP, public monmillier: MillierPipe,
              private toast: Toast, public loadingCtrl: LoadingController, private glb: GlobaleVariableService,
              private network: Network) { }
  showToast(message) {
    this.toast.showLongCenter(message).subscribe(value => {
      console.log(value);
    });
  }
  CheckIfSequence(valeur: any) {
    if (valeur !== null) {
      valeur = valeur.toString();
      const tabNombres = valeur.split('');
      const conditionA: boolean = (tabNombres[0] === tabNombres[1] && tabNombres[1] === tabNombres[2] && tabNombres[2] === tabNombres[3]);
  // tslint:disable-next-line: max-line-length
      const conditionB: boolean = (tabNombres[0] * 1 + 1 === tabNombres[1] * 1 && tabNombres[1] * 1 + 1 === tabNombres[2] * 1 && tabNombres[2] * 1 + 1 === tabNombres[3] * 1);
      if (conditionA || conditionB) {
      return true;
      }
      return false;
    }


  }
  async afficheloading() {
   // this.checkNetwork();
    if (this.glb.ISCONNECTED === true) {
      this.loading = true;
      return await this.loadingCtrl.create({
        message: 'Veuillez patienter ...',
        spinner: 'lines-small',
        cssClass: 'custom-loader-class'
      }).then(a => {
        a.present().then(() => {
          this.glb.isLoadingShowing = true;
          console.log('presented');
          if (!this.loading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }

  }

  async dismissloadin() {
    this.loading = false;
    this.glb.isLoadingShowing = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Hellooo',
      duration: 2000,
      cssClass: 'custom-loader-class'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  afficheloading_old() {
    this.loading = true;
    this.loadingCtrl.create({
      message: 'Veuillez patienter ...',
      duration: 5000,
      spinner: 'lines-small',
      cssClass: 'custom-loader-class'
    }).then((res) => {
      res.present();
      if (!this.loading) {
        res.dismiss().then(() => console.log('abort presenting'));
      }
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
/*     if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        message: 'Veuillez patienter...'
      });
      this.loading.present();
    } else { this.loading.present(); } */
  }
  dismissloadin_old() {
    this.loading = true;
    this.loadingCtrl.dismiss();
/*     if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    } */
  }
  posts(service: string, body: any = {}, headers: any = {}): any {
  /*   this.checkNetwork();*/
    if (this.glb.ISCONNECTED === false) {
      this.showToast('Veuillez revoir votre connexion internet !');
      return ;
    } else {
      const url = this.glb.BASEURL + service;
      console.log(headers);
      console.log(url);
      console.log(body);
      this.http.setDataSerializer('json');
      this.http.setSSLCertMode('nocheck');
      // this.http.setRequestTimeout(60);
      return this.http.post(url, body, headers);
    }




  }
    showError(text: string= 'Erreur Non reconnue.Veuillez contacter le SUPPORT') {

      this.alertCtrl.create({
      header: 'UPay',
      message: text,
      cssClass : 'alertDanger',

      buttons: ['OK']
    }).then(res => {
      console.log('alert show');
      if (this.glb.isLoadingShowing) {
      this.dismissloadin();
      }
      res.present();
    });
}
getLabelOperator(codeOper: string, codeSousop: string) {
  let label = 'Téléphone';
  if (codeOper === '0016' || codeOper === '0027') {
  label = 'N° FACT';
  }
  if (codeOper === '0029') {
  label = 'N° Compteur';
  }
  if (codeOper === '0057' && codeSousop === '0002') {
  label = 'N° Badge';
  }
  return label;

}
showAlert(text: string) {
  this.alertCtrl.create({
    header: 'Upay',
    message: text,
    cssClass: 'alertSucces',
    buttons: ['OK']
  }).then(res => {
    res.present();
  });
}
getCurrentDate() {
  const date = new Date();
  const jour = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  const mois = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const annee = date.getFullYear();
  const heure = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  return jour + '/' + mois + '/' + annee + ' à ' + heure + 'h:' + minute;
}
getplafond() {
  const parametre = {idPartn: this.glb.IDPART, idTerm: this.glb.IDTERM, session: this.glb.IDSESS};
  return this.posts('plafond/solde.php', parametre, {});
}

recharger(datarecharge) {
  const parametres: any = {};
  parametres.recharge = datarecharge.recharge;
  parametres.recharge.montant   = datarecharge.recharge.montant.replace(/ /g, '');
  parametres.recharge.telephone = datarecharge.recharge.telephone.replace(/-/g, '');
  parametres.recharge.telephone = parametres.recharge.telephone.replace(/ /g, '');
  if (parametres.recharge.frais) {
    parametres.recharge.frais = parametres.recharge.frais.replace(/ /g, '');
  }
  parametres.idTerm = this.glb.IDTERM;
  parametres.session = this.glb.IDSESS;
  this.afficheloading();
  let file;
  if (parametres.recharge.oper === '0073') {
  file = 'upayW2W';
  } else {
    if (parametres.recharge.oper === '0074') {
    file = 'cashoutUpay';
    } else { file = 'recharge'; }
  }
  if (parametres.recharge.oper === '0073') {
  parametres.recharge.telephone = '221' + parametres.recharge.telephone;
  }
  // alert(JSON.stringify(parametres));
  this.posts('recharge/' + file + '.php', parametres, {}).then(data => {
    this.dismissloadin();
    const reponse = JSON.parse(data.data);
    if (reponse.returnCode === '0') {
      this.glb.recu = reponse;
      if (typeof (reponse.telRech) === 'object') {
        this.glb.recu.telRech = datarecharge.recharge.telephone;
      }
      this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
      this.glb.recu.agence = this.glb.HEADER.agence;
      if (parametres.recharge.oper === '0074') {
        this.glb.recu.telRech = reponse.codeTransfert;
        }
      this.glb.showRecu = true;
      this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlfap);
      this.glb.dateUpdate = this.getCurrentDate();
      this.glb.recu.service = datarecharge.operation;
      this.glb.recu.Oper = datarecharge.operateur;

    } else { this.showError(reponse.errorLabel); }
  }).catch(err => {
    this.dismissloadin();
    this.showError('Impossible d\'atteindre le serveur');

  });

}
verificationnumero(telephone: any) {
  telephone = telephone.replace(/-/g, '');
  telephone = telephone.replace(/ /g, '');
  console.log('telephone ' + telephone);
  const  numeroautorisé = ['77', '78', '70', '76'];
  const retour = numeroautorisé.indexOf(telephone.substring(0, 2));
  return retour === -1;
}
checkNetwork() {
  this.network.onDisconnect().subscribe(() => {
   // this.showToast('Vous n\'avez plus de connexion internet');
    this.glb.ISCONNECTED = false;

  });
  this.network.onConnect().subscribe(() => {
   // this.showToast('Vous êtes maintenant en ligne');
    this.glb.ISCONNECTED = true;

  });
}
}
