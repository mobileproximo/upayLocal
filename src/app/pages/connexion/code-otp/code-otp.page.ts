import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { Storage } from '@ionic/storage';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { NavController, Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var SMS: any;
@Component({
  selector: 'app-code-otp',
  templateUrl: './code-otp.page.html',
  styleUrls: ['./code-otp.page.scss'],
})
export class CodeOTPPage implements OnInit {
  userdata: any;
  codeotp: any;
  constructor(private router: Router,
              private serv: ServiceService,
              private storage: Storage,
              private glb: GlobaleVariableService,
              private navCtrl: NavController,
              public platform: Platform,
              public androidPermissions: AndroidPermissions) {
    this.userdata = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {
    this.onCommingSms()
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
      const expediteur = sms.address;
      const message = sms.body;

      if (expediteur === 'UPay') {
        if (this.glb.READCODEOTP !== message) {
          this.codeotp = message.substring(message.length - 4);
          setTimeout(() => {
            this.souscription();
          }, 200);
        }
        this.glb.READCODEOTP = message;
      }



    });
  }
  getPermission() {
    this.platform.ready().then((readySource) => {
          this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      result => {

        console.log('Has permission?', result.hasPermission);
        if (result.hasPermission) {
          this.onCommingSms();
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result => {

              this.onCommingSms();
            }).catch(err => {

            });
        }

      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(result => {
          this.onCommingSms();
        }).catch(err => {

        });
      }
    );


    });


  }
  souscription() {

    this.userdata.codeOTP = this.codeotp;
    this.serv.afficheloading();
    this.serv.posts('connexion/checkOTP.php', this.userdata, {}).then(data => {
      const reponse = JSON.parse(data.data);

      if (reponse.returnCode === '0') {
        this.serv.posts('connexion/souscription.php', this.userdata, {}).then(rep => {
          this.serv.dismissloadin();
          const souscription = JSON.parse(rep.data);
          if (souscription.returnCode === '0') {
            this.glb.ShowPin = true;
            this.storage.set('login', this.userdata.login);
            this.serv.showAlert(souscription.returnMsg);
            setTimeout(() => {
              this.navCtrl.navigateRoot('/connexion');
            }, 200);
          } else {
            this.serv.showError(souscription.errorLabel);
          }

        }).catch(err => {
          this.serv.dismissloadin();
          this.serv.showError('Impossible d\'atteindre le serveur');
        });

      } else {
        this.serv.dismissloadin();
        this.serv.showError(reponse.errorLabel);
      }

    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');
    });

  }
  generercode() {}
}
