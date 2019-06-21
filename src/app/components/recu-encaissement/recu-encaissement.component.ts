import { Component, OnInit } from '@angular/core';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { ServiceService } from 'src/app/service/service.service';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'recu-encaissement',
  templateUrl: './recu-encaissement.component.html',
  styleUrls: ['./recu-encaissement.component.scss'],
})
export class RecuEncaissementComponent implements OnInit {

  constructor(public glb: GlobaleVariableService, public serv: ServiceService, public number: MillierPipe) {
  }
  imprimer() {
    this.glb.showRecu = false;
  }

  ngOnInit() {}

}
