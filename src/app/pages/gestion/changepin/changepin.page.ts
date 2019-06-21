import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.page.html',
  styleUrls: ['./changepin.page.scss'],
})
export class ChangepinPage implements OnInit {
  public typeanc = 'password';
  public typenouv = 'password';
  public typepwd = 'password';
  public typeconf = 'password';
  public Userdata: FormGroup;
  public message: string;
  public conf = true;
  constructor(public serv: ServiceService,
              public formBuilder: FormBuilder,
              public glb: GlobaleVariableService,
              public navCtrl: NavController,
              public storage: Storage) {
                this.glb.ShowPin = false;
                this.Userdata = this.formBuilder.group({
                  login: ['', Validators.required],
                  newpin: ['', Validators.required],
                  ancienpin: ['', Validators.required],
                  conf: ['', Validators.required]
                });
               }
  ngOnInit() {
    this.storage.get('login').then((val) => {
      if (val != null) {
      this.Userdata.controls.login.setValue(val);
      }
    });
    this.message = 'Definir un code pin identique au nouveau saisi plus haut';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png';
    this.glb.HEADERTITELE.title = 'Changement Code Pin';
  }
  changeMotDePasse() {
    const parametre: any = {};
    parametre.datapin = this.Userdata.getRawValue();
    parametre.datapin.pwd = parametre.datapin.ancienpin;
    parametre.session = this.glb.IDSESS;
    parametre.idTerm = this.glb.IDTERM;
    parametre.idPartn = this.glb.IDPART;
 //   alert(JSON.stringify(parametre))
    this.serv.afficheloading();
    this.serv.posts('connexion/changepin.php', parametre, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        this.serv.showAlert(reponse.Message);
        this.Userdata.reset();
        this.navCtrl.navigateRoot('/connexion');
      } else { this.serv.showError(reponse.errorLabel); }
    }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');
    });

  }
  verifconformite() {
    if (isNaN(this.Userdata.controls.newpin.value)) {
      this.conf = false;
      this.message = 'Le code pin doit etre composé uniquement des chiffres';
    } else {
      if (this.serv.CheckIfSequence(this.Userdata.controls.newpin.value)) {
        this.conf = false;
        this.message = 'Le code ne doit pas être consecutif ni composé d\'un même chiffre';
      } else {
        this.conf = this.Userdata.controls.newpin.value === this.Userdata.controls.conf.value;
        if (!this.conf) {
        this.message = 'Les codes pin saisi ne sont pas conformes';
        }

      }
    }
  }
}
