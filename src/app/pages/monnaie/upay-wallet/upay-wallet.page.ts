import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'app-upay-wallet',
  templateUrl: './upay-wallet.page.html',
  styleUrls: ['./upay-wallet.page.scss'],
})
export class UpayWalletPage implements OnInit {
  public service;
  public affiche = false;
  public datarecharge: any = {};
  public datacashin: any = {};
  public dataqrcode: any = '';
  public montant: any ;
  barcodeScannerOptions: BarcodeScannerOptions;

// tslint:disable-next-line: max-line-length
  constructor(public glb: GlobaleVariableService, public barcodeScanner: BarcodeScanner, public serv: ServiceService, public monmillier: MillierPipe) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Transfert UPay';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'upay.png';
    this.datarecharge.oper  = '0073';
    this.datarecharge.operation = 'Cashin UPay';
    this.datarecharge.operateur  = 'UPay';
    this.service = 'Cashin';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'upay.jpg';
    this.datacashin.oper  = '0074';
    this.datacashin.operation = 'Cashout UPay';
    this.datacashin.operateur  = 'UPay';
  }
  generatecode() {
    this.affiche = true;
    this.dataqrcode = this.montant + ';' + this.glb.IDSESS + ';' + this.glb.IDTERM;
  }
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        const infos  = barcodeData.text.split(';');
        // alert('infos recuperees ' + JSON.stringify(infos));

        const parametres: any = {};
        parametres.recharge = {};
        parametres.recharge.montant   = infos[0].replace(/ /g, '');
        parametres.recharge.telephone = '221' + this.glb.PHONE;
        parametres.recharge.pin = '1324';
        parametres.recharge.oper = '0073';
        parametres.idTerm = infos[2];
        parametres.session = infos[1];
        this.serv.afficheloading();

        this.serv.posts('recharge/upayW2W.php' , parametres, {}).then(data => {
          this.serv.dismissloadin();
          const reponse = JSON.parse(data.data);
          if (reponse.returnCode) {
            if (reponse.returnCode === '0') {
              this.glb.recu = reponse;
              if (typeof (reponse.telRech) === 'object') {
                this.glb.recu.telRech = this.glb.PHONE;
              }
              this.glb.recu.guichet = parametres.idTerm.substring(5, 6);
              this.glb.recu.agence = this.glb.HEADER.agence;

              this.glb.showRecu = true;
              const montant = this.glb.HEADER.montant.replace(/ /g, '') * 1 + parametres.recharge.montant.replace(/ /g, '') * 1;
              this.glb.HEADER.montant = this.monmillier.transform(montant + '');
              this.glb.dateUpdate = this.serv.getCurrentDate();
              this.glb.recu.service = 'Cashin- avec-qrcode';
              this.glb.recu.Oper = 'Upay';

            } else { this.serv.showError(reponse.errorLabel); }
          } else {
            this.serv.showError('Reponse inattendue' );
          }

        }).catch(err => {
          this.serv.dismissloadin();
          if (err.status === 500) {
            this.serv.showError('Une erreur interne s\'est produite ERREUR 500');
            } else {
            this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer');
            }

        });
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

}
