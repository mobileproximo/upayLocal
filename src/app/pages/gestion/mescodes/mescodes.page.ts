import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-mescodes',
  templateUrl: './mescodes.page.html',
  styleUrls: ['./mescodes.page.scss'],
})
export class MescodesPage implements OnInit {

  constructor(public glb: GlobaleVariableService, public serv: ServiceService) { }
  public mesCodes: any = [];
  public iconName = 'eye';
  public dataForPin: any = {};
  public showcodes: boolean;
  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-06.png';
    this.glb.HEADERTITELE.title = 'Voir mes codes de retrait';
    this.iconName = 'eye';
    this.showcodes = false;

  }
  ionViewDidEnter() {

  }
  eventCapture(codePin: any) {
    if (this.glb.modeTransactionnel) {
      this.showCode();
    }
    this.glb.ShowPin = false;
  }
  showPin() {
    if (this.iconName === 'eye') {
    this.dataForPin = {};
    this.dataForPin.operation = 'Code de retrait UPay';
    this.dataForPin.montant = '';
    this.glb.modeTransactionnel = true;
    this.glb.ShowPin = true;
    } else {
      this.showcodes = false;
      this.glb.HEADERTITELE.title = 'Voir mes codes de retrait';
      this.iconName = 'eye';
    }

  }
  showCode() {
    const parametres: any = {};
    this.iconName = 'eye';
    parametres.idTerm = this.glb.IDTERM;
    parametres.session = this.glb.IDSESS;
    parametres.telephone = this.glb.PHONE;
    this.serv.afficheloading();
    this.serv.posts('recharge/getcondesUpay.php', parametres, {}).then(data => {
      this.serv.dismissloadin();
      const reponse = JSON.parse(data.data);
      if (reponse.returnCode === '0') {
        this.iconName = 'eye-off';
        this.showcodes = true;
        this.glb.HEADERTITELE.title = 'Mes codes de retrait';
        const codes = reponse.listCodeUpay.codeUpay;
        if (codes.length) {
        this.mesCodes = codes;
        } else {
          this.mesCodes = [];
          this.mesCodes[0] = codes;
        }
      } else { this.serv.showError(reponse.errorLabel); }
  }).catch(err => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');

    });
  }
}
