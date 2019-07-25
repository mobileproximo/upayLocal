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
  public token: string;
  public datacashin: any = {};
  public montantrelve;
  dataForPin: any = {};
  public rechargeForm: FormGroup;
  public sousop = '';
  public numtrx = '';
  public idtrxEmoney = '';
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
  /*   if (this.service !== '0005') {
    this.serv.showAlert('Service en cours developpement');
    } */
    if (this.service === '0005') {
    this.sousop = '8';
    }
    this.sousop = '8';

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
    } else {
      if (this.service !== '0005' && this.service !== '0057' && this.service !== '0054' && this.service !== '0053') {
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
          switch (this.service) {
      case '0005' || '0054' || '0053': {
        const transfert = {montant: this.rechargeForm.controls.montantrlv.value, telSource: this.glb.PHONE, opersource: this.service};
        const params =  {
          transfert,
          idTerm: this.glb.IDTERM,
          session: this.glb.IDSESS
        };
        const data: any = {};
        data.idTerm = this.glb.IDTERM;
        data.session = this.glb.IDSESS;
        this.serv.afficheloading();
        this.serv.posts('recharge/initcashoutoper.php', params, {}).then(data => {
            const reponse = JSON.parse(data.data);
            if (reponse.returnCode) {
                  if (reponse.returnCode === '0') {
                    if (this.service === '0054' ) {
                      this.idtrxEmoney = reponse.numtrx;
                    }

            } else {
              this.serv.showError(reponse.errorLabel);
            }

          } else {
            this.serv.showError('Reponse inattendue ');
          }
        }
          ).catch(err => {
            this.serv.dismissloadin();
            if (err.status === 500) {
            this.serv.showError('Une erreur interne s\'est produit ERREUR 500');
            } else {
            this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer' );
            }
          });
        break;
      }

      case '0057': {
        const params = {username: 'test',
                        password: 'jdkwq01276329021',
                        client_id: 'jdsjkw9021843092-02198322332n',
// tslint:disable-next-line: max-line-length
                        client_secret: 'WTwiygwawd3d3d32erfnBk2dHiwVrP4nW6Ip2EBXyuZLHAJ14tDx7a490LKQvdkMiBIiAtY3RRXmMMU11zSKEPzu88ewwwefrfewmauPEvJdo4VeVhGTkwahJeXhZ7EKZXCd3tU',
                        client_type: 'public',
                        grant_type: 'password'};
        this.serv.afficheloading();
        let url = 'https://testwpay.wizall.com/o/token/';
        this.serv.post(url, params).then(data => {
          // this.serv.dismissloadin();

          const reponse = JSON.parse(data.data);
         // alert('reponse Token ' + JSON.stringify(reponse));
          if (reponse.access_token) {
            url = 'https://testwpay.wizall.com/api/merchant/cashout/';
// tslint:disable-next-line: no-shadowed-variable
            const params = {msisdn: '765697413',
                      merchant_msisdn: '773914791',
                      merchant_pin: '1001',
                      amount: '1'};
            this.token = reponse.access_token;
            const header = {Authorization: 'Bearer ' + reponse.access_token};
            this.serv.post(url, params, header).then(data => {
             // this.serv.dismissloadin();
              const reponse = JSON.parse(data.data);
            //  alert('reponse init ' + JSON.stringify(reponse));
            })

              .catch(err => {
                this.serv.dismissloadin();
                if (err.status === 500) {
                this.serv.showError('Une erreur interne s\'est produite ERREUR 500 ' + JSON.stringify(err));
                } else {
                this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer ' + JSON.stringify(err) );
                }
              });
          }
        })
        .catch(err => {
          this.serv.dismissloadin();
          if (err.status === 500) {
          this.serv.showError('Une erreur interne s\'est produit ERREUR 500 ' + JSON.stringify(err));
          } else {
          this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer'  + JSON.stringify(err) );
          }
        });
        break;
      }
      default: {
        this.serv.showAlert('Service en cours developpement');
        break;
     }
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
     // alert('Message ' + JSON.stringify(message));
      if (expediteur === 'ORANGEMONEY') {
        if (message.substr(0, 30) === 'Vous allez faire un retrait de') {
          // alert("vous avez reçu un sms de confirmation entrez votre code secret");
          setTimeout(() => {
            this.callNumber.callNumber('#144#', true)
            .then(res => {})
            .catch(err => {
              this.serv.dismissloadin();
               // dismisslogin
            });
          }, 200);

        }
        if (message.substr(0, 16) === 'Vous avez retire') {
          setTimeout(() => {
            this.numtrx = this.glb.PHONE;
            this.cashinUPay();
          }, 200);
        }
      }
      if (expediteur === 'WIZALLMONEY') {
        if (message.substr(0, 24) === 'Bonjour, votre code de s') {
          const otp =  message.substring(message.length - 6);
          const url = 'https://testwpay.wizall.com/api/merchant/cashout/confirm/';
          // const url = 'https://testwpay.wizall.com/api/merchant/cashout/confirm';
          const header = {Authorization: 'Bearer ' + this.token};
          const params = {otp, msisdn: '765697413', merchant_msisdn: '773914791', merchant_pin: '1001'};
          this.serv.post(url, params, header).then(data => {
            this.serv.dismissloadin();
           // this.serv.dismissloadin();
            const reponse = JSON.parse(data.data);
            // alert('reponse confirm ' + JSON.stringify(reponse));
            if (reponse.Operation) {
              if (reponse.Operation  === 'MerchantGetMoneyConfirm') {
                this.numtrx = this.glb.PHONE;
                this.cashinUPay();
              } else {
                alert(JSON.stringify(reponse));
              }
            } else {
              alert(JSON.stringify(reponse));

            }
          })
            .catch(err => {
              this.serv.dismissloadin();
              if (err.status === 500) {
              this.serv.showError('Une erreur interne s\'est produite ERREUR 500 ' + JSON.stringify(err));
              } else {
              this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer ' + JSON.stringify(err) );
              }
            });

        }

      }
      if (expediteur === 'E-MONEY') {
        if (message.indexOf('OTP') !== -1) {
          setTimeout(() => {
            const otp = message.substring(message.indexOf('OTP:') + 5, message.indexOf('. Ref:'));
            const parametres: any = {};
            parametres.recharge = {};
            parametres.recharge.numtrx            = this.idtrxEmoney;
            parametres.recharge.codevalidation    = otp;
            parametres.recharge.montant   = this.rechargeForm.controls.montantrlv.value.replace(/ /g, '');
            this.serv.posts('recharge/validationemoney.php', parametres, {}).then(data => {
              // this.serv.dismissloadin();
              const reponse = JSON.parse(data.data);
              if (reponse.returnCode) {

                if (reponse.returnCode === '0') {
                  this.cashinUPay();
                } else {this.serv.dismissloadin();  this.serv.showError(reponse.errorLabel); }
              } else {
                this.serv.dismissloadin();
                this.serv.showError('Reponse inattendue');

              }
            }).catch(err => {
              this.serv.dismissloadin();
              if (err.status === 500) {
              this.serv.showError('Une erreur interne s\'est produite ERREUR 500 ' + JSON.stringify(err));
              } else {
              this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer ' + JSON.stringify(err) );
              }
            });
           // $scope.confirmation();
          }, 3000);


        }

      }
    });
  }
  cashinUPay() {
    const parametres: any = {};
    parametres.recharge = {};
    parametres.recharge.nomClient = this.glb.PRENOM + ' ' + this.glb.NOM;
    parametres.recharge.sousoper  = this.sousop;
    parametres.recharge.numtrx    = this.numtrx;
    parametres.recharge.oper      = this.service;
    parametres.recharge.codeEs    = '221' + this.glb.PHONE;
    parametres.recharge.montant   = this.rechargeForm.controls.montantrlv.value.replace(/ /g, '');
    parametres.recharge.telephone = this.glb.PHONE; // datarecharge.recharge.telephone.replace(/-/g, '');
    if (parametres.recharge.frais) {
      parametres.recharge.frais = parametres.recharge.frais.replace(/ /g, '');
    }
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    this.serv.posts('recharge/cashinMoga.php', parametres, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode) {
        if (reponse.returnCode === '0') {
       // alert('cashin UPAY' + JSON.stringify(reponse) );
       this.glb.recu = reponse;
       this.glb.recu.guichet = this.glb.IDTERM.substring(5, 6);
       this.glb.recu.agence = this.glb.HEADER.agence;
       this.glb.showRecu = true;
       this.glb.HEADER.montant = this.millier.transform(reponse.mntPlfap);
       this.glb.dateUpdate = this.serv.getCurrentDate();
       this.glb.recu.service = 'Cashin UPay';
       this.glb.recu.Oper = 'UPay';
    } else {
      this.serv.showError(reponse.errorLabel);
    }
  } else {
    this.serv.showError('Reponse inattendue  ' );
  }

  }
    ).catch(err => {
      this.serv.dismissloadin();
      if (err.status === 500) {
      this.serv.showError('Une erreur interne s\'est produit ERREUR 500');
      } else {
      this.serv.showError('Impossible d\'atteindre le serveur veuillez réessayer' );
      }
    });
  }

}
