import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-tigocash',
  templateUrl: './tigocash.page.html',
  styleUrls: ['./tigocash.page.scss'],
})
export class TigocashPage implements OnInit {
  datarecharge: any={};
  service: string;

  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Monnaie electronique';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'Icon-27.png';
    this.datarecharge.oper = '0022';
    this.datarecharge.operation = 'Cashin Tigo Cash';
    this.datarecharge.operateur = 'Tigo Cash';
    this.service = 'Cashin';
    console.log('ionViewDidLoad OrangeMoneyPage');
  }

}
