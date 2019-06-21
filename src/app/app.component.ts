import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobaleVariableService } from './service/globale-variable.service';
import { ServiceService } from './service/service.service';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var SMS: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private glb: GlobaleVariableService,
    private serv: ServiceService,
    public navCtrl: NavController,
    public router: Router,
    public network: Network,
    public androidPermissions: AndroidPermissions,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#639dd5');
      this.platform.pause.subscribe(() => {
        this.glb.DATEPAUSE = new Date();
    });
      this.checkNetwork();

      /* this.splashScreen.hide(); */
      document.addEventListener('ionAlertDidDismiss', (e) => {
        console.log('didDismiss ' + JSON.stringify(e) );
        /* if (this.glb.isLoadingShowing === true) {
          this.glb.isLoadingShowing = false;
        } */
      });
      document.addEventListener('backbutton', () => {
          if (this.router.url === '/home') {
          this.presentAlert();
          }
        });
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
          result => {

            // alert('Has permission? ' +JSON.stringify(result))
            console.log('Has permission?', result.hasPermission);
            if (!result.hasPermission) {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result => {

              }).catch(err => {

              });
            }

          },
          err => {
            alert('err ' + JSON.stringify(err));

            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result => {
            //  alert('first request result ' +JSON.stringify(result));
            }).catch(err => {
             // alert('first request catch ' +JSON.stringify(err))

            });
          }
        );
/*       this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
          result => {

            // alert('Has permission? ' +JSON.stringify(result))
            console.log('Has permission?', result.hasPermission);
            if (!result.hasPermission) {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(result => {

              }).catch(err => {

              });
            }

          },
          err => {
            alert('err ' + JSON.stringify(err));

            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(result => {
            //  alert('first request result ' +JSON.stringify(result));
            }).catch(err => {
             // alert('first request catch ' +JSON.stringify(err))

            });
          }
        );
      if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {

          document.addEventListener('deviceready', function() {

            if (!SMS ) { alert( 'SMS plugin not ready' ); return; } else {
              SMS.startWatch(function() {

              }, function() {
                this.serv.showError('Impossible de lire L\'SMS de UPay');
              });

            }


          }, false);
        } else {
          alert('need run on mobile device for full functionalities.');
        }
      document.addEventListener('onSMSArrive', (e: any) => {

          const sms: any = e.data;
          const expediteur = sms.address;
          const message = sms.body;

          if (expediteur === 'UPay') {
            if (this.glb.READCODEOTP != message) {
              // this.codeotp = message.substring(message.length - 4);
              setTimeout(() => {
              //  this.souscription();
              }, 200);
            }
            this.glb.READCODEOTP = message;
          }



        }); */

/*       this.platform.registerBackButtonAction(() => {
        if (this.nav.length() == 1) {
            if (!this.alertShown) {
                this.presentConfirm();
            } else {
                this.alertShown = false;
            }
        }

        this.nav.pop();
    }); */

    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'UPay',
     // subHeader: 'Subtitle',
      message: 'Voulez-vous vraiment quitter l\'application?',
      buttons: [        {
        text: 'Non',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'oui',
        handler: () => {

// tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
          console.log('Confirm Okay');
        }
      }]
    });

    await alert.present();
  }
  checkNetwork() {
    this.network.onDisconnect().subscribe(() => {
      this.serv.showToast('Vous n\'avez plus de connexion internet');
      this.glb.ISCONNECTED = false;

    });
    this.network.onConnect().subscribe(() => {
      this.serv.showToast('Vous êtes maintenant en ligne');
      this.glb.ISCONNECTED = true;

    });
  }
}
