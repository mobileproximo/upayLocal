import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() header;


  dateUpdate: string;
  text: string;


  constructor(public number: MillierPipe, public serv: ServiceService, public glb: GlobaleVariableService, public navCtrl: NavController) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';

    this.dateUpdate = this.serv.getCurrentDate();
  }
  getPlafond() {
    this.serv.afficheloading();
    this.serv.getplafond().then(data => {
      this.serv.dismissloadin();
      const plafond = JSON.parse(data.data);
      if (plafond.returnCode === '0') {
        this.glb.dateUpdate = this.serv.getCurrentDate();
        this.glb.HEADER.montant = this.number.transform(plafond.mntPlf);

        this.glb.HEADER.numcompte = plafond.numcompte;
        this.glb.HEADER.consomme = this.number.transform(plafond.consome);
      } else { this.serv.showError(plafond.errorLabel); }

    }).catch(error => {
      this.serv.dismissloadin();
      this.serv.showError('Impossible d\'atteindre le serveur');

    });
  }
  vershome() {
    this.navCtrl.navigateRoot('/home');
  }

  ngOnInit() {}

}
