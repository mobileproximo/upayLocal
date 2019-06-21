import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-orange-money',
  templateUrl: './orange-money.page.html',
  styleUrls: ['./orange-money.page.scss'],
})
export class OrangeMoneyPage implements OnInit {
  public service;
  private datarecharge: any = {};
  constructor(public glb: GlobaleVariableService) { }
  customPopoverOptions: any = {
    header: 'Type de service',
  //  subHeader: 'Select',
    //message: 'Only select your dominant hair color'
  };

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Monnaie electronique';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image =  this.glb.IMAGE_BASE_URL + 'Icon-20.png';
    this.datarecharge.oper = '0025';
    this.datarecharge.operation = 'Cashin Orange-Money';
    this.datarecharge.operateur = 'Orange-Money';
    this.service = 'Cashin';
  }

}
