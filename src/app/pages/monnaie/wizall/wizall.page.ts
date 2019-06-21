import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-wizall',
  templateUrl: './wizall.page.html',
  styleUrls: ['./wizall.page.scss'],
})
export class WizallPage implements OnInit {
  public datacashin: any = {libelle: 'Téléphone'};
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.ShowPin = false;
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Monnaie electronique';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'logo_wizall.jpg';
    this.datacashin.oper = '0057';
    this.datacashin.operation = 'Cashin Wizall';
    this.datacashin.operateur = 'Wizall';
    this.datacashin.sousop = '0001';
  }

}
