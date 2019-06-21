import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { GlobaleVariableService } from 'src/app/service/globale-variable.service';
import { FormatcodePipe } from 'src/app/pipes/formatcode.pipe';
import { MillierPipe } from 'src/app/pipes/millier.pipe';

@Component({
  selector: 'recu-transfert',
  templateUrl: './recu-transfert.component.html',
  styleUrls: ['./recu-transfert.component.scss'],
})
export class RecuTransfertComponent implements OnInit {

  constructor(public serv: ServiceService,
              public glb: GlobaleVariableService,
              public formatCode: FormatcodePipe,
              public monmillier: MillierPipe) { }

  ngOnInit() {}
  imprimer(){
    this.glb.showRecu = false;
  }
}
