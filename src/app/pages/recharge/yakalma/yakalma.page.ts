import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-yakalma',
  templateUrl: './yakalma.page.html',
  styleUrls: ['./yakalma.page.scss'],
})
export class YakalmaPage implements OnInit {
  public datarecharge: any;
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-02.png';
    this.glb.HEADERTITELE.title = 'Recharge';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'Icon-22.png';
    this.datarecharge.oper = '0034';
    this.datarecharge.operation = 'Recharge Yakalma';
    this.datarecharge.operateur = 'Expresso';
    console.log('ngOnInit YakalmaPage');
  }

}
