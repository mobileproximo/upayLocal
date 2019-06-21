import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';

@Component({
  selector: 'app-upay-wallet',
  templateUrl: './upay-wallet.page.html',
  styleUrls: ['./upay-wallet.page.scss'],
})
export class UpayWalletPage implements OnInit {
  public service;
  private datarecharge: any = {};
  private datacashin: any = {};
  constructor(public glb: GlobaleVariableService) { }

  ngOnInit() {
    this.glb.HEADERTITELE.src = this.glb.IMAGE_BASE_URL + 'Petite-Icon-05.png';
    this.glb.HEADERTITELE.title = 'Transfert UPay';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datarecharge.image = this.glb.IMAGE_BASE_URL + 'upay.png';
    this.datarecharge.oper  = '0073';
    this.datarecharge.operation = 'Cashin UPay';
    this.datarecharge.operateur  = 'UPay';
    this.service = 'Cashin';
    this.glb.showRecu = false;
    this.glb.recu = {};
    this.datacashin.image = this.glb.IMAGE_BASE_URL + 'upay.jpg';
    this.datacashin.oper  = '0074';
    this.datacashin.operation = 'Cashout UPay';
    this.datacashin.operateur  = 'UPay';
  }

}
