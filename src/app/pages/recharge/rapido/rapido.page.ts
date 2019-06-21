import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rapido',
  templateUrl: './rapido.page.html',
  styleUrls: ['./rapido.page.scss'],
})
export class RapidoPage implements OnInit {

  public montant;
  public montantttc;
  public telephone;
  public datacashin: any = {libelle: 'Numero Badge'}

  constructor(/* public rechprovider:RechargeProvider */
                  public serv: ServiceService,
                  public glb: GlobaleVariableService,
                  public navCtrl: NavController) {
    glb.ShowPin = false;
  }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png';
    this.glb.HEADERTITELE.title = 'Recharge';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'logo_rapido.png';
    this.datacashin.oper = '0057';
    this.datacashin.sousop = '0002';
    this.datacashin.operation = 'Recharge Rapido';
    this.datacashin.operateur = 'Rapido';
  }

}
