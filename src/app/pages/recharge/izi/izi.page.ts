import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-izi',
  templateUrl: './izi.page.html',
  styleUrls: ['./izi.page.scss'],
})
export class IziPage implements OnInit {
  datarecharge: any;
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png';
    this.glb.HEADERTITELE.title = 'Recharge';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'tigo.png';
    this.datarecharge.oper = '0020';
    this.datarecharge.operation = 'Recharge IZI';
    this.datarecharge.operateur = 'TIGO';
  }

}
