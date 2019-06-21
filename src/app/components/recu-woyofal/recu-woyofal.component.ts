import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'recu-woyofal',
  templateUrl: './recu-woyofal.component.html',
  styleUrls: ['./recu-woyofal.component.scss'],
})
export class RecuWoyofalComponent implements OnInit {

  constructor(public glb: GlobaleVariableService, public serv: ServiceService) {

  }
  imprimer() {
    this.glb.showRecu = false;
  }
  ngOnInit() {}

}
