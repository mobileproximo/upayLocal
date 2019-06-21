import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-emoney',
  templateUrl: './emoney.page.html',
  styleUrls: ['./emoney.page.scss'],
})
export class EmoneyPage implements OnInit {
  private datarecharge: any = {};
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Monnaie electronique';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'emoney.png';
    this.datarecharge.oper  = '0054';
    this.datarecharge.operation = 'Cashin E-Money';
    console.log('ionViewDidLoad EMoneyPage');
  }

}
