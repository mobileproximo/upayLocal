import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-orange',
  templateUrl: './orange.page.html',
  styleUrls: ['./orange.page.scss'],
})
export class OrangePage implements OnInit {

  constructor(public glb: GlobaleVariableService) { }
  public datarecharge: any = {image: '', oper: '', operation: 'Recharge Seddo'};

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png';
    this.glb.HEADERTITELE.title = 'Recharge';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'orange.png';
    this.datarecharge.oper = '0005';
    this.datarecharge.operateur = 'Orange';
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png';
    this.glb.HEADERTITELE.title = 'Recharge';
  }

}
