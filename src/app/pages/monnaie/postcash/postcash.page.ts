import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-postcash',
  templateUrl: './postcash.page.html',
  styleUrls: ['./postcash.page.scss'],
})
export class PostcashPage implements OnInit {
  public datacashin: any = {libelle: 'Téléphone'};

  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Monnaie electronique';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'postecash.png';
    this.datacashin.oper = '0053';
    this.datacashin.sousop = '0001';
    this.datacashin.operation = 'Cashin';
    this.datacashin.operateur = 'PosteCash';
  }

}
