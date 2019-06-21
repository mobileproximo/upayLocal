import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'recu-recharge',
  templateUrl: './recu-recharge.component.html',
  styleUrls: ['./recu-recharge.component.scss'],
})
export class RecuRechargeComponent implements OnInit {

  constructor(public glb: GlobaleVariableService, public millier: MillierPipe) { }

  ngOnInit() {}
  imprimer() {
    this.glb.showRecu = false;
  }

}
