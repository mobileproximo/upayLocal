import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { Sim } from '@ionic-native/sim/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormatphonePipe } from 'src/app/pipes/formatphone.pipe';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  public Userdata: FormGroup;
  datapin: any = {};
  toclear = false;
  public isconform = false;
  message: string;

  constructor(public storage: Storage, public glb: GlobaleVariableService,
              public serv: ServiceService, public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public router: Router,
              public platform: Platform,
              public monmillier: MillierPipe,
              public sim: Sim,
              public oneSignal: OneSignal,
              public splashScreen: SplashScreen,
              public formatphone: FormatphonePipe,
              public androidPermissions: AndroidPermissions) {
                this.Userdata = this.formBuilder.group({
      login: ['', Validators.required],
      codepin: ['', Validators.required],
      confpin: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      imei: [''],
      idSim1: [''],
      idSim2: ['']
    });
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }

  ngOnInit() {
   // alert('connexion on init');
    this.datapin.image = this.glb.IMAGE_BASE_URL + 'upay.png';
    this.datapin.operation = 'Connexion';
    this.glb.PIN = '';
    this.storage.get('login').then((val) => {
        if (val === null) {
          this.glb.ShowPin = false;
        } else {
          this.Userdata.controls.login.setValue(val);
          this.glb.ShowPin = true;
          this.glb.modeTransactionnel = true;
        }

      });
   // this.getPermission();
  }

  getPermission() {
    this.platform.ready().then((readySource) => {
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
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
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


    });

  }
  verifConfPin() {

    // console.log('pin ' + codepin)
   // console.log('confpin ' + confpin)
    if (this.Userdata.controls.codepin.value > 4) {
      const val = this.Userdata.controls.codepin.value.toString();
      this.Userdata.controls.codepin.setValue(val.substring(0, 4));
    }
    if (this.Userdata.controls.confpin.value > 4) {
      const val = this.Userdata.controls.confpin.value.toString();
      this.Userdata.controls.confpin.setValue(val.substring(0, 4));
      }
    const codepin = this.Userdata.controls.codepin.value;
    const confpin = this.Userdata.controls.confpin.value;
    if (isNaN(codepin)) {
      this.isconform = false;
      this.message = 'Le code pin doit etre composé  uniquement des chiffres';
    } else {
      if (this.serv.CheckIfSequence(codepin)) {
        this.isconform = false;
        this.message = 'Le code ne doit pas être consecutif ni composé d\'un même chiffre';
      } else {
        console.log('Mes pin sont pin1: ' + codepin + ' pin2: ' + confpin);
        this.isconform = codepin === confpin;
        if (!this.isconform) {
        this.message = 'Les codes pin saisis ne sont pas conformes';
        }


      }
    }
  }
  generateOTPCode() {
   // this.Userdata.controls.login.setValue('221' + this.Userdata.controls.login.value);
    const userdata = this.Userdata.getRawValue();
    userdata.login = '221' + this.Userdata.controls.login.value;
    userdata.login = userdata.login.replace(/-/g, '');
    console.log(JSON.stringify(userdata));
    this.serv.afficheloading();
    this.serv.posts('connexion/generateOTP.php', userdata, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        const navigationExtras: NavigationExtras = {
          state: {
            user: userdata
          }
        };
        this.router.navigate(['/connexion/codeotp'], navigationExtras);
      } else { this.serv.showError(reponse.errorLabel); }

    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur ');
    });


  }
  eventCapture(codePin: any) {
    this.Userdata.controls.codepin.setValue(codePin);
    this.connecter();

  }
  connecter() {
    this.toclear = false;
    this.sim.requestReadPermission().then(
      () => {
        this.sim.getSimInfo().then(
          (info) => {
            this.Userdata.controls.imei.setValue(info.deviceId);
            if (!info.simSerialNumber) {
              this.serv.showError('Veuillez inserer une carte SIM');
            } else {
              const card = info.cards;
              if (card) {
                this.Userdata.controls.idSim1.setValue(card[0].simSerialNumber);
                if (card.length > 1) {
                  this.Userdata.controls.idSim2.setValue(card[1].simSerialNumber);
                }
              } else { this.Userdata.controls.idSim1.setValue(info.simSerialNumber); }
            }
            this.oneSignal.sendTags({imei: this.Userdata.controls.imei.value,
              numsim1: this.Userdata.controls.idSim1.value,
              numsim2: this.Userdata.controls.idSim2.value,
            });
            const params = this.Userdata.getRawValue();
            params.login = params.login.substring(0, 3) !== '221' ? '221' + params.login : params.login;
            params.login = params.login.replace(/-/g, '');
            params.login = params.login.replace(/ /g, '');
          //  alert(JSON.stringify(params));
            this.serv.afficheloading();
            this.serv.posts('connexion/connexion.php', params, {}).then(data => {
              this.serv.dismissloadin();
              const reponse = JSON.parse(data.data);
              console.log(JSON.stringify(reponse));
              // alert('Connexion ' + JSON.stringify(reponse));
              if (reponse.returnCode === '0') {
                  this.glb.HEADER.agence = reponse.agence;
                  this.glb.IDPART = reponse.idPartn;
                  this.glb.IDSESS = reponse.idSession;
                  this.glb.IDTERM = reponse.idTerm;
                  this.glb.PRENOM = reponse.prenom;
                  this.glb.PHONE = params.login;
                  this.glb.PHONE = this.glb.PHONE.substring(3);
                  this.glb.NOM = reponse.nom;
                  this.glb.PIN = reponse.pin;
                  this.oneSignal.sendTags({codeespace: this.glb.HEADER.agence});
                  if (typeof(reponse.mntPlf) !== 'object') {
                  this.glb.HEADER.montant = this.monmillier.transform(reponse.mntPlf);
                  } else { this.glb.HEADER.montant = 0; }
                  this.glb.dateUpdate = this.serv.getCurrentDate();
                  this.glb.HEADER.numcompte = reponse.numcompte;
                  this.glb.HEADER.consomme = this.monmillier.transform(reponse.consome);
                  this.navCtrl.navigateRoot('/home');
              } else {
                if (reponse.errorLabel === 'Code Pin incorrect !') {
                 this.toclear = true;
                }
                this.serv.showError(reponse.errorLabel);
              }
            }).catch(error => {
              this.serv.dismissloadin();
              this.serv.showError('Impossible d\'atteindre le serveur ' );

            });


          },
          (err) => this.serv.showError('Impossible de récuperer les infos du téléphone')
        );
      },
      () => this.serv.showError('Vous devez activer les autorisations')
    );

  }
  focustel() {
    console.log('focus');
    if (this.Userdata.controls.login.value) {
      this.Userdata.controls.login.setValue(this.Userdata.controls.login.value.replace(/ /g, ''));
      this.Userdata.controls.login.setValue(this.Userdata.controls.login.value.replace(/-/g, ''));

    }
  }
  blurtel() {

   this.Userdata.controls.login.setValue(this.formatphone.transform(this.Userdata.controls.login.value));

  }
    changetel() {
    console.log('change');
    this.Userdata.controls.login.setValue(this.Userdata.controls.login.value.replace(/ /g, ''));
    this.Userdata.controls.login.setValue(this.Userdata.controls.login.value.replace(/-/g, ''));
    if (this.Userdata.controls.login.value.length > 9) {
      this.Userdata.controls.login.setValue(this.Userdata.controls.login.value.substring(0, 9));
    }
  }

}
